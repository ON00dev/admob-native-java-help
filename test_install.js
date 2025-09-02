const fs = require('fs');
const path = require('path');
const { injectIntoMainActivity, injectIntoAndroidManifest } = require('./src/android/utils');

// Simula o contexto do Cordova
const ctx = {
  opts: {
    projectRoot: path.join(__dirname, 'a', 'teste')
  }
};

console.log('Iniciando teste de instalação do plugin...');
console.log('Diretório do projeto:', ctx.opts.projectRoot);

// Carrega a configuração
const configPath = path.join(__dirname, 'scripts', 'userConfig.json');
if (!fs.existsSync(configPath)) {
  console.error('❌ userConfig.json não encontrado');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath));
console.log('Configuração carregada:', config);

try {
  // Caminho direto para o MainActivity.java do ambiente de teste
  const mainActivityPath = path.join(__dirname, 'a', 'teste', 'ambiente_teste', 'MainActivity.java');
  const manifestPath = path.join(__dirname, 'a', 'teste', 'ambiente_teste', 'AndroidManifest.xml');
  
  console.log('MainActivity path:', mainActivityPath);
  console.log('Manifest path:', manifestPath);
  
  // Verifica se os arquivos existem
  if (!fs.existsSync(mainActivityPath)) {
    console.error(`❌ MainActivity.java não encontrado em: ${mainActivityPath}`);
    process.exit(1);
  }
  
  // Injeta os blocos do AdMob no MainActivity.java
  console.log('Injetando código AdMob no MainActivity.java...');
  injectIntoMainActivity(mainActivityPath, config);
  
  // Injeta Application ID no AndroidManifest.xml se existir
  if (fs.existsSync(manifestPath) && config.appId) {
    console.log('Injetando Application ID no AndroidManifest.xml...');
    injectIntoAndroidManifest(manifestPath, config.appId);
  }
  
  console.log('✅ Instalação do plugin concluída com sucesso!');
} catch (error) {
  console.error('❌ Erro durante a instalação:', error.message);
  process.exit(1);
}