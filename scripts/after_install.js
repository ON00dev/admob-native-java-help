const fs = require('fs');
const path = require('path');
const { injectIntoMainActivity } = require('../src/android/utils');

module.exports = function (ctx) {
  const projectRoot = ctx.opts.projectRoot;
  const configPath = path.join(__dirname, 'userConfig.json');
  const config = JSON.parse(fs.readFileSync(configPath));

  const packageDir = findPackageDir(projectRoot);
  const mainActivityPath = path.join(packageDir, 'MainActivity.java');

  injectIntoMainActivity(mainActivityPath, config);
};

// Localiza o caminho com base no package
function findPackageDir(root) {
  const files = fs.readdirSync(path.join(root, 'platforms/android/app/src/main/java/'), { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      return path.join(root, 'platforms/android/app/src/main/java', file.name, 'MainActivity.java');
    }
  }
  throw new Error('MainActivity.java não encontrado');
}
