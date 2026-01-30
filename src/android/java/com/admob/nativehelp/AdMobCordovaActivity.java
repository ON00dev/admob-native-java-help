package com.admob.nativehelp;

import android.os.Bundle;
import android.widget.LinearLayout;
import android.view.ViewGroup.LayoutParams;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPreferences;

import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import com.google.android.gms.ads.AdError;
import androidx.annotation.NonNull;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

public class AdMobCordovaActivity extends CordovaActivity {

    private static final String TAG = "AdMobCordovaActivity";

    // Variáveis para controle do AdMob
    private boolean adMobSetup = false;
    private InterstitialAd mInterstitialAd = null;
    
    // Configurações (carregadas das preferências)
    private String APP_ID;
    private String BANNER_AD_UNIT_ID;
    private String INTERSTITIAL_AD_UNIT_ID;
    private String AD_TYPE;
    private String AD_POSITION;
    private String BANNER_SHOW_ON_PAGES;
    private String BANNER_HIDE_ON_PAGES;
    private int CHECK_URL_INTERVAL;
    private int SETUP_DELAY;
    private int JS_INTERFACE_DELAY;
    private int ADMOB_INIT_DELAY;

    // Variável para armazenar o callback JavaScript
    private String jsCallbackFunction = null;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // As preferências são carregadas no super.onCreate()
        loadPreferences();

        // Inicializa o Cordova (que chama loadUrl(launchUrl))
        // Nota: super.onCreate já faz init(), mas precisamos garantir que o launchUrl seja usado
        if (launchUrl == null) {
            launchUrl = "file:///android_asset/www/index.html";
        }
        
        Log.d(TAG, "onCreate chamado, launchUrl: " + launchUrl);

        // Adiciona interface JavaScript para anúncios intersticiais
        setupJavaScriptInterface();
        
        // Inicializa o AdMob com delay
        setupAdMobWithDelay();
    }

    private void loadPreferences() {
        // Valores padrão caso não estejam definidos
        APP_ID = preferences.getString("AdMobAppId", "");
        BANNER_AD_UNIT_ID = preferences.getString("AdMobBannerId", "");
        INTERSTITIAL_AD_UNIT_ID = preferences.getString("AdMobInterstitialId", "");
        AD_TYPE = preferences.getString("AdMobAdType", "banner");
        AD_POSITION = preferences.getString("AdMobAdPosition", "bottom");
        BANNER_SHOW_ON_PAGES = preferences.getString("AdMobBannerShowPages", "index.html");
        BANNER_HIDE_ON_PAGES = preferences.getString("AdMobBannerHidePages", "");
        
        CHECK_URL_INTERVAL = preferences.getInteger("AdMobCheckUrlInterval", 1000);
        SETUP_DELAY = preferences.getInteger("AdMobSetupDelay", 2000);
        JS_INTERFACE_DELAY = preferences.getInteger("AdMobJsInterfaceDelay", 3000);
        ADMOB_INIT_DELAY = preferences.getInteger("AdMobInitDelay", 1000);
        
        Log.d(TAG, "Preferências carregadas: AD_TYPE=" + AD_TYPE + ", POSITION=" + AD_POSITION);
    }

    // Inicializa o AdMob com delay
    private void setupAdMobWithDelay() {
        Log.d(TAG, "Configurando AdMob com delay de " + ADMOB_INIT_DELAY + "ms");
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            // Inicializa o AdMob
            MobileAds.initialize(this, initializationStatus -> {
                Log.d(TAG, "AdMob inicializado com sucesso");
                
                // Configura a interface JavaScript para anúncios intersticiais
                if (AD_TYPE.contains("interstitial")) {
                    // Carrega o anúncio intersticial
                    loadInterstitialAd();
                }
                
                // Verifica periodicamente a URL para páginas configuradas
                if (AD_TYPE.contains("banner")) {
                    checkForConfiguredPages();
                }
            });
        }, ADMOB_INIT_DELAY);
    }

    private void checkForConfiguredPages() {
        Log.d(TAG, "Iniciando verificação periódica da URL");
        
        // Verifica a cada intervalo configurado se a URL mudou para páginas configuradas
        Handler handler = new Handler(Looper.getMainLooper());
        Runnable checkUrl = new Runnable() {
            @Override
            public void run() {
                if (appView != null && appView.getView() instanceof android.webkit.WebView && !adMobSetup) {
                    android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                    String currentUrl = webView.getUrl();
                    // Log.d(TAG, "URL atual: " + currentUrl); // Verbose demais para loop
                    
                    if (currentUrl != null && shouldShowBannerOnPage(currentUrl)) {
                        Log.d(TAG, "Detectada página configurada, configurando banner");
                        setupAdMobBanner();
                    } else {
                        // Continua verificando no intervalo configurado
                        handler.postDelayed(this, CHECK_URL_INTERVAL);
                    }
                } else if (!adMobSetup) {
                    // Continua verificando se ainda não configurou o AdMob
                    handler.postDelayed(this, CHECK_URL_INTERVAL);
                }
            }
        };
        
        // Inicia a verificação após delay configurado
        handler.postDelayed(checkUrl, SETUP_DELAY);
    }

    private boolean shouldShowBannerOnPage(String currentUrl) {
        // Verifica se deve esconder o banner nesta página
        if (!BANNER_HIDE_ON_PAGES.isEmpty()) {
            String[] hidePages = BANNER_HIDE_ON_PAGES.split(",");
            for (String hidePage : hidePages) {
                if (!hidePage.trim().isEmpty() && currentUrl.contains(hidePage.trim())) {
                    Log.d(TAG, "Banner escondido para página: " + hidePage.trim());
                    return false;
                }
            }
        }
        
        // Verifica se deve mostrar o banner nesta página
        if (!BANNER_SHOW_ON_PAGES.isEmpty()) {
            String[] showPages = BANNER_SHOW_ON_PAGES.split(",");
            for (String showPage : showPages) {
                if (!showPage.trim().isEmpty() && currentUrl.contains(showPage.trim())) {
                    Log.d(TAG, "Banner permitido para página: " + showPage.trim());
                    return true;
                }
            }
        }
        
        return false;
    }

    // Método para configurar o banner do AdMob
    private void setupAdMobBanner() {
        // Evita configurar o AdMob múltiplas vezes
        if (adMobSetup) {
            return;
        }
        adMobSetup = true;
        
        Log.d(TAG, "Configurando banner AdMob");
        
        // Cria o AdView
        final AdView adView = new AdView(this);
        adView.setAdUnitId(BANNER_AD_UNIT_ID);
        adView.setAdSize(AdSize.BANNER);
        
        // Carrega o anúncio
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);
        
        runOnUiThread(() -> {
            // Obtém a WebView do Cordova
            if (appView != null && appView.getView() != null) {
                // Cria um novo layout para conter a WebView e o banner
                LinearLayout layout = new LinearLayout(this);
                layout.setOrientation(LinearLayout.VERTICAL);
                layout.setBackgroundColor(0xff000000); // Fundo preto padrão
                
                // Remove a WebView do parent atual antes de adicionar ao novo layout
                android.view.ViewGroup parent = (android.view.ViewGroup) appView.getView().getParent();
                if (parent != null) {
                    parent.removeView(appView.getView());
                }
                
                // Configura a WebView para manter o CSS original e eventos de toque
                appView.getView().setBackgroundColor(0x00000000);
                appView.getView().setClickable(true);
                appView.getView().setFocusable(true);
                appView.getView().setFocusableInTouchMode(true);
                
                // Configurações adicionais para garantir interatividade
                if (appView.getView() instanceof android.webkit.WebView) {
                    android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                    webView.getSettings().setJavaScriptEnabled(true);
                    webView.getSettings().setDomStorageEnabled(true);
                    webView.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);
                }
                
                // Parâmetros para a WebView ocupar o espaço disponível
                LinearLayout.LayoutParams webViewParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    0
                );
                webViewParams.weight = 1; // Ocupa todo o espaço disponível
                
                // Parâmetros para o banner
                LinearLayout.LayoutParams adParams = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                );
                
                // Adiciona componentes baseado na posição configurada
                if ("top".equalsIgnoreCase(AD_POSITION)) {
                    layout.addView(adView, adParams);
                    layout.addView(appView.getView(), webViewParams);
                } else {
                    layout.addView(appView.getView(), webViewParams);
                    layout.addView(adView, adParams);
                }

                // Define esse layout como conteúdo da atividade
                setContentView(layout);
            }
        });
    }

    // Método para carregar anúncio intersticial
    private void loadInterstitialAd() {
        Log.d(TAG, "Carregando anúncio intersticial");
        AdRequest adRequest = new AdRequest.Builder().build();
        
        InterstitialAd.load(this, INTERSTITIAL_AD_UNIT_ID, adRequest,
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(@NonNull InterstitialAd interstitialAd) {
                    Log.d(TAG, "Anúncio intersticial carregado com sucesso");
                    mInterstitialAd = interstitialAd;
                    
                    // Configura callbacks para eventos do anúncio
                    mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback() {
                        @Override
                        public void onAdClicked() {
                            Log.d(TAG, "Anúncio intersticial clicado");
                        }
                        
                        @Override
                        public void onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Anúncio intersticial fechado");
                            mInterstitialAd = null;
                            
                            // Chama o callback JavaScript se estiver registrado
                            if (jsCallbackFunction != null && appView != null && appView.getView() instanceof android.webkit.WebView) {
                                android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                                runOnUiThread(() -> {
                                    Log.d(TAG, "Executando callback JavaScript: " + jsCallbackFunction);
                                    webView.evaluateJavascript(jsCallbackFunction + "();", null);
                                });
                            }
                            
                            // Recarrega um novo anúncio para a próxima vez
                            loadInterstitialAd();
                        }
                        
                        @Override
                        public void onAdFailedToShowFullScreenContent(@NonNull AdError adError) {
                            Log.e(TAG, "Falha ao exibir anúncio intersticial: " + adError.getMessage());
                            mInterstitialAd = null;
                            // Tenta carregar novamente
                            loadInterstitialAd();
                        }
                        
                        @Override
                        public void onAdImpression() {
                            Log.d(TAG, "Anúncio intersticial registrou impressão");
                        }
                        
                        @Override
                        public void onAdShowedFullScreenContent() {
                            Log.d(TAG, "Anúncio intersticial mostrado em tela cheia");
                        }
                    });
                }
                
                @Override
                public void onAdFailedToLoad(@NonNull LoadAdError loadAdError) {
                    Log.e(TAG, "Falha ao carregar anúncio intersticial: " + loadAdError.getMessage());
                    mInterstitialAd = null;
                    
                    // Tenta novamente após um atraso
                    new Handler(Looper.getMainLooper()).postDelayed(() -> {
                        loadInterstitialAd();
                    }, 60000); // Tenta novamente após 1 minuto
                }
            });
    }

    // Método público para exibir anúncio intersticial (chamado pelo JavaScript)
    public void showInterstitialAd() {
        runOnUiThread(() -> {
            if (mInterstitialAd != null) {
                Log.d(TAG, "Exibindo anúncio intersticial");
                mInterstitialAd.show(AdMobCordovaActivity.this);
            } else {
                Log.d(TAG, "Anúncio intersticial não está carregado, tentando carregar");
                // Tenta carregar novamente
                loadInterstitialAd();
            }
        });
    }

    // Configura interface JavaScript para comunicação com anúncios
    private void setupJavaScriptInterface() {
        // Aguarda a WebView estar pronta
        Handler handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(() -> {
            if (appView != null && appView.getView() instanceof android.webkit.WebView) {
                android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                webView.addJavascriptInterface(new InterstitialAdInterface(), "AndroidInterstitial");
                Log.d(TAG, "Interface JavaScript configurada");
            }
        }, JS_INTERFACE_DELAY);
    }

    // Classe para interface JavaScript
    public class InterstitialAdInterface {
        @android.webkit.JavascriptInterface
        public void showAd() {
            Log.d(TAG, "Chamada JavaScript para exibir anúncio intersticial");
            showInterstitialAd();
        }
        
        @android.webkit.JavascriptInterface
        public boolean isAdLoaded() {
            return mInterstitialAd != null;
        }
        
        @android.webkit.JavascriptInterface
        public void setOnAdClosedCallback(String callbackFunction) {
            Log.d(TAG, "Callback de fechamento registrado: " + callbackFunction);
            jsCallbackFunction = callbackFunction;
        }
    }
}
