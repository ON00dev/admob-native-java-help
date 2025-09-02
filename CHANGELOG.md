# Changelog

All notable changes to this project will be documented in this file.

## [1.2.2] - 2025-09-02

### Added
- **COMPREHENSIVE DOCUMENTATION**: Complete documentation for page detection and folder structures
  - `PAGE_DETECTION.md`: Technical documentation explaining how the plugin detects HTML pages
  - `FOLDER_EXAMPLES.md`: Practical examples with different folder structures and configurations
  - Detailed explanations of URL monitoring mechanism and real-time detection
  - Advanced configuration examples for complex project structures

### Enhanced
- **DEVELOPER EXPERIENCE**: Improved documentation with practical examples
  - Real-world scenarios for games, enterprise apps, and e-commerce
  - Best practices for folder organization and configuration
  - Debug tips and troubleshooting guides
  - Performance optimization recommendations

## [1.2.1] - 2025-07-30

### Added
- **OPTIMIZED INITIALIZATION**: Implementation of AdMob initialization with configurable delay
  - `ADMOB_INIT_DELAY`: New preference to control AdMob initialization delay
  - `setup_admob_with_delay.java.block`: New block for delayed initialization
  - `admob_init.java.block`: Dedicated block for AdMob initialization

### Fixed
- Corrigidos erros de sintaxe nas injeções em MainActivity.java
- Movidas as declarações de variáveis AdMob para dentro da classe MainActivity
- Removidas declarações duplicadas de variáveis
- Adicionadas as importações necessárias para as classes do AdMob
- Corrigida a estrutura da classe adicionando chave de fechamento faltante no método setupAdMobBanner
- Adicionadas anotações @NonNull para melhor compatibilidade com o SDK mais recente
- Melhorada a recuperação de erros ao carregar anúncios

### Improved
- Implementados os métodos completos para funcionalidade do AdMob
- Melhorado o tratamento de erros e exceções
- Otimizada a interface JavaScript para anúncios intersticiais
- Atualizada a documentação e exemplos

## [1.2.0] - 2025-07-30

### Added
- **CUSTOM PREFERENCES**: Added configurable preferences for advanced banner control
  - `BANNER_SHOW_ON_PAGES`: Control which pages display banners
  - `BANNER_HIDE_ON_PAGES`: Control which pages hide banners
  - `CHECK_URL_INTERVAL`: Configurable URL checking interval
  - `SETUP_DELAY`: Configurable setup delay
  - `JS_INTERFACE_DELAY`: Configurable JavaScript interface delay
- **MODULAR ARCHITECTURE**: Complete restructure with separate Java blocks
  - `variables.java.block`: Centralized variable management
  - `check_pages.java.block`: URL monitoring and page detection
  - `setup_banner.java.block`: Banner configuration and positioning
  - `setup_js_interface.java.block`: JavaScript interface setup
  - `interstitial_methods.java.block`: Interstitial ad management
- **EXAMPLE FILES**: Comprehensive examples for developers
  - `example/index.html`: Complete HTML interface demo
  - `example/admob-example.js`: JavaScript library with AdMobManager class
  - `example/README.md`: Detailed documentation and usage guide

### Enhanced
- **SMART PAGE DETECTION**: Automatic URL monitoring with configurable intervals
- **FLEXIBLE BANNER CONTROL**: Show/hide banners based on current page
- **IMPROVED JAVASCRIPT INTERFACE**: Enhanced callback system and error handling
- **BETTER CONFIGURATION**: All timing and behavior aspects are now configurable
- **DEVELOPER EXPERIENCE**: Complete examples and documentation

### Technical Improvements
- Modular Java block architecture for better maintainability
- Enhanced utils.js with support for all new configuration options
- Improved pre_install.js to handle new preference variables
- Better separation of concerns between different plugin components
- Comprehensive error handling and logging throughout

## [1.1.0] - 2025-07-30

### Fixed
- **CRITICAL BUG**: Fixed interstitial ads not displaying properly
- **INTERSTITIAL IMPLEMENTATION**: Complete rewrite of interstitial.java.block based on working example
- **JAVASCRIPT INTERFACE**: Fixed js_interface.java.block with proper callback handling
- **ADMOB INITIALIZATION**: Added admob_init.java.block for proper AdMob SDK initialization
- **IMPORTS**: Added missing imports for interstitial ad functionality in utils.js
- **LIFECYCLE MANAGEMENT**: Implemented complete interstitial ad lifecycle (load, show, callbacks)

### Added
- **NEW BLOCK**: Created admob_init.java.block for AdMob initialization and JavaScript interface setup
- **ENHANCED UTILS**: Updated utils.js to include admob_init.java.block for interstitial ads
- **COMPLETE INTEGRATION**: Full integration between Java and JavaScript for interstitial ads
- **ERROR HANDLING**: Proper error handling and logging for interstitial ad operations

### Technical Details
- Rewrote interstitial.java.block with complete AdMob SDK implementation
- Fixed JavaScript interface implementation with proper callback handling
- Added admob_init.java.block for proper AdMob initialization
- Enhanced loadBlocks function to include AdMob initialization for interstitial ads
- Added missing imports: MobileAds, InterstitialAd, InterstitialAdLoadCallback, FullScreenContentCallback, LoadAdError
- Implemented complete interstitial ad lifecycle management with proper callbacks
- Fixed timing issues with AdMob initialization and WebView readiness
- Added proper error handling and logging throughout the interstitial ad flow

## [1.0.19] - 2025-07-25

### Changed
- **DOCUMENTATION**: Complete translation of README.md from Portuguese to English
- **INTERNATIONALIZATION**: Enhanced accessibility for international developers
- **STANDARDIZATION**: Unified documentation language for better global compatibility
- **USER EXPERIENCE**: Improved readability and understanding for English-speaking developers
- **DEFAULT CONFIGURATION**: Confirmed automatic setup with test banner bottom configuration
- **PLUGIN STRUCTURE**: Enhanced documentation with detailed plugin architecture explanation

### Fixed
- **CRITICAL BUG**: Fixed CLI variables not being saved correctly in userConfig.json
- **CRITICAL BUG**: Fixed AD_POSITION variable being overridden by default value
- **CRITICAL BUG**: Fixed undefined bannerId, interstitialId, and appId in installation logs
- **CRITICAL BUG**: Fixed interstitial ads not working properly - complete implementation rewrite
- **COMPATIBILITY**: Improved AndroidManifest.xml injection when admob-plus-cordova is present
- **INSTALLATION**: Enhanced pre_install.js with proper fallback values and debug logging
- **MANIFEST**: Fixed Application ID injection logic to work with existing plugins
- **INTERSTITIAL**: Fixed incomplete interstitial.java.block implementation
- **JAVASCRIPT INTERFACE**: Fixed missing JavaScript interface setup for interstitial ads
- **ADMOB INITIALIZATION**: Fixed missing AdMob initialization in interstitial implementation

### Added
- **TROUBLESHOOTING**: Comprehensive troubleshooting section in README.md
- **DEBUG LOGGING**: Added CLI variables debugging in pre_install.js
- **FALLBACK VALUES**: Added default test IDs when variables are not provided
- **COMPATIBILITY CHECK**: Enhanced detection and handling of admob-plus-cordova plugin
- **ERROR HANDLING**: Improved error messages and installation guidance

### Technical Details
- Translated all sections: installation examples, usage guides, configuration variables
- Updated code comments and examples to English
- Maintained all functionality while improving documentation clarity
- Enhanced plugin structure documentation with detailed descriptions
- Standardized terminology throughout the documentation
- Documented default configuration behavior for seamless installation
- Added comprehensive usage examples for different ad types and positions
- Improved installation instructions with clear step-by-step guidance
- Removed duplicate Portuguese content from README.md
- Confirmed plugin.xml default values for automatic test banner configuration
- Fixed variable processing in pre_install.js to prevent undefined values
- Enhanced AndroidManifest.xml injection logic for better plugin compatibility
- Added comprehensive troubleshooting guide with common problems and solutions
- Completely rewrote interstitial.java.block with proper AdMob SDK implementation
- Added missing imports for InterstitialAd, InterstitialAdLoadCallback, FullScreenContentCallback
- Created admob_init.java.block for proper AdMob initialization and JavaScript interface setup
- Fixed JavaScript interface implementation with proper callback handling
- Enhanced loadBlocks function to include AdMob initialization for interstitial ads
- Implemented complete interstitial ad lifecycle management (load, show, callbacks)
- Added proper error handling and logging for interstitial ad operations

## [1.0.18] - 2025-07-25

### Fixed
- **COMPATIBILIDADE CRÍTICA**: Resolvido conflito de duplicação com plugin admob-plus-cordova
- **AndroidManifest.xml**: Plugin agora detecta admob-plus-cordova e pula modificações no manifest para evitar duplicações
- **AdActivity duplicada**: Implementada lógica para prevenir duplicação da activity com.google.android.gms.ads.AdActivity
- **Compilação Android**: Corrigidos erros de sintaxe Java no MainActivity.java
- **Integração harmoniosa**: Ambos plugins agora funcionam juntos sem conflitos

### Added
- **Detecção automática**: Plugin detecta presença do admob-plus-cordova automaticamente
- **Skip inteligente**: Pula modificações no AndroidManifest.xml quando admob-plus-cordova está presente
- **Logs informativos**: Mensagens claras sobre compatibilidade entre plugins
- **Divisão de responsabilidades**: admob-plus-cordova gerencia SDK, admob-native-java-help cria overlay

### Technical Details
- O plugin agora verifica dependencies no package.json para detectar admob-plus-cordova
- Quando detectado, define global.skipManifestModifications = true
- Função injectIntoAndroidManifest verifica flag antes de modificar manifest
- Mantém apenas injeção de código nativo no MainActivity.java para funcionalidade de overlay
- Resolve conflitos de AdActivity duplicada que causavam falha na compilação
- Permite uso conjunto: admob-plus-cordova (SDK base) + admob-native-java-help (overlay nativo)

## [1.0.17] - 2025-07-25

### Fixed
- **CRITICAL BUG**: Fixed app crash caused by missing AdMob Application ID in AndroidManifest.xml
- **CRITICAL BUG**: Fixed app crash caused by premature AdMob initialization before Cordova was ready
- Added automatic injection of `com.google.android.gms.ads.APPLICATION_ID` meta-data in AndroidManifest.xml
- Enhanced after_install.js script to configure both MainActivity.java and AndroidManifest.xml
- Added `injectIntoAndroidManifest` function in utils.js for proper AdMob initialization
- Updated banner blocks to use delayed initialization with appView.post()

### Technical Details
- The app was crashing with `IllegalStateException: Invalid application ID` because the AdMob SDK requires the Application ID to be declared in AndroidManifest.xml
- Fixed timing issue where AdMob code was executing before Cordova was fully initialized
- AdMob banner initialization now runs after loadUrl() using delayed execution
- The plugin now automatically injects the required meta-data tag during installation
- This resolves the crash that occurred when opening apps with AdMob integration

## [1.0.16] - 2025-07-25

### Fixed
- **CRITICAL BUG**: Fixed app crash caused by missing AdMob Application ID in AndroidManifest.xml
- Added automatic injection of `com.google.android.gms.ads.APPLICATION_ID` meta-data in AndroidManifest.xml
- Enhanced after_install.js script to configure both MainActivity.java and AndroidManifest.xml
- Added `injectIntoAndroidManifest` function in utils.js for proper AdMob initialization

### Technical Details
- The app was crashing with `IllegalStateException: Invalid application ID` because the AdMob SDK requires the Application ID to be declared in AndroidManifest.xml
- The plugin now automatically injects the required meta-data tag during installation
- This resolves the crash that occurred when opening apps with AdMob integration

## [1.0.15] - 2025-07-25
### [OK] Melhorias
- **Documentação aprimorada**: Melhorada a clareza das instruções de uso no README
- **Validação de funcionamento**: Confirmado que todas as injeções automáticas funcionam corretamente
- **Testes de compatibilidade**: Verificada compatibilidade com diferentes estruturas de projeto Cordova

### [OK] Arquivos atualizados
- `package.json`: Versão atualizada para 1.0.14
- `plugin.xml`: Versão atualizada para 1.0.14

---

## [1.0.14] - 2025-07-25
### [OK] Melhorias
- **Injeção automática de imports**: Plugin agora injeta automaticamente os imports necessários do AdMob no MainActivity.java
- **Imports incluídos automaticamente**:
  - `import android.widget.LinearLayout;`
  - `import com.google.android.gms.ads.AdRequest;`
  - `import com.google.android.gms.ads.AdSize;`
  - `import com.google.android.gms.ads.AdView;`
- **Processo totalmente automatizado**: Não é mais necessário adicionar imports manualmente

### [OK] Arquivos atualizados
- `src/android/utils.js`: Adicionada função `injectImports()` para injeção automática
- `package.json`: Versão atualizada para 1.0.13
- `plugin.xml`: Versão atualizada para 1.0.13

---

## [1.0.13] - 2025-07-25

### 🔧 Dependency Management
- **Automatic AdMob dependency**: Added automatic inclusion of Google Mobile Ads SDK (play-services-ads:22.6.0)
- **Framework integration**: Plugin now automatically adds AdMob dependency to build.gradle via plugin.xml
- **Compilation fix**: Resolved compilation errors related to missing AdMob classes (AdView, AdRequest, AdSize)
- **Simplified setup**: No manual dependency configuration required

### 🚀 Technical Improvements
- **Build automation**: Streamlined build process with automatic dependency resolution
- **Error prevention**: Prevents "cannot find symbol" errors for AdMob classes
- **Plugin reliability**: Enhanced plugin installation process

### 📝 Files Updated
- `plugin.xml`: Added framework dependency for Google Mobile Ads SDK
- `package.json`: Updated version to 1.0.12

---

## [1.0.11] - 2025-07-25

### 🎨 UI/UX Improvements
- **Emoji replacement**: Replaced all ✅ emojis with [OK] text for better compatibility
- **Folder icons**: Replaced all 📂/📁 emojis with [FOLDER] text for consistent display
- **Cross-platform compatibility**: Improved text display across different terminals and systems
- **Accessibility**: Enhanced accessibility by using text instead of emojis

### 📝 Files Updated
- `README.md`: Updated table markers and section headers
- `CHANGELOG.md`: Updated validation section header
- `scripts/after_install.js`: Updated console log messages
- `scripts/pre_install.js`: Updated success messages
- `src/android/utils.js`: Updated injection success message

---

## [1.0.10] - 2025-07-25

### Internationalization
- **English Translation**: All logs, comments, and console messages translated from Portuguese to English
- **Code Comments**: Updated all Portuguese comments to English for better international compatibility
- **Console Output**: Standardized all console.log and console.error messages to English
- **Error Messages**: Translated all error messages to English

### Technical Improvements
- Enhanced code readability for international developers
- Consistent English language throughout the codebase
- Better compatibility with international development teams

---

## [1.0.9] - 2025-07-25

### 🚀 Simplificação Importante
- **Detecção direta do package**: Substituída busca recursiva por leitura direta do `config.xml`
- **Caminho previsível**: Utiliza o padrão Cordova `platforms/android/app/src/main/java/{package_path}/MainActivity.java`
- **Performance melhorada**: Eliminada necessidade de busca em múltiplos diretórios
- **Maior confiabilidade**: Usa o package name oficial do projeto em vez de tentativa e erro

### 🔧 Melhorias Técnicas
- Nova função `getPackageDirFromConfig` que lê o package ID do `config.xml`
- Conversão automática do package name para caminho do sistema operacional
- Logs mais claros mostrando o package encontrado e caminho calculado
- Código mais limpo e manutenível

---

## [1.0.8] - 2025-07-25

### 🐛 Correções Críticas
- **Corrigida busca recursiva do MainActivity.java**: A função `findPackageDir` agora busca recursivamente pelo arquivo `MainActivity.java` em toda a estrutura de diretórios do pacote
- **Resolvido problema com pacotes aninhados**: Plugin agora funciona corretamente com pacotes como `com.teste.ok` em vez de apenas `com`
- **Melhorada detecção de estrutura de projeto**: Busca automática pelo arquivo correto independente da profundidade do pacote

### 🔧 Melhorias Técnicas
- **Busca recursiva inteligente**: Algoritmo otimizado para encontrar o MainActivity.java em qualquer nível de aninhamento
- **Logs mais precisos**: Mensagens informativas sobre a localização exata do arquivo encontrado
- **Tratamento de erros robusto**: Continuação da busca mesmo quando alguns diretórios não são acessíveis

### [OK] Validação
- **Compilação bem-sucedida**: Projeto de teste compilado com sucesso após aplicação manual do código
- **Integração AdMob funcional**: Banner de teste integrado corretamente no MainActivity.java
- **Estrutura de projeto validada**: Funciona com estruturas de pacote complexas

---

## [1.0.7] - 2025-07-25

### 🐛 Correções
- **Corrigido erro de caminho duplicado**: Removida concatenação dupla de `MainActivity.java` na função `findPackageDir`
- **Adicionado tratamento de erros**: Scripts agora verificam a existência de arquivos antes de processá-los
- **Criado arquivo de configuração padrão**: `userConfig.json` com IDs de teste para evitar erros de instalação
- **Melhorados logs informativos**: Mensagens mais claras durante a instalação do plugin

### 📝 Documentação
- **Criado guia completo**: `GUIA-INSTALACAO-CORRETA.md` com procedimentos detalhados
- **Soluções para erros comuns**: Documentação de problemas conhecidos e suas soluções
- **Comandos de emergência**: Instruções para reset completo do projeto

### 🔧 Melhorias
- **Verificações de segurança**: Validação de existência de diretórios e arquivos
- **Logs detalhados**: Informações sobre pacotes encontrados e blocos injetados
- **Configuração robusta**: Valores padrão para todas as variáveis necessárias

### 📋 Erros Resolvidos
1. `ENOENT: no such file or directory, open '...\MainActivity.java\MainActivity.java'`
2. `ENOENT: no such file or directory, open '...\cordova_plugins.js'`
3. `TypeError [ERR_INVALID_ARG_TYPE]: The "code" argument must be of type string`

---

## [1.0.6] - 2025-07-25

### ✨ Funcionalidades
- Plugin inicial para injeção de código AdMob no MainActivity.java
- Suporte para banners (top/bottom) e anúncios intersticiais
- Scripts de pré e pós-instalação
- Blocos de código Java modulares

### 🎯 Características
- Configuração via variáveis CLI
- IDs de teste padrão do Google AdMob
- Injeção automática de código nativo
- Suporte para múltiplos tipos de anúncio

---

## Tipos de Mudanças
- 🐛 **Correções**: Correção de bugs
- ✨ **Funcionalidades**: Novas funcionalidades
- 🔧 **Melhorias**: Melhorias em funcionalidades existentes
- 📝 **Documentação**: Mudanças na documentação
- 🎯 **Características**: Características principais
- 📋 **Erros Resolvidos**: Lista de erros corrigidos