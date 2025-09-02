/**
 * Exemplo de uso do AdMob Native Java Plugin em produção
 * 
 * Este arquivo demonstra como implementar anúncios banner e intersticiais
 * em um aplicativo Cordova usando o plugin admob-native-java-help
 */

class AdMobManager {
    constructor() {
        this.isDeviceReady = false;
        this.interstitialCallbacks = [];
        
        // Aguarda o Cordova estar pronto
        document.addEventListener('deviceready', () => {
            this.isDeviceReady = true;
            this.initializeAdMob();
        }, false);
    }
    
    /**
     * Inicializa o AdMob após o dispositivo estar pronto
     */
    initializeAdMob() {
        console.log('AdMob Manager inicializado');
        
        // Verifica se a interface do intersticial está disponível
        if (window.AndroidInterstitial) {
            console.log('Interface AndroidInterstitial disponível');
        } else {
            console.log('Interface AndroidInterstitial não encontrada');
        }
        
        // Registra callback global para fechamento do intersticial
        window.onInterstitialClosed = () => {
            this.handleInterstitialClosed();
        };
    }
    
    /**
     * Exibe anúncio intersticial
     * @param {Function} callback - Função chamada após o anúncio ser fechado
     * @returns {Promise<boolean>} - True se o anúncio foi exibido
     */
    async showInterstitial(callback = null) {
        if (!this.isDeviceReady) {
            console.log('Dispositivo não está pronto');
            return false;
        }
        
        if (!window.AndroidInterstitial) {
            console.log('Interface AndroidInterstitial não disponível');
            return false;
        }
        
        try {
            // Verifica se o anúncio está carregado
            const isLoaded = window.AndroidInterstitial.isAdLoaded();
            
            if (!isLoaded) {
                console.log('Anúncio intersticial não está carregado');
                return false;
            }
            
            // Adiciona callback se fornecido
            if (callback && typeof callback === 'function') {
                this.interstitialCallbacks.push(callback);
            }
            
            // Exibe o anúncio
            window.AndroidInterstitial.showAd();
            console.log('Anúncio intersticial exibido');
            return true;
            
        } catch (error) {
            console.error('Erro ao exibir anúncio intersticial:', error);
            return false;
        }
    }
    
    /**
     * Verifica se o anúncio intersticial está carregado
     * @returns {boolean}
     */
    isInterstitialLoaded() {
        if (!window.AndroidInterstitial) {
            return false;
        }
        
        try {
            return window.AndroidInterstitial.isAdLoaded();
        } catch (error) {
            console.error('Erro ao verificar status do intersticial:', error);
            return false;
        }
    }
    
    /**
     * Manipula o fechamento do anúncio intersticial
     */
    handleInterstitialClosed() {
        console.log('Anúncio intersticial foi fechado');
        
        // Executa todos os callbacks registrados
        this.interstitialCallbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('Erro ao executar callback:', error);
            }
        });
        
        // Limpa os callbacks
        this.interstitialCallbacks = [];
    }
    
    /**
     * Exibe anúncio intersticial com retry automático
     * @param {number} maxRetries - Número máximo de tentativas
     * @param {number} retryDelay - Delay entre tentativas (ms)
     * @param {Function} callback - Callback após sucesso
     */
    async showInterstitialWithRetry(maxRetries = 3, retryDelay = 2000, callback = null) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.log(`Tentativa ${attempt} de exibir intersticial`);
            
            const success = await this.showInterstitial(callback);
            
            if (success) {
                return true;
            }
            
            if (attempt < maxRetries) {
                console.log(`Aguardando ${retryDelay}ms antes da próxima tentativa`);
                await this.delay(retryDelay);
            }
        }
        
        console.log('Falha ao exibir intersticial após todas as tentativas');
        return false;
    }
    
    /**
     * Utilitário para delay
     * @param {number} ms - Milissegundos
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Obtém informações de debug do AdMob
     */
    getDebugInfo() {
        return {
            deviceReady: this.isDeviceReady,
            androidInterstitialAvailable: !!window.AndroidInterstitial,
            interstitialLoaded: this.isInterstitialLoaded(),
            pendingCallbacks: this.interstitialCallbacks.length
        };
    }
}

// Instância global do gerenciador
const adMobManager = new AdMobManager();

// Exemplos de uso:

// 1. Exibir intersticial simples
function showAd() {
    adMobManager.showInterstitial(() => {
        console.log('Usuário fechou o anúncio');
        // Continuar com a lógica do jogo/app
    });
}

// 2. Exibir intersticial com retry
function showAdWithRetry() {
    adMobManager.showInterstitialWithRetry(3, 2000, () => {
        console.log('Anúncio foi fechado após retry');
    });
}

// 3. Verificar status antes de exibir
function checkAndShowAd() {
    if (adMobManager.isInterstitialLoaded()) {
        adMobManager.showInterstitial();
    } else {
        console.log('Anúncio não está pronto ainda');
    }
}

// 4. Debug do AdMob
function debugAdMob() {
    console.log('Debug AdMob:', adMobManager.getDebugInfo());
}

// Exporta para uso global
window.AdMobManager = adMobManager;
window.showAd = showAd;
window.showAdWithRetry = showAdWithRetry;
window.checkAndShowAd = checkAndShowAd;
window.debugAdMob = debugAdMob;

// Exemplo de integração com eventos do jogo
document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: Exibir anúncio ao completar uma fase
    document.getElementById('next-level')?.addEventListener('click', () => {
        // Exibe anúncio antes de avançar
        adMobManager.showInterstitial(() => {
            // Avança para próxima fase após o anúncio
            console.log('Avançando para próxima fase');
        });
    });
    
    // Exemplo: Exibir anúncio ao perder o jogo
    document.getElementById('game-over')?.addEventListener('click', () => {
        adMobManager.showInterstitialWithRetry(2, 1000, () => {
            // Reinicia o jogo após o anúncio
            console.log('Reiniciando jogo');
        });
    });
});