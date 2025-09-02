# 📁 Exemplos Práticos - Estruturas de Pastas

## 🎯 Como o Plugin Detecta Páginas em Diferentes Estruturas

O plugin AdMob Native Java é **muito inteligente** para detectar páginas HTML em qualquer estrutura de pastas. Ele usa o método `contains()` na URL completa, permitindo configurações flexíveis.

---

## 📋 Exemplos Reais de Estruturas

### 🎮 Exemplo 1: Jogo Simples

```
www/
├── index.html          # Menu principal
├── game.html           # Jogo
├── settings.html       # Configurações
└── about.html          # Sobre
```

**Configuração**:
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,game.html" \
  --variable BANNER_HIDE_ON_PAGES="settings.html,about.html"
```

**Resultado**:
- ✅ Banner em: `index.html`, `game.html`
- ❌ Banner oculto em: `settings.html`, `about.html`

---

### 🏢 Exemplo 2: App Empresarial

```
www/
├── index.html
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot.html
├── dashboard/
│   ├── home.html
│   ├── reports.html
│   └── analytics.html
└── profile/
    ├── settings.html
    └── preferences.html
```

**Configuração Inteligente**:
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,dashboard/" \
  --variable BANNER_HIDE_ON_PAGES="auth/,profile/"
```

**Resultado**:
- ✅ Banner em: `index.html`, `dashboard/home.html`, `dashboard/reports.html`, `dashboard/analytics.html`
- ❌ Banner oculto em: `auth/login.html`, `auth/register.html`, `auth/forgot.html`, `profile/settings.html`, `profile/preferences.html`

---

### 🎯 Exemplo 3: Jogo com Níveis

```
www/
├── index.html
├── menu/
│   ├── main.html
│   ├── options.html
│   └── credits.html
├── game/
│   ├── lobby.html
│   ├── levels/
│   │   ├── easy/
│   │   │   ├── level1.html
│   │   │   ├── level2.html
│   │   │   └── level3.html
│   │   ├── medium/
│   │   │   ├── level1.html
│   │   │   ├── level2.html
│   │   │   └── level3.html
│   │   └── hard/
│   │       ├── level1.html
│   │       ├── level2.html
│   │       └── level3.html
│   └── shop/
│       ├── items.html
│       ├── upgrades.html
│       └── skins.html
└── tutorial/
    ├── intro.html
    ├── controls.html
    └── tips.html
```

#### Configuração 1: Banner apenas no menu e loja
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,menu/,game/shop/" \
  --variable BANNER_HIDE_ON_PAGES="game/levels/,tutorial/"
```

**Resultado**:
- ✅ Banner em: `index.html`, `menu/main.html`, `menu/options.html`, `game/shop/items.html`, `game/shop/upgrades.html`
- ❌ Banner oculto em: Todos os níveis (`game/levels/easy/level1.html`, etc.) e tutorial

#### Configuração 2: Banner apenas em níveis fáceis
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,game/levels/easy/" \
  --variable BANNER_HIDE_ON_PAGES="game/levels/medium/,game/levels/hard/"
```

**Resultado**:
- ✅ Banner em: `index.html`, `game/levels/easy/level1.html`, `game/levels/easy/level2.html`, `game/levels/easy/level3.html`
- ❌ Banner oculto em: Níveis médios e difíceis

---

### 🛒 Exemplo 4: E-commerce

```
www/
├── index.html
├── auth/
│   ├── login.html
│   └── register.html
├── catalog/
│   ├── products.html
│   ├── categories/
│   │   ├── electronics.html
│   │   ├── clothing.html
│   │   └── books.html
│   └── search/
│       └── results.html
├── cart/
│   ├── view.html
│   ├── checkout.html
│   └── payment.html
└── account/
    ├── profile.html
    ├── orders.html
    └── wishlist.html
```

**Configuração Estratégica**:
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,catalog/,account/wishlist.html" \
  --variable BANNER_HIDE_ON_PAGES="auth/,cart/checkout.html,cart/payment.html"
```

**Resultado**:
- ✅ Banner em: Página inicial, catálogo completo, lista de desejos
- ❌ Banner oculto em: Login/registro, checkout e pagamento (para não interferir)

---

## 🧠 Inteligência do Plugin

### ✅ O que o Plugin Faz Automaticamente

1. **Monitora URL em Tempo Real**:
   ```javascript
   // Verifica a cada 1000ms (configurável)
   webView.evaluateJavascript("window.location.href", callback);
   ```

2. **Detecta Mudanças de Página**:
   ```java
   if (!url.equals(currentUrl)) {
       currentUrl = url;
       // Verifica se deve mostrar/ocultar banner
   }
   ```

3. **Aplica Regras de Prioridade**:
   ```java
   // 1º: Verifica páginas para OCULTAR (prioridade)
   if (BANNER_HIDE_ON_PAGES.contains(page)) return false;
   
   // 2º: Verifica páginas para EXIBIR
   if (BANNER_SHOW_ON_PAGES.contains(page)) return true;
   ```

### 🎯 Flexibilidade de Configuração

#### Por Nome de Arquivo
```bash
--variable BANNER_SHOW_ON_PAGES="index.html,game.html,menu.html"
```
- Detecta qualquer arquivo com esses nomes, independente da pasta

#### Por Pasta
```bash
--variable BANNER_SHOW_ON_PAGES="game/,menu/,shop/"
```
- Detecta TODAS as páginas dentro dessas pastas

#### Por Caminho Específico
```bash
--variable BANNER_SHOW_ON_PAGES="game/levels/easy/,menu/main.html"
```
- Detecta apenas níveis fáceis + página principal do menu

#### Combinação Avançada
```bash
--variable BANNER_SHOW_ON_PAGES="index.html,game/" \
--variable BANNER_HIDE_ON_PAGES="game/boss/,game/cutscenes/"
```
- Exibe em: Página inicial + todo o jogo
- Exceto: Batalhas de chefe e cutscenes

---

## 🔧 Configurações Avançadas

### Timing Personalizado
```bash
# Verifica URL mais frequentemente (500ms)
--variable CHECK_URL_INTERVAL="500"

# Delay menor para setup (500ms)
--variable SETUP_DELAY="500"

# Interface JavaScript mais rápida (1000ms)
--variable JS_INTERFACE_DELAY="1000"
```

### Debug e Logs
```bash
# Visualizar detecção em tempo real
adb logcat | grep "MainActivity.*URL"
adb logcat | grep "Banner"
```

**Exemplo de Log**:
```
D/MainActivity: URL atual: file:///android_asset/www/game/levels/easy/level1.html
D/MainActivity: Banner permitido para página: game/levels/easy/
D/MainActivity: Exibindo banner AdMob
```

---

## 💡 Dicas Profissionais

### 1. Estrutura Recomendada
```
www/
├── index.html          # Sempre com banner
├── ads/                # Páginas com anúncios
│   ├── *.html
├── game/               # Jogo principal
│   ├── *.html
└── noads/              # Páginas sem anúncios
    ├── *.html
```

**Configuração**:
```bash
--variable BANNER_SHOW_ON_PAGES="index.html,ads/,game/" \
--variable BANNER_HIDE_ON_PAGES="noads/"
```

### 2. Teste Incremental
```bash
# Comece simples
--variable BANNER_SHOW_ON_PAGES="index.html"

# Adicione gradualmente
--variable BANNER_SHOW_ON_PAGES="index.html,game.html"

# Expanda para pastas
--variable BANNER_SHOW_ON_PAGES="index.html,game/"
```

### 3. Evite Conflitos
```bash
# ❌ RUIM: Conflito entre show e hide
--variable BANNER_SHOW_ON_PAGES="game/" \
--variable BANNER_HIDE_ON_PAGES="game/level1.html"

# ✅ BOM: Específico e claro
--variable BANNER_SHOW_ON_PAGES="game/menu/,game/shop/" \
--variable BANNER_HIDE_ON_PAGES="game/levels/"
```

---

## 🎯 Conclusão

O plugin é **extremamente inteligente** e flexível:

- ✅ **Funciona com qualquer estrutura** de pastas
- ✅ **Detecta em tempo real** mudanças de página
- ✅ **Configuração granular** por arquivo ou pasta
- ✅ **Sistema de prioridades** (hide > show)
- ✅ **Logs detalhados** para debug
- ✅ **Performance otimizada** com intervalos configuráveis

Você pode organizar suas páginas HTML da forma que quiser - o plugin se adapta perfeitamente! 🚀