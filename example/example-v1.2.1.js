/**
 * AdMobManager - Classe para gerenciar anúncios AdMob
 * Compatível com a versão 1.2.1 do plugin admob-native-java-help
 */
class AdMobManager {
    constructor() {
        this.isNativeInterfaceReady = false;
        this.callbacks = {
            onAdClosed: null,
            onAdLoaded: null,
            onAdFailed: null
        };
        
        // Aguarda o dispositivo estar pronto
        document.addEventListener('deviceready', () => {
            this.initializeNativeInterface();
        }, false);
    }
    
    /**
     * Inicializa a interface nativa do plugin admob-native-java-help
     */
    initializeNativeInterface() {
        // Verifica se a interface está disponível
        const checkInterface = () => {
            if (window.InterstitialAdInterface) {
                this.isNativeInterfaceReady = true;
                console.log('Interface nativa do AdMob disponível');
                
                // Registra callback para quando o anúncio for fechado
                window.InterstitialAdInterface.setOnAdClosedCallback('AdMobManager.onAdClosed');
                
                if (this.callbacks.onAdLoaded) {
                    this.callbacks.onAdLoaded();
                }
                
                return true;
            }
            return false;
        };

        // Tenta encontrar a interface imediatamente
        if (!checkInterface()) {
            // Se não encontrou, verifica periodicamente
            const interval = setInterval(() => {
                if (checkInterface()) {
                    clearInterval(interval);
                }
            }, 500);

            // Para de verificar após 30 segundos
            setTimeout(() => {
                clearInterval(interval);
                if (!this.isNativeInterfaceReady) {
                    console.warn('Interface nativa do AdMob não encontrada após 30 segundos');
                    if (this.callbacks.onAdFailed) {
                        this.callbacks.onAdFailed('Interface nativa não disponível');
                    }
                }
            }, 30000);
        }
    }
    
    /**
     * Verifica se o anúncio intersticial está carregado
     */
    isInterstitialAdLoaded() {
        if (!this.isNativeInterfaceReady) {
            console.warn('Interface nativa do AdMob não está pronta');
            return false;
        }
        
        try {
            return window.InterstitialAdInterface.isAdLoaded();
        } catch (error) {
            console.error('Erro ao verificar status do anúncio intersticial:', error);
            return false;
        }
    }
    
    /**
     * Exibe um anúncio intersticial
     */
    showInterstitialAd() {
        // Em modo de desenvolvimento, simula o anúncio
        if (window.cordova && window.cordova.platformId === 'browser') {
            console.log('Simulando exibição de anúncio intersticial no navegador');
            setTimeout(() => {
                console.log('Anúncio intersticial fechado (simulação)');
                if (this.callbacks.onAdClosed) {
                    this.callbacks.onAdClosed();
                }
            }, 2000);
            return true;
        }
        
        if (!this.isNativeInterfaceReady) {
            console.warn('Interface nativa do AdMob não está pronta');
            if (this.callbacks.onAdFailed) {
                this.callbacks.onAdFailed('Interface nativa não disponível');
            }
            return false;
        }
        
        try {
            // Verifica se o anúncio está carregado
            if (!this.isInterstitialAdLoaded()) {
                console.warn('Anúncio intersticial não está carregado');
                if (this.callbacks.onAdFailed) {
                    this.callbacks.onAdFailed('Anúncio não carregado');
                }
                return false;
            }
            
            // Exibe o anúncio
            window.InterstitialAdInterface.showAd();
            return true;
        } catch (error) {
            console.error('Erro ao exibir anúncio intersticial:', error);
            if (this.callbacks.onAdFailed) {
                this.callbacks.onAdFailed(error.message || 'Erro desconhecido');
            }
            return false;
        }
    }
    
    /**
     * Configura callbacks para eventos de anúncios
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }
    
    /**
     * Método estático para ser chamado quando o anúncio é fechado
     * Este método é chamado pelo callback nativo
     */
    static onAdClosed() {
        console.log('Anúncio intersticial fechado');
        // Dispara um evento customizado que pode ser capturado por qualquer parte da aplicação
        document.dispatchEvent(new CustomEvent('admobAdClosed'));
        
        // Se houver uma instância global, chama o callback
        if (window.adMobManager && window.adMobManager.callbacks && window.adMobManager.callbacks.onAdClosed) {
            window.adMobManager.callbacks.onAdClosed();
        }
    }
}

// Exemplo de uso
const admobExample = {
    init: function() {
        // Cria e inicializa o gerenciador de anúncios
        this.adManager = new AdMobManager();
        
        // Configura callbacks
        this.adManager.setCallbacks({
            onAdClosed: () => {
                console.log('Callback: Anúncio fechado');
                // Aqui você pode executar ações após o fechamento do anúncio
            },
            onAdFailed: (error) => {
                console.error('Callback: Falha no anúncio', error);
            },
            onAdLoaded: () => {
                console.log('Callback: Interface AdMob carregada');
            }
        });
        
        // Adiciona listener para o evento de fechamento do anúncio
        document.addEventListener('admobAdClosed', this.onAdClosed.bind(this), false);
    },
    
    // Método chamado quando o anúncio é fechado (via evento)
    onAdClosed: function() {
        console.log('Evento: Anúncio fechado');
        // Aqui você pode executar ações após o fechamento do anúncio
    },
    
    // Método para exibir um anúncio intersticial
    showAd: function() {
        if (this.adManager) {
            return this.adManager.showInterstitialAd();
        }
        return false;
    },
    
    // Método para verificar se o anúncio está carregado
    isAdLoaded: function() {
        if (this.adManager) {
            return this.adManager.isInterstitialAdLoaded();
        }
        return false;
    }
};

// Inicializa o exemplo quando o dispositivo estiver pronto
document.addEventListener('deviceready', () => {
    admobExample.init();
}, false);

// Funções globais para uso no HTML
function showAdMobInterstitial() {
    return admobExample.showAd();
}

function checkAdMobStatus() {
    return admobExample.isAdLoaded();
}