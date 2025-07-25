# 📦 cordova-admob-native

Plugin Cordova para injetar dinamicamente **blocos nativos do AdMob** no `MainActivity.java`, possibilitando sobrepor banners e intersticiais à WebView do Cordova — com flexibilidade, sem sobrescrever arquivos inteiros, e respeitando as escolhas do usuário.

---

## ⚠️ Requisitos obrigatórios

Este plugin **não inclui** o SDK do AdMob diretamente. É necessário instalar também o plugin [`admob-plus-cordova`](https://github.com/admob-plus/admob-plus):

```bash
cordova plugin add admob-plus-cordova \
  --variable APP_ID_ANDROID="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy" \
  --variable PLAY_SERVICES_VERSION="21.5.0"
```
🧪 Use IDs de teste do Google AdMob durante o desenvolvimento.

## 🚀 Instalação do Plugin
Clone ou baixe este repositório e instale localmente:

```bash
cordova plugin add /caminho/para/cordova-admob-native \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" \
  --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

## ⚙️ Variáveis Disponíveis

| Variável | Obrigatório | Descrição |
| --- | --- | --- |
| AD_TYPE | ✅ | Tipo de anúncio: banner, interstitial ou banner,interstitial |
| AD_POSITION | ❌ | top, bottom (padrão: bottom) |
| BANNER_AD_UNIT_ID | ✅ (se usar banner) | ID do banner AdMob |
| INTERSTITIAL_AD_UNIT_ID | ✅ (se usar interstitial) | ID do intersticial AdMob |
| APP_ID | ✅ | App ID fornecido pelo AdMob |


📄 Exemplo de uso com WebView Cordova
Para exibir interstitial via JavaScript:
js
Copiar
Editar
// Exibe o anúncio
window.AndroidInterstitial.showAd();

// Verifica se está carregado
if (window.AndroidInterstitial.isAdLoaded()) {
  console.log('Pronto para exibir anúncio intersticial');
}

// Registra callback quando o anúncio for fechado
window.AndroidInterstitial.setOnAdClosedCallback(function () {
  console.log('Anúncio intersticial fechado!');
});
📐 Como o plugin funciona
Localiza automaticamente seu MainActivity.java;

Injeta apenas os blocos necessários (banner_top, banner_bottom, interstitial, js_interface);

Substitui dinamicamente os placeholders {{BANNER_ID}}, {{INTERSTITIAL_ID}};

Garante compatibilidade com WebView sem sobrepor o conteúdo existente;

Permite reaplicação sem duplicações via marcador // ADMOB_NATIVE_PLUGIN.

🛠️ Comandos úteis
bash
Copiar
Editar
cordova clean android
cordova build android
cordova run android
🧪 IDs de Teste (Google AdMob)
Tipo	ID de Teste
App ID	ca-app-pub-3940256099942544~3347511713
Banner	ca-app-pub-3940256099942544/6300978111
Interstitial	ca-app-pub-3940256099942544/1033173712

⚠️ Observações importantes
As alterações são feitas no MainActivity.java gerado pelo Cordova (em platforms/android/...). Se você remover a plataforma Android, as injeções serão perdidas.

Sempre use IDs de teste antes de publicar seu app.

Compatível com projetos que utilizam admob-plus-cordova, não precisa duplicar SDK.

Não sobrescreve o MainActivity inteiro, portanto é seguro para projetos já existentes.

## 📁 Estrutura do Plugin

```bash
cordova-admob-native/
├── plugin.xml
├── package.json
├── scripts/
│   ├── pre_install.js
│   └── after_install.js
├── src/android/
│   ├── utils.js
│   └── blocks/
│       ├── banner_bottom.java.block
│       ├── banner_top.java.block
│       ├── interstitial.java.block
│       └── js_interface.java.block
└── README.md
```

## 👨‍💻 Autor
Desenvolvido por ON00dev
Contribuições, melhorias e forks são bem-vindos!

## 📄 Licença
MIT © [Ano Atual] — Você é livre para modificar, reutilizar e compartilhar.





