# HTML Page Detection - AdMob Native Java Plugin (v2)

## How the Plugin Identifies Pages

The plugin uses a **URL verification** system that continuously monitors the current WebView URL to determine whether to show or hide ads. This is done natively in Java, without affecting the JavaScript performance of your application.

### 🔍 Detection Mechanism

1.  **Monitoring**: A `Handler` checks the WebView URL every `CHECK_URL_INTERVAL` milliseconds (default: 1000ms).
2.  **Comparison**: The current URL is compared with the strings provided in `BANNER_SHOW_ON_PAGES` and `BANNER_HIDE_ON_PAGES`.
3.  **Action**: If there is a positive match (show) and no negative match (hide), the banner is displayed. Otherwise, it is hidden.

The method uses `String.contains()`, which allows detecting both specific files and entire folders.

## 📁 Folder Structure Support

### ✅ Works Perfectly

#### Simple Structure
```
www/
├── index.html
├── game.html
└── menu.html
```
**CLI Configuration**: `--variable BANNER_SHOW_ON_PAGES="index.html,game.html,menu.html"`

#### Structure with Subfolders
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

**Possible Configurations**:

1. **By filename**:
   `--variable BANNER_SHOW_ON_PAGES="index.html,game.html,level1.html"`
   - ✅ Detects: `file:///android_asset/www/index.html`
   - ✅ Detects: `file:///android_asset/www/pages/game.html`
   - ✅ Detects: `file:///android_asset/www/levels/level1.html`

2. **By partial path**:
   `--variable BANNER_SHOW_ON_PAGES="pages/,levels/level1"`
   - ✅ Detects: `file:///android_asset/www/pages/game.html`
   - ✅ Detects: `file:///android_asset/www/pages/settings.html`
   - ✅ Detects: `file:///android_asset/www/levels/level1.html`
   - ❌ Does not detect: `file:///android_asset/www/levels/level2.html`

3. **By complete folder**:
   `--variable BANNER_SHOW_ON_PAGES="pages/,levels/"`
   - ✅ Detects all pages inside `pages/`
   - ✅ Detects all pages inside `levels/`

### 🎯 Rule Priority

The **HIDE** rule (`BANNER_HIDE_ON_PAGES`) always has priority over the **SHOW** rule (`BANNER_SHOW_ON_PAGES`).

Example:
- Show: `levels/`
- Hide: `levels/bonus.html`

Result: The banner will appear in all levels, **except** in the bonus level.

## ⚙️ CLI Configuration

In version v2, you define these rules when installing the plugin:

```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_SHOW_ON_PAGES="index.html,home.html" \
  --variable BANNER_HIDE_ON_PAGES="login.html" \
  --variable CHECK_URL_INTERVAL="1000"
```

| Variable | Description |
|----------|-------------|
| `BANNER_SHOW_ON_PAGES` | Pages where the banner MUST appear. |
| `BANNER_HIDE_ON_PAGES` | Pages where the banner MUST NOT appear. |
| `CHECK_URL_INTERVAL` | Verification frequency in milliseconds. |

If no page is specified in `BANNER_SHOW_ON_PAGES`, the default behavior depends on the internal implementation (usually does not show anything or shows everywhere, it is recommended to always configure). The plugin default is `index.html`.
