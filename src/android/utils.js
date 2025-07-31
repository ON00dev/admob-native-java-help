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
  // Carrega as importações do arquivo de bloco
  const blockDir = path.join(__dirname, 'blocks');
  const importFilePath = path.join(blockDir, 'imports.java.block');
  
  // Verifica se o arquivo de importações existe
  if (!fs.existsSync(importFilePath)) {
    console.log('[ERRO] Arquivo de importações não encontrado:', importFilePath);
    return code;
  }
  
  // Lê as importações do arquivo
  const importContent = fs.readFileSync(importFilePath, 'utf8');
  const requiredImports = importContent.split('\n').filter(line => line.trim().length > 0);

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

  // Carrega os blocos de código
  // Adiciona variáveis sempre
  let variables = fs.readFileSync(path.join(blockDir, 'variables.java.block'), 'utf8');
  variables = variables.replace(/\{\{APPLICATION_ID\}\}/g, config.appId);
  variables = variables.replace(/\{\{INTERSTITIAL_AD_UNIT_ID\}\}/g, config.interstitialId);
  variables = variables.replace(/\{\{BANNER_AD_UNIT_ID\}\}/g, config.bannerId);
  variables = variables.replace(/\{\{BANNER_POSITION\}\}/g, config.adPosition);
  variables = variables.replace(/\{\{BANNER_SHOW_ON_PAGES\}\}/g, config.bannerShowOnPages || 'index.html');
  variables = variables.replace(/\{\{BANNER_HIDE_ON_PAGES\}\}/g, config.bannerHideOnPages || '');
  variables = variables.replace(/\{\{URL_CHECK_DELAY\}\}/g, config.checkUrlInterval || '1000');
  variables = variables.replace(/\{\{BANNER_SETUP_DELAY\}\}/g, config.setupDelay || '2000');
  variables = variables.replace(/\{\{JS_INTERFACE_DELAY\}\}/g, config.jsInterfaceDelay || '3000');
  variables = variables.replace(/\{\{ADMOB_INIT_DELAY\}\}/g, config.admobInitDelay || '1000');
  blocks.push(variables);

  // Adiciona método de inicialização com delay
  let setupAdmobWithDelay = fs.readFileSync(path.join(blockDir, 'setup_admob_with_delay.java.block'), 'utf8');
  setupAdmobWithDelay = setupAdmobWithDelay.replace(/\{\{AD_TYPE\}\}/g, config.adType);
  blocks.push(setupAdmobWithDelay);

  if (config.adType.includes('banner')) {
    // Adiciona métodos de verificação de páginas
    const checkPages = fs.readFileSync(path.join(blockDir, 'check_pages.java.block'), 'utf8');
    blocks.push(checkPages);
    
    // Adiciona método de configuração do banner
    let setupBanner = fs.readFileSync(path.join(blockDir, 'setup_banner.java.block'), 'utf8');
    setupBanner = setupBanner.replace(/{{AD_POSITION}}/g, config.adPosition);
    blocks.push(setupBanner);
  }

  if (config.adType.includes('interstitial')) {
    // Adiciona configuração da interface JavaScript
    const setupJsInterface = fs.readFileSync(path.join(blockDir, 'setup_js_interface.java.block'), 'utf8');
    blocks.push(setupJsInterface);
    
    // Adiciona métodos do intersticial
    const interstitialMethods = fs.readFileSync(path.join(blockDir, 'interstitial_methods.java.block'), 'utf8');
    blocks.push(interstitialMethods);
  }
  
  // Adiciona inicialização do AdMob (para todos os tipos de anúncio)
  let admobInit = fs.readFileSync(path.join(blockDir, 'admob_init.java.block'), 'utf8');
  admobInit = admobInit.replace(/\{\{AD_TYPE\}\}/g, config.adType);
  blocks.push(admobInit);

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
