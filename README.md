# 📦 admob-native-java-help (v2.0.0)

Cordova plugin for **native AdMob integration** using a **Clean Architecture**.
This plugin enables native AdMob banners and interstitials overlaying the Cordova WebView without modifying your project's `MainActivity.java`.

**🆕 Version 2.0.0** introduces a completely new architecture that replaces risky code injection with a safe, inheritance-based approach using `AdMobLauncher`.

## ✨ Key Features

- **🛡️ Clean Architecture (No Injection)**: Unlike other plugins, this version **does NOT inject code** into your `MainActivity.java`. It creates a safe wrapper Activity (`AdMobLauncher`) that extends `CordovaActivity`.
- **📱 Native Performance**: Banners and Interstitials run in the native layer, not in the WebView.
- **🧠 Smart Page Detection**: Control exactly which pages show banners via configuration.
- **⚙️ Full Configuration**: Customize IDs, positions, and delays directly from the CLI.
- **🔄 Auto-Layout**: Dynamically creates a native Android layout to position the Banner (top/bottom) and WebView without CSS conflicts.

## 🚀 Installation

Install the plugin using the Cordova CLI. You can provide your AdMob IDs and configuration as variables during installation.

```bash
cordova plugin add admob-native-java-help \
  --variable APP_ID="ca-app-pub-YOUR_APP_ID" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-YOUR_BANNER_ID" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-YOUR_INTERSTITIAL_ID" \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_SHOW_ON_PAGES="index.html,home.html"
```

### 🔧 Configuration Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ID` | **Required**. Your AdMob Application ID. | - |
| `BANNER_AD_UNIT_ID` | Your Banner Ad Unit ID. | `""` |
| `INTERSTITIAL_AD_UNIT_ID` | Your Interstitial Ad Unit ID. | `""` |
| `AD_TYPE` | Type of ads to enable: `banner`, `interstitial`, or `banner,interstitial`. | `banner` |
| `AD_POSITION` | Banner position: `top` or `bottom`. | `bottom` |
| `BANNER_SHOW_ON_PAGES` | Comma-separated list of URL fragments where the banner should appear. | `index.html` |
| `BANNER_HIDE_ON_PAGES` | Comma-separated list of URL fragments where the banner should be hidden (higher priority). | `""` |
| `CHECK_URL_INTERVAL` | Interval (ms) to check for page changes. | `1000` |
| `SETUP_DELAY` | Delay (ms) before starting AdMob setup. | `2000` |
| `JS_INTERFACE_DELAY` | Delay (ms) before injecting JS interface. | `3000` |
| `ADMOB_INIT_DELAY` | Delay (ms) before initializing AdMob SDK. | `1000` |

---

## 🛠️ How it Works (Architecture v2)

In previous versions, this plugin injected Java code directly into `MainActivity.java` using Regex. This was fragile and prone to breaking with Cordova updates.

**Version 2.0.0 uses a Hook-based Launcher approach:**

1.  **No `MainActivity` edits**: Your original `MainActivity.java` remains untouched.
2.  **`AdMobLauncher` creation**: Upon installation (`after_prepare`), the plugin automatically generates a file `AdMobLauncher.java` in your app's package.
3.  **Inheritance**: `AdMobLauncher` extends `AdMobCordovaActivity` (provided by the plugin), which contains all the AdMob logic and extends the standard `CordovaActivity`.
4.  **Manifest Update**: The plugin automatically updates `AndroidManifest.xml` to set `AdMobLauncher` as the main entry point (`LAUNCHER`) of your app.

This ensures 100% compatibility with Cordova Android 10+ and Java 11+, and allows for clean uninstallation.

---

## 💻 Usage

### JavaScript Interface

The plugin automatically exposes a helper for Interstitial ads.

#### Show Interstitial Ad

```javascript
// Check if the interface is ready and ad is loaded
if (window.InterstitialAdInterface && window.InterstitialAdInterface.isAdLoaded()) {
    window.InterstitialAdInterface.showAd();
} else {
    console.log("Ad not ready yet");
}
```

#### Listen for Close Event

You can define a global function to be called when the interstitial is closed:

```javascript
window.onInterstitialClosed = function() {
    console.log("Interstitial ad was closed by user");
    // Resume your game or app logic here
};
```

---

## 🧪 Testing

For testing, you can use the official Google Test IDs:

- **App ID**: `ca-app-pub-3940256099942544~3347511713`
- **Banner ID**: `ca-app-pub-3940256099942544/6300978111`
- **Interstitial ID**: `ca-app-pub-3940256099942544/1033173712`

```bash
cordova plugin add admob-native-java-help \
  --variable APP_ID="ca-app-pub-3940256099942544~3347511713" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" \
  --variable AD_TYPE="banner,interstitial"
```

## 📝 License

MIT
