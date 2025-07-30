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
    appId: config.APP_ID || 'ca-app-pub-3940256099942544~3347511713',
    bannerShowOnPages: config.BANNER_SHOW_ON_PAGES || 'index.html',
    bannerHideOnPages: config.BANNER_HIDE_ON_PAGES || '',
    checkUrlInterval: config.CHECK_URL_INTERVAL || '1000',
    setupDelay: config.SETUP_DELAY || '2000',
    jsInterfaceDelay: config.JS_INTERFACE_DELAY || '3000'
  };

  fs.writeFileSync(path.join(__dirname, 'userConfig.json'), JSON.stringify(output, null, 2));
  console.log('[OK] Settings saved:', output);
};
