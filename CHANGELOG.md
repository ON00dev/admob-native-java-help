# Changelog

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