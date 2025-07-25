const fs = require('fs');
const path = require('path');

function injectIntoMainActivity(filePath, config) {
  let code = fs.readFileSync(filePath, 'utf8');

  // Inject using safe marker
  if (!code.includes('// ADMOB_NATIVE_PLUGIN')) {
    code = code.replace(
      /super\.onCreate\(.*?\);/,
      match => `${match}\n\n// ADMOB_NATIVE_PLUGIN\n${loadBlocks(config)}`
    );
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('[OK] AdMob blocks injected successfully.');
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

module.exports = { injectIntoMainActivity };
