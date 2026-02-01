# 📁 Practical Examples - Folder Structures (v2)

## 🎯 How the Plugin Detects Pages

The AdMob Native Java plugin (v2) uses an intelligent system to detect when to show or hide banners, based on the WebView URL.

Configuration is done entirely via **CLI variables** during installation. It is not necessary to manually edit Java or XML files.

---

## 📋 Real Structure Examples

### 🎮 Example 1: Simple Game

```
www/
├── index.html          # Main Menu
├── game.html           # Game
├── settings.html       # Settings
└── about.html          # About
```

**Configuration**:
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,game.html" \
  --variable BANNER_HIDE_ON_PAGES="settings.html,about.html" \
  ... (other required variables)
```

**Result**:
- ✅ Banner on: `index.html`, `game.html`
- ❌ Banner hidden on: `settings.html`, `about.html`

---

### 🏢 Example 2: Enterprise App

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
│   ├── settings.html
│   └── preferences.html
```

**Smart Configuration**:
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,dashboard/" \
  --variable BANNER_HIDE_ON_PAGES="auth/,profile/" \
  ...
```

**Result**:
- ✅ Banner on: `index.html` and any page inside `dashboard/`
- ❌ Banner hidden on: any page inside `auth/` or `profile/`

---

### 🎯 Example 3: Level-based Game

```
www/
├── index.html
├── menu/
│   ├── main.html
│   ├── options.html
└── game/
    ├── lobby.html
    ├── levels/
    │   ├── easy/
    │   ├── medium/
    │   └── hard/
    └── shop/
        ├── items.html
        └── upgrades.html
```

#### Configuration 1: Banner only in menu and shop
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,menu/,shop/" \
  --variable BANNER_HIDE_ON_PAGES="game/levels/" \
  ...
```

#### Configuration 2: Banner everywhere except game levels
```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="" \
  --variable BANNER_HIDE_ON_PAGES="game/levels/" \
  ...
```
*(Note: If `BANNER_SHOW_ON_PAGES` is empty, the default behavior may vary, but it is generally recommended to be explicit about where to show)*

---

## 💡 Configuration Tips (CLI)

In version v2, all these settings are passed at installation time:

```bash
cordova plugin add admob-native-java-help \
  --variable APP_ID="..." \
  --variable BANNER_SHOW_ON_PAGES="index.html,menu/" \
  --variable BANNER_HIDE_ON_PAGES="login.html" \
  --variable CHECK_URL_INTERVAL="1000"
```

If you need to change these settings after installation:
1. Remove the plugin: `cordova plugin rm admob-native-java-help`
2. Reinstall with the new variables.
