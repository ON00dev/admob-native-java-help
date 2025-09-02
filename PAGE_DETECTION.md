# Detecção de Páginas HTML - AdMob Native Java Plugin

## Como o Plugin Identifica Páginas

O plugin utiliza um sistema de **verificação de URL** que monitora continuamente a URL atual da WebView para determinar se deve exibir ou ocultar anúncios.

### 🔍 Mecanismo de Detecção

#### 1. Verificação Contínua
```java
// Verifica a URL a cada intervalo configurado (padrão: 1000ms)
String currentUrl = webView.getUrl();
if (currentUrl != null && shouldShowBannerOnPage(currentUrl)) {
    setupAdMobBanner();
}
```

#### 2. Método de Comparação
```java
// Usa contains() para verificar se a URL contém o nome da página
if (currentUrl.contains(showPage.trim())) {
    return true; // Exibe banner
}
```

## 📁 Suporte a Estruturas de Pastas

### ✅ Funciona Perfeitamente

#### Estrutura Simples
```
www/
├── index.html
├── game.html
└── menu.html
```
**Configuração**: `index.html,game.html,menu.html`

#### Estrutura com Subpastas
```
www/
├── index.html
├── pages/
│   ├── game.html
│   └── settings.html
└── levels/
    ├── level1.html
    └── level2.html
```

**Configurações Possíveis**:

1. **Por nome de arquivo**:
   ```
   BANNER_SHOW_ON_PAGES: "index.html,game.html,level1.html"
   ```
   - ✅ Detecta: `file:///android_asset/www/index.html`
   - ✅ Detecta: `file:///android_asset/www/pages/game.html`
   - ✅ Detecta: `file:///android_asset/www/levels/level1.html`

2. **Por caminho parcial**:
   ```
   BANNER_SHOW_ON_PAGES: "pages/,levels/level1"
   ```
   - ✅ Detecta: `file:///android_asset/www/pages/game.html`
   - ✅ Detecta: `file:///android_asset/www/pages/settings.html`
   - ✅ Detecta: `file:///android_asset/www/levels/level1.html`
   - ❌ Não detecta: `file:///android_asset/www/levels/level2.html`

3. **Por pasta completa**:
   ```
   BANNER_SHOW_ON_PAGES: "pages/,levels/"
   ```
   - ✅ Detecta todas as páginas dentro de `pages/`
   - ✅ Detecta todas as páginas dentro de `levels/`

### 🎯 Exemplos Práticos

#### Estrutura Complexa
```
www/
├── index.html
├── auth/
│   ├── login.html
│   └── register.html
├── game/
│   ├── main.html
│   ├── levels/
│   │   ├── easy.html
│   │   └── hard.html
│   └── shop/
│       └── items.html
└── settings/
    └── preferences.html
```

#### Configurações Inteligentes

**1. Exibir apenas no jogo**:
```
BANNER_SHOW_ON_PAGES: "game/"
```
- ✅ Exibe em: `game/main.html`, `game/levels/easy.html`, `game/shop/items.html`
- ❌ Não exibe em: `index.html`, `auth/login.html`, `settings/preferences.html`

**2. Exibir em páginas específicas**:
```
BANNER_SHOW_ON_PAGES: "index.html,game/main.html,game/levels/"
```
- ✅ Exibe em: `index.html`, `game/main.html`, `game/levels/easy.html`, `game/levels/hard.html`
- ❌ Não exibe em: `auth/login.html`, `game/shop/items.html`

**3. Excluir páginas específicas**:
```
BANNER_SHOW_ON_PAGES: "game/"
# Mas se quiséssemos excluir a loja (versão antiga do plugin):
# BANNER_HIDE_ON_PAGES: "shop/"
```

## 🧠 Inteligência do Plugin

### ✅ Capacidades

1. **Detecção em Tempo Real**: Monitora mudanças de URL continuamente
2. **Suporte a Subpastas**: Funciona com qualquer estrutura de pastas
3. **Correspondência Flexível**: Usa `contains()` para máxima flexibilidade
4. **Configuração Granular**: Permite especificar arquivos ou pastas inteiras
5. **Logs Detalhados**: Registra todas as verificações para debug

### ⚠️ Limitações

1. **Correspondência por Substring**: 
   - `game.html` também detecta `minigame.html`
   - Solução: Use caminhos mais específicos como `pages/game.html`

2. **Não Suporta Regex**: 
   - Não é possível usar padrões como `level*.html`
   - Solução: Liste cada página ou use o caminho da pasta

3. **Case Sensitive**: 
   - `Game.html` ≠ `game.html`
   - Solução: Mantenha consistência nos nomes

4. **URLs Dinâmicas**: 
   - Não funciona com SPAs que usam hash routing (`#/page`)
   - Solução: Use URLs reais ou configure manualmente

## 📋 Melhores Práticas

### 1. Estrutura Organizada
```
www/
├── index.html          # Página inicial
├── game/               # Pasta do jogo (com anúncios)
│   ├── *.html
├── menu/               # Menus (com anúncios)
│   ├── *.html
└── auth/               # Autenticação (sem anúncios)
    ├── *.html
```

**Configuração**:
```
BANNER_SHOW_ON_PAGES: "index.html,game/,menu/"
```

### 2. Nomenclatura Consistente
- Use sempre minúsculas
- Evite caracteres especiais
- Seja específico quando necessário

### 3. Teste e Debug
```bash
# Visualizar logs de detecção
adb logcat | grep "MainActivity.*URL"
```

### 4. Configuração Progressiva
```
# Comece simples
BANNER_SHOW_ON_PAGES: "index.html"

# Expanda gradualmente
BANNER_SHOW_ON_PAGES: "index.html,game.html"

# Use pastas para grupos
BANNER_SHOW_ON_PAGES: "index.html,game/"
```

## 🔧 Exemplos de URLs Detectadas

```
# URL completa no Android:
file:///android_asset/www/index.html
file:///android_asset/www/pages/game.html
file:///android_asset/www/levels/easy/stage1.html

# O plugin verifica se a URL contém:
"index.html"     ✅ Detecta a primeira
"pages/"         ✅ Detecta a segunda
"levels/easy/"   ✅ Detecta a terceira
"game.html"      ✅ Detecta a segunda
"stage1"         ✅ Detecta a terceira
```

## 💡 Conclusão

O plugin é **bastante inteligente** para detectar páginas em diferentes estruturas de pastas, usando um sistema flexível baseado em substring matching. Ele funciona bem com:

- ✅ Estruturas simples e complexas
- ✅ Subpastas aninhadas
- ✅ Configuração por arquivo ou pasta
- ✅ Monitoramento em tempo real

A chave é entender que ele usa `contains()` na URL completa, permitindo configurações muito flexíveis para qualquer estrutura de projeto.