# Guia de Instalação - AdMob Native Java Plugin

## Pré-requisitos

- Projeto Cordova configurado
- Android SDK instalado
- Conta AdMob ativa com IDs de unidades de anúncio

## Processo de Instalação

### 1. Instalação do Plugin

```bash
# Navegue até o diretório do seu projeto Cordova
cd seu-projeto-cordova

# Instale o plugin
cordova plugin add caminho/para/admob-native-java-help
```

### 2. Configuração Inicial

Antes da instalação, o plugin solicitará as seguintes informações:

- **Tipo de anúncio**: `banner`, `interstitial` ou `banner,interstitial`
- **Posição do banner**: `top` ou `bottom`
- **ID da unidade de anúncio banner**: Seu ID do AdMob para banner
- **ID da unidade de anúncio intersticial**: Seu ID do AdMob para intersticial
- **ID da aplicação AdMob**: Seu Application ID do AdMob
- **Páginas para exibir banner**: Lista de páginas (ex: `index.html,game.html`)

### 3. Exemplo de Configuração

```
Tipo de anúncio: banner,interstitial
Posição do banner: bottom
ID Banner: ca-app-pub-1234567890123456/1234567890
ID Intersticial: ca-app-pub-1234567890123456/0987654321
ID da Aplicação: ca-app-pub-1234567890123456~1234567890
Páginas do banner: index.html,menu.html
```

### 4. Uso no JavaScript

#### Para Anúncios Intersticiais

```javascript
// Verificar se o anúncio está carregado
if (window.AndroidInterstitial && window.AndroidInterstitial.isAdLoaded()) {
    // Exibir o anúncio
    window.AndroidInterstitial.showAd();
} else {
    console.log('Anúncio intersticial não está carregado');
}

// Callback para quando o anúncio for fechado (opcional)
function onInterstitialClosed() {
    console.log('Anúncio intersticial foi fechado');
    // Sua lógica aqui
}
```

#### Para Banners

Os banners são exibidos automaticamente nas páginas configuradas. Não é necessário código JavaScript adicional.

### 5. Build e Teste

```bash
# Build para Android
cordova build android

# Executar no dispositivo/emulador
cordova run android
```

### 6. Verificação da Instalação

Após a instalação, verifique se:

1. **AndroidManifest.xml** contém o Application ID:
   ```xml
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="seu-app-id" />
   ```

2. **MainActivity.java** foi modificado com:
   - Importações do AdMob
   - Variáveis de configuração
   - Métodos para banner e/ou intersticial
   - Interface JavaScript (se intersticial estiver habilitado)

### 7. IDs de Teste do AdMob

Para desenvolvimento, use os IDs de teste do Google:

- **Application ID**: `ca-app-pub-3940256099942544~3347511713`
- **Banner**: `ca-app-pub-3940256099942544/6300978111`
- **Intersticial**: `ca-app-pub-3940256099942544/1033173712`

### 8. Solução de Problemas

#### Banner não aparece:
- Verifique se a página atual está na lista de páginas configuradas
- Confirme se o Application ID está correto no AndroidManifest.xml
- Verifique os logs do Android para erros do AdMob

#### Intersticial não funciona:
- Confirme que `interstitial` está incluído no tipo de anúncio
- Verifique se `window.AndroidInterstitial` está disponível
- Use `isAdLoaded()` antes de chamar `showAd()`

#### Logs úteis:
```bash
# Visualizar logs do Android
adb logcat | grep MainActivity
```

### 9. Migração para Produção

1. Substitua os IDs de teste pelos IDs reais da sua conta AdMob
2. Remova ou desinstale o plugin
3. Reinstale com os IDs de produção
4. Faça um build de release

### 10. Desinstalação

```bash
cordova plugin remove admob-native-java-help
```

**Nota**: A desinstalação remove automaticamente todas as modificações feitas pelo plugin.

## Suporte

Em caso de problemas, verifique:
1. Versão do Cordova compatível
2. Configuração correta dos IDs do AdMob
3. Permissões de internet no AndroidManifest.xml
4. Logs de erro no console do Android