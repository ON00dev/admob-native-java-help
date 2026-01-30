var exec = require('cordova/exec');

var AdMobNativeHelp = {
    /**
     * Exibe o anúncio interstitial se estiver carregado.
     */
    showInterstitial: function() {
        if (window.AndroidInterstitial) {
            window.AndroidInterstitial.showAd();
        } else {
            console.warn("AdMobNativeHelp: Interface AndroidInterstitial não encontrada ou plugin não inicializado.");
        }
    },

    /**
     * Verifica se o anúncio interstitial está carregado.
     * @returns {boolean}
     */
    isInterstitialLoaded: function() {
        if (window.AndroidInterstitial) {
            return window.AndroidInterstitial.isAdLoaded();
        }
        return false;
    },

    /**
     * Define um callback para quando o anúncio for fechado.
     * @param {string} callbackName Nome da função global a ser chamada.
     */
    setOnAdClosedCallback: function(callbackName) {
        if (window.AndroidInterstitial) {
            window.AndroidInterstitial.setOnAdClosedCallback(callbackName);
        }
    }
};

module.exports = AdMobNativeHelp;
