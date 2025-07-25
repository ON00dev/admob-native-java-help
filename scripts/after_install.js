const fs = require('fs');
const path = require('path');
const { injectIntoMainActivity } = require('../src/android/utils');

module.exports = function (ctx) {
  const projectRoot = ctx.opts.projectRoot;
  const configPath = path.join(__dirname, 'userConfig.json');
  
  // Check if configuration file exists
  if (!fs.existsSync(configPath)) {
    console.error('❌ userConfig.json file not found');
    return;
  }
  
  const config = JSON.parse(fs.readFileSync(configPath));

  try {
    const packageDir = getPackageDirFromConfig(projectRoot);
    const mainActivityPath = path.join(packageDir, 'MainActivity.java');
    
    // Check if MainActivity.java exists
    if (!fs.existsSync(mainActivityPath)) {
      console.error(`❌ MainActivity.java not found at: ${mainActivityPath}`);
      return;
    }

    console.log('[OK] AdMob blocks injected successfully.');
    injectIntoMainActivity(mainActivityPath, config);
  } catch (error) {
    console.error('❌ Error processing MainActivity.java:', error.message);
  }
};

// Locate path based on package name from config.xml
function getPackageDirFromConfig(root) {
  const configXmlPath = path.join(root, 'config.xml');
  
  if (!fs.existsSync(configXmlPath)) {
    throw new Error(`config.xml not found at: ${configXmlPath}`);
  }
  
  const configContent = fs.readFileSync(configXmlPath, 'utf8');
  const packageMatch = configContent.match(/id="([^"]+)"/); 
  
  if (!packageMatch) {
    throw new Error('Package ID not found in config.xml');
  }
  
  const packageName = packageMatch[1];
  console.log(`[FOLDER] Package found: ${packageName}`);
  
  // Convert package name to path (com.teste.ok -> com/teste/ok)
  const packagePath = packageName.replace(/\./g, path.sep);
  const javaDir = path.join(root, 'platforms/android/app/src/main/java', packagePath);
  
  console.log(`[FOLDER] MainActivity path: ${javaDir}`);
  
  return javaDir;
}
