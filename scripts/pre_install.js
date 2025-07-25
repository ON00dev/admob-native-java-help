const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {
  const config = ctx.opts.cli_variables || {};
  const output = {
    adType: config.AD_TYPE || 'banner',
    adPosition: config.AD_POSITION || 'bottom',
    bannerId: config.BANNER_AD_UNIT_ID,
    interstitialId: config.INTERSTITIAL_AD_UNIT_ID,
    appId: config.APP_ID
  };

  fs.writeFileSync(path.join(__dirname, 'userConfig.json'), JSON.stringify(output, null, 2));
  console.log('[OK] Settings saved:', output);
};
