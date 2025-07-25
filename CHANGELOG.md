# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.13] - 2024-12-19
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

## [1.0.12] - 2024-12-19

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

## [1.0.11] - 2024-12-19

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

## [1.0.10] - 2024-12-19

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

## [1.0.9] - 2024-12-19

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

## [1.0.8] - 2024-12-19

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

## [1.0.7] - 2024-12-19

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

## [1.0.6] - 2024-12-19

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