/**
 * AdMob Native Plugin - Exemplo de Uso JavaScript
 * 
 * Este arquivo demonstra como usar a interface JavaScript do plugin
 * para controlar anúncios intersticiais em aplicações Cordova.
 */

// Classe para gerenciar anúncios AdMob
class AdMobManager {
    constructor() {
        this.isInterfaceReady = false;
        this.callbacks = {
            onAdClosed: null,
            onAdLoaded: null,
            onAdFailed: null
        };
        
        // Aguarda o dispositivo estar pronto
        document.addEventListener('deviceready', () => {
            this.initializeInterface();
        }, false);
    }

    /**
     * Inicializa a interface JavaScript do AdMob
     */
    initializeInterface() {
        // Verifica se a interface está disponível
        const checkInterface = () => {
            if (window.InterstitialAdInterface) {
                this.isInterfaceReady = true;
                console.log('[AdMob] Interface JavaScript disponível');
                
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
                if (!this.isInterfaceReady) {
                    console.error('[AdMob] Interface JavaScript não foi encontrada após 30 segundos');
                    if (this.callbacks.onAdFailed) {
                        this.callbacks.onAdFailed('Interface não disponível');
                    }
                }
            }, 30000);
        }
    }

    /**
     * Exibe um anúncio intersticial
     * @param {Function} onSuccess - Callback de sucesso
     * @param {Function} onError - Callback de erro
     */
    showInterstitial(onSuccess, onError) {
        if (!this.isInterfaceReady) {
            const error = 'Interface JavaScript não está pronta';
            console.error('[AdMob]', error);
            if (onError) onError(error);
            return;
        }

        try {
            console.log('[AdMob] Tentando exibir anúncio intersticial...');
            window.InterstitialAdInterface.showAd();
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('[AdMob] Erro ao exibir anúncio:', error);
            if (onError) onError(error.message);
        }
    }

    /**
     * Verifica se um anúncio intersticial está carregado
     * @returns {boolean} True se o anúncio estiver carregado
     */
    isInterstitialLoaded() {
        if (!this.isInterfaceReady) {
            console.warn('[AdMob] Interface não está pronta');
            return false;
        }

        try {
            return window.InterstitialAdInterface.isAdLoaded();
        } catch (error) {
            console.error('[AdMob] Erro ao verificar status do anúncio:', error);
            return false;
        }
    }

    /**
     * Registra callbacks para eventos do AdMob
     * @param {Object} callbacks - Objeto com callbacks
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    /**
     * Callback chamado quando o anúncio é fechado (chamado pelo código nativo)
     */
    static onAdClosed() {
        console.log('[AdMob] Anúncio intersticial foi fechado');
        
        // Dispara evento customizado
        const event = new CustomEvent('admobAdClosed', {
            detail: { type: 'interstitial' }
        });
        document.dispatchEvent(event);
    }
}

// Torna a classe disponível globalmente
window.AdMobManager = AdMobManager;

// Exemplo de uso simples
const admobExample = {
    manager: null,

    init() {
        this.manager = new AdMobManager();
        
        // Configura callbacks
        this.manager.setCallbacks({
            onAdLoaded: () => {
                console.log('[Example] AdMob interface carregada');
            },
            onAdFailed: (error) => {
                console.error('[Example] Falha no AdMob:', error);
            }
        });

        // Escuta evento de anúncio fechado
        document.addEventListener('admobAdClosed', (event) => {
            console.log('[Example] Evento de anúncio fechado recebido:', event.detail);
        });
    },

    showAd() {
        if (!this.manager) {
            console.error('[Example] Manager não inicializado');
            return;
        }

        this.manager.showInterstitial(
            () => console.log('[Example] Anúncio exibido com sucesso'),
            (error) => console.error('[Example] Erro ao exibir anúncio:', error)
        );
    },

    checkStatus() {
        if (!this.manager) {
            console.error('[Example] Manager não inicializado');
            return;
        }

        const isLoaded = this.manager.isInterstitialLoaded();
        console.log('[Example] Anúncio carregado:', isLoaded);
        return isLoaded;
    }
};

// Inicializa automaticamente quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        admobExample.init();
    });
} else {
    admobExample.init();
}

// Exporta para uso em outros scripts
window.admobExample = admobExample;

/**
 * Funções de conveniência para uso direto no HTML
 */

// Função simples para exibir anúncio (pode ser chamada diretamente do HTML)
function showAdMobInterstitial() {
    if (window.admobExample) {
        window.admobExample.showAd();
    } else {
        console.error('AdMob example não está inicializado');
    }
}

// Função simples para verificar status (pode ser chamada diretamente do HTML)
function checkAdMobStatus() {
    if (window.admobExample) {
        return window.admobExample.checkStatus();
    } else {
        console.error('AdMob example não está inicializado');
        return false;
    }
}

// Torna as funções disponíveis globalmente
window.showAdMobInterstitial = showAdMobInterstitial;
window.checkAdMobStatus = checkAdMobStatus;