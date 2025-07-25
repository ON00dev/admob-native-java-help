const fs = require('fs');
const path = require('path');
const { injectIntoMainActivity } = require('../src/android/utils');

module.exports = function (ctx) {
  const projectRoot = ctx.opts.projectRoot;
  const configPath = path.join(__dirname, 'userConfig.json');
  
  // Verificar se o arquivo de configuração existe
  if (!fs.existsSync(configPath)) {
    console.error('❌ Arquivo userConfig.json não encontrado');
    return;
  }
  
  const config = JSON.parse(fs.readFileSync(configPath));

  try {
    const packageDir = findPackageDir(projectRoot);
    const mainActivityPath = path.join(packageDir, 'MainActivity.java');
    
    // Verificar se o MainActivity.java existe
    if (!fs.existsSync(mainActivityPath)) {
      console.error(`❌ MainActivity.java não encontrado em: ${mainActivityPath}`);
      return;
    }

    injectIntoMainActivity(mainActivityPath, config);
  } catch (error) {
    console.error('❌ Erro ao processar MainActivity.java:', error.message);
  }
};

// Localiza o caminho com base no package
function findPackageDir(root) {
  const javaDir = path.join(root, 'platforms/android/app/src/main/java/');
  
  // Verificar se o diretório Java existe
  if (!fs.existsSync(javaDir)) {
    throw new Error(`Diretório Java não encontrado: ${javaDir}`);
  }
  
  const files = fs.readdirSync(javaDir, { withFileTypes: true });
  
  for (const file of files) {
    if (file.isDirectory()) {
      const packagePath = path.join(javaDir, file.name);
      console.log(`📁 Pacote encontrado: ${file.name}`);
      return packagePath;
    }
  }
  
  throw new Error(`Nenhum diretório de pacote encontrado em: ${javaDir}`);
}
