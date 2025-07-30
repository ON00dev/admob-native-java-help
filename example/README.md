# AdMob Native Plugin - Exemplos de Uso

Este diretório contém exemplos práticos de como usar o plugin AdMob Native em aplicações Cordova.

## Arquivos de Exemplo

### 1. `index.html`
Página HTML completa que demonstra:
- Interface de usuário para testar anúncios intersticiais
- Integração com a interface JavaScript do plugin
- Callbacks para eventos de anúncios
- Verificação de status dos anúncios

### 2. `admob-example.js`
Biblioteca JavaScript que fornece:
- Classe `AdMobManager` para gerenciar anúncios
- Funções de conveniência para uso direto
- Sistema de callbacks e eventos
- Tratamento de erros

## Como Usar

### Instalação do Plugin

```bash
# Instalação básica
cordova plugin add path/to/admob-native-plugin

# Instalação com configurações personalizadas
cordova plugin add path/to/admob-native-plugin \
  --variable APP_ID="seu-app-id" \
  --variable BANNER_AD_UNIT_ID="seu-banner-id" \
  --variable INTERSTITIAL_AD_UNIT_ID="seu-interstitial-id" \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_SHOW_ON_PAGES="index.html,home.html" \
  --variable BANNER_HIDE_ON_PAGES="login.html,splash.html" \
  --variable CHECK_URL_INTERVAL="1000" \
  --variable SETUP_DELAY="2000" \
  --variable JS_INTERFACE_DELAY="3000"
```

### Configurações Disponíveis

| Variável | Descrição | Valor Padrão |
|----------|-----------|-------------|
| `APP_ID` | ID do aplicativo AdMob | `ca-app-pub-3940256099942544~3347511713` |
| `BANNER_AD_UNIT_ID` | ID da unidade de anúncio banner | `ca-app-pub-3940256099942544/6300978111` |
| `INTERSTITIAL_AD_UNIT_ID` | ID da unidade de anúncio intersticial | `ca-app-pub-3940256099942544/1033173712` |
| `AD_TYPE` | Tipos de anúncio (`banner`, `interstitial`, ou ambos) | `banner` |
| `AD_POSITION` | Posição do banner (`top` ou `bottom`) | `bottom` |
| `BANNER_SHOW_ON_PAGES` | Páginas onde o banner deve aparecer | `index.html` |
| `BANNER_HIDE_ON_PAGES` | Páginas onde o banner deve ser ocultado | `` (vazio) |
| `CHECK_URL_INTERVAL` | Intervalo de verificação de URL (ms) | `1000` |
| `SETUP_DELAY` | Atraso para configuração inicial (ms) | `2000` |
| `JS_INTERFACE_DELAY` | Atraso para interface JavaScript (ms) | `3000` |

### Uso Básico

#### 1. Incluir o JavaScript no seu HTML

```html
<script src="admob-example.js"></script>
```

#### 2. Exibir Anúncio Intersticial

```javascript
// Método simples
showAdMobInterstitial();

// Ou usando a classe AdMobManager
const manager = new AdMobManager();
manager.showInterstitial(
    () => console.log('Anúncio exibido'),
    (error) => console.error('Erro:', error)
);
```

#### 3. Verificar Status do Anúncio

```javascript
// Método simples
const isLoaded = checkAdMobStatus();

// Ou usando a classe
const isLoaded = manager.isInterstitialLoaded();
```

#### 4. Escutar Eventos

```javascript
// Evento quando anúncio é fechado
document.addEventListener('admobAdClosed', (event) => {
    console.log('Anúncio fechado:', event.detail);
});
```

### Configuração de Páginas

O plugin permite controlar em quais páginas os banners devem aparecer:

```bash
# Mostrar banner apenas em páginas específicas
--variable BANNER_SHOW_ON_PAGES="index.html,home.html,products.html"

# Ocultar banner em páginas específicas
--variable BANNER_HIDE_ON_PAGES="login.html,register.html,splash.html"

# Configurar intervalo de verificação (em milissegundos)
--variable CHECK_URL_INTERVAL="500"
```

### Exemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
    <title>Meu App</title>
</head>
<body>
    <h1>Meu Aplicativo</h1>
    <button onclick="showAdMobInterstitial()">Mostrar Anúncio</button>
    <button onclick="checkStatus()">Verificar Status</button>
    
    <script src="admob-example.js"></script>
    <script>
        function checkStatus() {
            const isLoaded = checkAdMobStatus();
            alert('Anúncio carregado: ' + isLoaded);
        }
        
        // Escuta quando anúncio é fechado
        document.addEventListener('admobAdClosed', () => {
            alert('Anúncio foi fechado!');
        });
    </script>
</body>
</html>
```

## Funcionalidades

### Banner Automático
- Exibido automaticamente nas páginas configuradas
- Posicionamento configurável (topo ou rodapé)
- Controle por página específica

### Anúncio Intersticial
- Controle manual via JavaScript
- Interface JavaScript integrada
- Callbacks para eventos
- Recarregamento automático após fechamento

### Detecção de Páginas
- Verificação periódica da URL atual
- Configuração flexível de páginas
- Suporte a múltiplas páginas

## Troubleshooting

### Interface JavaScript não disponível
- Verifique se o plugin foi instalado corretamente
- Aguarde a inicialização (pode levar alguns segundos)
- Verifique o console para mensagens de erro

### Banner não aparece
- Verifique a configuração `BANNER_SHOW_ON_PAGES`
- Confirme que a página atual está na lista
- Verifique se não está na lista `BANNER_HIDE_ON_PAGES`

### Anúncio intersticial não carrega
- Verifique os IDs das unidades de anúncio
- Confirme que o AdMob está configurado corretamente
- Verifique a conexão com a internet

## Notas Importantes

1. **IDs de Teste**: Os IDs padrão são para teste. Use seus próprios IDs em produção.
2. **Inicialização**: A interface JavaScript pode levar alguns segundos para ficar disponível.
3. **Compatibilidade**: Testado com Cordova 9+ e Android 5+.
4. **AdMob Plus**: Compatible com o plugin `admob-plus-cordova` se instalado.

## Suporte

Para problemas ou dúvidas:
1. Verifique o console do dispositivo
2. Confirme as configurações do plugin
3. Teste com IDs de anúncio de teste primeiro