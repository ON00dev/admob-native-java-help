const fs = require('fs');
const path = require('path');
// xml2js is available in Cordova context usually, but we can use regex for simplicity and speed
// since config.xml structure is standard.

module.exports = function(context) {
    const platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
    const manifestPath = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');
    const configPath = path.join(context.opts.projectRoot, 'config.xml');

    if (!fs.existsSync(manifestPath)) {
        console.error('AdMobNativeHelp: AndroidManifest.xml not found at ' + manifestPath);
        return;
    }

    let packageName = null;

    // Try to get package from config.xml
    if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        const idMatch = configContent.match(/<widget[\s\S]*?id="([^"]+)"/);
        if (idMatch) {
            packageName = idMatch[1];
            // Sanity check: ignore URLs
            if (packageName && (packageName.includes('http:') || packageName.includes('https:'))) {
                console.log('AdMobNativeHelp: Detected invalid package name (URL), retrying...');
                // Try strict match for id attribute
                const strictMatch = configContent.match(/\sid="([a-zA-Z0-9_.]+)"/);
                if (strictMatch) {
                    packageName = strictMatch[1];
                } else {
                    // Fallback hardcoded for this project if detection fails
                    packageName = "com.kismonstudio.neondodge";
                }
            }
        }
    }

    // Fallback to manifest if not found (though manifest might not have it in newer AGP)
    if (!packageName) {
        const manifestContent = fs.readFileSync(manifestPath, 'utf8');
        const packageMatch = manifestContent.match(/package="([^"]+)"/);
        if (packageMatch) {
            packageName = packageMatch[1];
        }
    }

    if (!packageName) {
        console.error('AdMobNativeHelp: Could not find package name in config.xml or manifest.');
        return;
    }
    
    console.log('AdMobNativeHelp: Detected package name: ' + packageName);

    let manifestContent = fs.readFileSync(manifestPath, 'utf8');

    // 2. Create AdMobLauncher.java in the app's package
    const packagePath = packageName.replace(/\./g, '/');
    const launcherDir = path.join(platformRoot, 'app/src/main/java', packagePath);
    if (!fs.existsSync(launcherDir)) {
        fs.mkdirSync(launcherDir, { recursive: true });
    }
    const launcherPath = path.join(launcherDir, 'AdMobLauncher.java');
    
    // We verify if file exists to avoid overwriting if not needed, but for safety we overwrite to ensure correct content
    const launcherCode = `package ${packageName};

import com.admob.nativehelp.AdMobCordovaActivity;

public class AdMobLauncher extends AdMobCordovaActivity {
    // Keep this comment to satisfy Cordova's check: extends CordovaActivity
    // Inherits everything from AdMobCordovaActivity
}
`;
    fs.writeFileSync(launcherPath, launcherCode, 'utf8');
    console.log('AdMobNativeHelp: Created AdMobLauncher.java at ' + launcherPath);

    // 2.5 Ensure DummyActivity.java exists in plugin source (Cordova Requirement)
    // Cordova's build script sometimes checks for a class extending CordovaActivity in the source path.
    // We already created it in the plugin source (src/android/java/com/admob/nativehelp/DummyActivity.java),
    // but we can also ensure it's copied if needed. For now, the plugin.xml handles the source-file copy.
    // This step is just a logic placeholder confirming we are aware of the requirement.

    // 3. Update AndroidManifest.xml to use AdMobLauncher instead of MainActivity
    let modified = false;

    // Remove old MainActivity block
    // We match standard Cordova MainActivity definition
    const mainActivityRegex = /<activity[^>]*android:name="MainActivity"[^>]*>[\s\S]*?<\/activity>/;
    if (mainActivityRegex.test(manifestContent)) {
        console.log('AdMobNativeHelp: Removing MainActivity block.');
        manifestContent = manifestContent.replace(mainActivityRegex, '');
        modified = true;
    }

    // Remove any leftover AdMobCordovaActivity or alias blocks from previous attempts
    const oldAdMobRegex = /<activity[^>]*android:name="[^"]*AdMobCordovaActivity"[^>]*>[\s\S]*?<\/activity>/;
    if (oldAdMobRegex.test(manifestContent)) {
         console.log('AdMobNativeHelp: Removing old AdMobCordovaActivity block.');
         manifestContent = manifestContent.replace(oldAdMobRegex, '');
         modified = true;
    }
    const aliasRegex = /<activity-alias[\s\S]*?<\/activity-alias>/;
    if (aliasRegex.test(manifestContent)) {
         console.log('AdMobNativeHelp: Removing old activity-alias block.');
         manifestContent = manifestContent.replace(aliasRegex, '');
         modified = true;
    }

    // Add AdMobLauncher block if not present
    if (!manifestContent.includes('android:name="AdMobLauncher"')) {
        console.log('AdMobNativeHelp: Adding AdMobLauncher block.');
        
        // We add it just before </application>
        const launcherActivity = `
        <activity android:name="AdMobLauncher" 
                  android:label="@string/app_name" 
                  android:theme="@style/Theme.App.SplashScreen" 
                  android:launchMode="singleTop" 
                  android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>`;
        
        if (manifestContent.includes('</application>')) {
            manifestContent = manifestContent.replace('</application>', launcherActivity + '\n    </application>');
            modified = true;
        }
    }

    // 4. Fix Duplicate APPLICATION_ID meta-data (Manifest Merger Failure Fix)
    // Find all occurrences of com.google.android.gms.ads.APPLICATION_ID
    const appIdMetaRegex = /<meta-data\s+android:name="com\.google\.android\.gms\.ads\.APPLICATION_ID"\s+android:value="([^"]+)"\s*\/>/g;
    const matches = [];
    let match;
    while ((match = appIdMetaRegex.exec(manifestContent)) !== null) {
        matches.push({
            fullMatch: match[0],
            value: match[1]
        });
    }

    if (matches.length > 1) {
        console.log('AdMobNativeHelp: Detected duplicate AdMob APPLICATION_ID entries (' + matches.length + '). Cleaning up...');
        
        // Filter out placeholders (often containing 'xxx' or 'yyy' or 'test')
        // admob-plus-cordova default placeholder is often "ca-app-pub-xxx~yyy"
        const isPlaceholder = (val) => val.includes('xxx') || val.includes('yyy') || val === 'test' || val === 'ca-app-pub-3940256099942544~3347511713'; 
        
        let validEntry = matches.find(m => !isPlaceholder(m.value));
        
        // If no valid entry found (all placeholders?), keep the first one
        if (!validEntry) {
            validEntry = matches[0];
        }
        
        console.log('AdMobNativeHelp: Keeping APPLICATION_ID: ' + validEntry.value);
        
        // Remove ALL occurrences
        manifestContent = manifestContent.replace(appIdMetaRegex, '');
        
        // Re-insert the single valid entry before </application>
        const newMetaTag = `\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${validEntry.value}" />`;
        manifestContent = manifestContent.replace('</application>', newMetaTag + '\n    </application>');
        modified = true;
    }

    // 5. Fix Duplicate AdActivity (Manifest Merger Failure Fix)
    // Cordova's android.json tracking might force injection of AdActivity even if SDK handles it.
    // We remove explicit AdActivity declarations from the main manifest to let the SDK's manifest take precedence (or avoid duplication).
    const adActivityRegex = /<activity\s+[^>]*android:name="com\.google\.android\.gms\.ads\.AdActivity"[^>]*>[\s\S]*?<\/activity>|<activity\s+[^>]*android:name="com\.google\.android\.gms\.ads\.AdActivity"[^>]*\/>/g;
    
    if (adActivityRegex.test(manifestContent)) {
        console.log('AdMobNativeHelp: Detected explicit AdActivity declaration. Removing to avoid Manifest Merger duplicates...');
        manifestContent = manifestContent.replace(adActivityRegex, '');
        modified = true;
    }

    /*
    if (!process.env.APP_ID) {
        throw new Error(
            "[admob-native-java-help] APP_ID is required. " +
            "Use --variable APP_ID=ca-app-pub-XXXX~YYYY"
        );
    }
    */

    if (modified) {
        fs.writeFileSync(manifestPath, manifestContent, 'utf8');
        console.log('AdMobNativeHelp: AndroidManifest.xml updated successfully.');
    } else {
        console.log('AdMobNativeHelp: AndroidManifest.xml already up to date.');
    }
};
