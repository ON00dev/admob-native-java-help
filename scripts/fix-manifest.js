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
        const idMatch = configContent.match(/<widget[^>]*id="([^"]+)"/);
        if (idMatch) {
            packageName = idMatch[1];
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
    // Inherits everything from AdMobCordovaActivity
}
`;
    fs.writeFileSync(launcherPath, launcherCode, 'utf8');
    console.log('AdMobNativeHelp: Created AdMobLauncher.java at ' + launcherPath);

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

    if (!process.env.APP_ID) {
        throw new Error(
            "[admob-native-java-help] APP_ID is required. " +
            "Use --variable APP_ID=ca-app-pub-XXXX~YYYY"
        );
    }

    if (modified) {
        fs.writeFileSync(manifestPath, manifestContent, 'utf8');
        console.log('AdMobNativeHelp: AndroidManifest.xml updated successfully.');
    } else {
        console.log('AdMobNativeHelp: AndroidManifest.xml already up to date.');
    }
};
