const fs = require('fs');
const path = require('path');

function injectIntoMainActivity(filePath, config) {
  // Check if admob-plus-cordova is installed to avoid conflicts
  // filePath: .../platforms/android/app/src/main/java/com/teste/ok/MainActivity.java
  // projectRoot should be: .../
  const platformsIndex = filePath.indexOf('platforms');
  if (platformsIndex === -1) {
    console.log('[WARNING] Could not determine project root from file path');
    return;
  }
  const projectRoot = filePath.substring(0, platformsIndex);
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  console.log('[DEBUG] Project root detected:', projectRoot);
  console.log('[DEBUG] Looking for package.json at:', packageJsonPath);
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (dependencies['admob-plus-cordova']) {
      console.log('[WARNING] admob-plus-cordova detected. Proceeding with native code injection for overlay functionality.');
      console.log('[INFO] Both plugins will work together - admob-plus-cordova for SDK and native injection for overlay.');
      console.log('[INFO] Skipping AndroidManifest.xml modifications as admob-plus-cordova handles them.');
      // Skip AndroidManifest modifications when admob-plus-cordova is present
      global.skipManifestModifications = true;
    }
  }
  
  let code = fs.readFileSync(filePath, 'utf8');

  // Inject imports if not already present
  code = injectImports(code);

  // Inject using safe marker after loadUrl to ensure Cordova is initialized
  if (!code.includes('// ADMOB_NATIVE_PLUGIN')) {
    code = code.replace(
      /loadUrl\s*\(\s*launchUrl\s*\)\s*;/,
      match => `${match}\n\n// ADMOB_NATIVE_PLUGIN\n${loadBlocks(config)}`
    );
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('[OK] AdMob blocks injected successfully.');
}

function injectImports(code) {
  const requiredImports = [
    'import android.widget.LinearLayout;',
    'import com.google.android.gms.ads.AdRequest;',
    'import com.google.android.gms.ads.AdSize;',
    'import com.google.android.gms.ads.AdView;'
  ];

  // Find the last import statement
  const importRegex = /import\s+[^;]+;/g;
  const imports = code.match(importRegex) || [];
  
  if (imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    const lastImportIndex = code.lastIndexOf(lastImport);
    const insertPosition = lastImportIndex + lastImport.length;
    
    // Add missing imports
    let newImports = '';
    requiredImports.forEach(importStatement => {
      if (!code.includes(importStatement)) {
        newImports += '\n' + importStatement;
      }
    });
    
    if (newImports) {
      code = code.slice(0, insertPosition) + newImports + code.slice(insertPosition);
    }
  } else {
    // If no imports found, add them after package declaration
    const packageRegex = /package\s+[^;]+;/;
    const packageMatch = code.match(packageRegex);
    
    if (packageMatch) {
      const packageIndex = code.indexOf(packageMatch[0]);
      const insertPosition = packageIndex + packageMatch[0].length;
      
      let newImports = '\n';
      requiredImports.forEach(importStatement => {
        if (!code.includes(importStatement)) {
          newImports += '\n' + importStatement;
        }
      });
      
      if (newImports.trim()) {
        code = code.slice(0, insertPosition) + newImports + code.slice(insertPosition);
      }
    }
  }
  
  return code;
}

function loadBlocks(config) {
  const blockDir = path.join(__dirname, 'blocks');
  const blocks = [];

  if (config.adType.includes('banner')) {
    const pos = config.adPosition.toLowerCase() === 'top' ? 'banner_top' : 'banner_bottom';
    let banner = fs.readFileSync(path.join(blockDir, `${pos}.java.block`), 'utf8');
    banner = banner.replace(/{{BANNER_ID}}/g, config.bannerId);
    blocks.push(banner);
  }

  if (config.adType.includes('interstitial')) {
    let inter = fs.readFileSync(path.join(blockDir, `interstitial.java.block`), 'utf8');
    inter = inter.replace(/{{INTERSTITIAL_ID}}/g, config.interstitialId);
    blocks.push(inter);

    const jsIf = fs.readFileSync(path.join(blockDir, `js_interface.java.block`), 'utf8');
    blocks.push(jsIf);
  }

  return blocks.join('\n\n');
}

function injectIntoAndroidManifest(manifestPath, appId) {
  // Skip manifest modifications if admob-plus-cordova is present
  if (global.skipManifestModifications) {
    console.log('[INFO] admob-plus-cordova detected - checking if Application ID is already configured');
    
    // Even with admob-plus-cordova, verify if Application ID is present
    let content = fs.readFileSync(manifestPath, 'utf8');
    if (content.includes('com.google.android.gms.ads.APPLICATION_ID')) {
      console.log('[OK] AdMob Application ID already configured by admob-plus-cordova');
      return;
    } else {
      console.log('[WARNING] Application ID not found - injecting it manually');
      // Continue with injection
    }
  }
  
  let content = fs.readFileSync(manifestPath, 'utf8');
  
  // Check if AdMob Application ID is already present
  if (content.includes('com.google.android.gms.ads.APPLICATION_ID')) {
    console.log('[OK] AdMob Application ID already present in AndroidManifest.xml');
    return;
  }
  
  // Find the application tag and inject the meta-data
  const applicationTagRegex = /(<application[^>]*>)/;
  const match = content.match(applicationTagRegex);
  
  if (match) {
    const metaData = `\n        <meta-data\n            android:name="com.google.android.gms.ads.APPLICATION_ID"\n            android:value="${appId}" />`;
    
    const insertPosition = content.indexOf(match[1]) + match[1].length;
    content = content.slice(0, insertPosition) + metaData + content.slice(insertPosition);
    
    fs.writeFileSync(manifestPath, content, 'utf8');
    console.log('[OK] AdMob Application ID injected into AndroidManifest.xml');
  } else {
    console.error('❌ Could not find application tag in AndroidManifest.xml');
  }
}

module.exports = { injectIntoMainActivity, injectIntoAndroidManifest };
