const fs = require('fs');
const path = require('path');

module.exports = function (ctx) {
  const config = ctx.opts.cli_variables || {};
  
  // Debug: Show received variables
  console.log('[DEBUG] Received CLI variables:', config);
  
  const output = {
    adType: config.AD_TYPE || 'banner',
    adPosition: config.AD_POSITION || 'bottom',
    bannerId: config.BANNER_AD_UNIT_ID || 'ca-app-pub-3940256099942544/6300978111',
    interstitialId: config.INTERSTITIAL_AD_UNIT_ID || 'ca-app-pub-3940256099942544/1033173712',
    appId: config.APP_ID || 'ca-app-pub-3940256099942544~3347511713'
  };

  fs.writeFileSync(path.join(__dirname, 'userConfig.json'), JSON.stringify(output, null, 2));
  console.log('[OK] Settings saved:', output);
};
