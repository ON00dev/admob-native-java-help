/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.kismonstudio.neondodge;

import android.os.Bundle;
import android.view.Gravity;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.FrameLayout.LayoutParams;
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.interstitial.InterstitialAd;
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback;
import com.google.android.gms.ads.FullScreenContentCallback;
import com.google.android.gms.ads.LoadAdError;
import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        
        android.util.Log.d("MainActivity", "onCreate chamado, launchUrl: " + launchUrl);
        
        // Adiciona interface JavaScript para anúncios intersticiais
        setupJavaScriptInterface();
        
        // Inicializa o AdMob
        android.util.Log.d("MainActivity", "Inicializando AdMob...");
        MobileAds.initialize(this, initializationStatus -> {
            android.util.Log.d("MainActivity", "AdMob inicializado com sucesso");
            
            // Carrega o anúncio intersticial
            loadInterstitialAd();
            
            // Verifica periodicamente se a URL mudou para index.html
            checkForIndexPage();
        });
    }
    
    private boolean adMobSetup = false;
    private InterstitialAd mInterstitialAd;
    // IDs dos anúncios AdMob (usando IDs de teste)
    private static final String INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-4978807084306278/5613007414"; // ID de teste para intersticial
    private static final String BANNER_AD_UNIT_ID = "ca-app-pub-4978807084306278/7466410489"; // ID de teste para banner
    
    private void checkForIndexPage() {
        android.util.Log.d("MainActivity", "Iniciando verificação periódica da URL");
        
        // Verifica a cada 1 segundo se a URL mudou para index.html
        android.os.Handler handler = new android.os.Handler();
        Runnable checkUrl = new Runnable() {
            @Override
            public void run() {
                if (appView != null && appView.getView() instanceof android.webkit.WebView && !adMobSetup) {
                    android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                    String currentUrl = webView.getUrl();
                    android.util.Log.d("MainActivity", "URL atual: " + currentUrl);
                    
                    if (currentUrl != null && currentUrl.contains("index.html")) {
                        android.util.Log.d("MainActivity", "Detectado index.html, configurando banner");
                        setupAdMobBanner();
                    } else {
                        // Continua verificando a cada 1 segundo
                        handler.postDelayed(this, 1000);
                    }
                } else if (!adMobSetup) {
                    // Continua verificando se ainda não configurou o AdMob
                    handler.postDelayed(this, 1000);
                }
            }
        };
        
        // Inicia a verificação após 2 segundos
        handler.postDelayed(checkUrl, 2000);
    }
    
    private void setupAdMobBanner() {
        // Evita configurar o AdMob múltiplas vezes
        if (adMobSetup) {
            return;
        }
        adMobSetup = true;
        
        android.util.Log.d("MainActivity", "Configurando banner AdMob");
        
        // Cria o banner AdMob
        AdView adView = new AdView(this);
        adView.setAdSize(AdSize.BANNER);
        adView.setAdUnitId(BANNER_AD_UNIT_ID); // ID de teste para banner
        AdRequest adRequest = new AdRequest.Builder().build();
        adView.loadAd(adRequest);

        // Obtém a WebView do Cordova
        if (appView != null && appView.getView() != null) {
            // Cria um layout vertical que contenha WebView + AdView
            LinearLayout layout = new LinearLayout(this);
            layout.setOrientation(LinearLayout.VERTICAL);
            layout.setBackgroundColor(0xff0b082c);
            
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
            
            // Adiciona a WebView ao layout
            layout.addView(appView.getView(), webViewParams);
           
           // Parâmetros para o banner na parte inferior
           LinearLayout.LayoutParams adParams = new LinearLayout.LayoutParams(
               LinearLayout.LayoutParams.MATCH_PARENT,
               LinearLayout.LayoutParams.WRAP_CONTENT
           );

           layout.addView(adView, adParams);

           // Define esse layout como conteúdo da atividade
           setContentView(layout);
        }
    }
    
    // Configura interface JavaScript para comunicação com anúncios
    private void setupJavaScriptInterface() {
        // Aguarda a WebView estar pronta
        android.os.Handler handler = new android.os.Handler();
        handler.postDelayed(() -> {
            if (appView != null && appView.getView() instanceof android.webkit.WebView) {
                android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                webView.addJavascriptInterface(new InterstitialAdInterface(), "AndroidInterstitial");
                android.util.Log.d("MainActivity", "Interface JavaScript configurada");
            }
        }, 3000); // Aguarda 3 segundos para garantir que a WebView esteja pronta
    }
    
    // Variável para armazenar o callback JavaScript
    private String jsCallbackFunction = null;
    
    // Classe para interface JavaScript
    public class InterstitialAdInterface {
        @android.webkit.JavascriptInterface
        public void showAd() {
            android.util.Log.d("MainActivity", "Chamada JavaScript para exibir anúncio intersticial");
            showInterstitialAd();
        }
        
        @android.webkit.JavascriptInterface
        public boolean isAdLoaded() {
            return mInterstitialAd != null;
        }
        
        @android.webkit.JavascriptInterface
        public void setOnAdClosedCallback(String callbackFunction) {
            android.util.Log.d("MainActivity", "Callback de fechamento registrado: " + callbackFunction);
            jsCallbackFunction = callbackFunction;
        }
    }
    
    // Método para carregar anúncio intersticial
    private void loadInterstitialAd() {
        AdRequest adRequest = new AdRequest.Builder().build();
        
        InterstitialAd.load(this, INTERSTITIAL_AD_UNIT_ID, adRequest,
            new InterstitialAdLoadCallback() {
                @Override
                public void onAdLoaded(InterstitialAd interstitialAd) {
                    android.util.Log.d("MainActivity", "Anúncio intersticial carregado");
                    mInterstitialAd = interstitialAd;
                    
                    // Configura callbacks para eventos do anúncio
                    mInterstitialAd.setFullScreenContentCallback(new FullScreenContentCallback(){
                        @Override
                        public void onAdClicked() {
                            android.util.Log.d("MainActivity", "Anúncio intersticial clicado");
                        }
                        
                        @Override
                        public void onAdDismissedFullScreenContent() {
                            android.util.Log.d("MainActivity", "Anúncio intersticial fechado");
                            mInterstitialAd = null;
                            
                            // Chama o callback JavaScript se estiver registrado
                            if (jsCallbackFunction != null && appView != null && appView.getView() instanceof android.webkit.WebView) {
                                android.webkit.WebView webView = (android.webkit.WebView) appView.getView();
                                runOnUiThread(() -> {
                                    android.util.Log.d("MainActivity", "Executando callback JavaScript: " + jsCallbackFunction);
                                    webView.evaluateJavascript(jsCallbackFunction + "();", null);
                                });
                            }
                            
                            // Recarrega um novo anúncio para a próxima vez
                            loadInterstitialAd();
                        }
                        
                        @Override
                        public void onAdFailedToShowFullScreenContent(com.google.android.gms.ads.AdError adError) {
                            android.util.Log.e("MainActivity", "Falha ao exibir anúncio intersticial: " + adError.getMessage());
                            mInterstitialAd = null;
                        }
                        
                        @Override
                        public void onAdImpression() {
                            android.util.Log.d("MainActivity", "Anúncio intersticial exibido");
                        }
                        
                        @Override
                        public void onAdShowedFullScreenContent() {
                            android.util.Log.d("MainActivity", "Anúncio intersticial mostrado em tela cheia");
                        }
                    });
                }
                
                @Override
                public void onAdFailedToLoad(LoadAdError loadAdError) {
                    android.util.Log.e("MainActivity", "Falha ao carregar anúncio intersticial: " + loadAdError.getMessage());
                    mInterstitialAd = null;
                }
            });
    }
    
    // Método público para exibir anúncio intersticial (chamado pelo JavaScript)
    public void showInterstitialAd() {
        runOnUiThread(() -> {
            if (mInterstitialAd != null) {
                android.util.Log.d("MainActivity", "Exibindo anúncio intersticial");
                mInterstitialAd.show(MainActivity.this);
            } else {
                android.util.Log.d("MainActivity", "Anúncio intersticial não está carregado");
                // Tenta carregar novamente
                loadInterstitialAd();
            }
        });
    }
}
