# Installation Guide - AdMob Native Java Plugin (v2.0.0)

## Prerequisites

- Cordova project configured
- Android SDK installed
- AdMob account active with ad unit IDs

## Installation Process

Version 2.0.0 drastically simplified the installation process. All configurations are passed via CLI variables, and there is no longer any need to manually edit files.

### 1. Plugin Installation

Run the command below in your Cordova project directory, replacing the values with your actual IDs:

```bash
cordova plugin add admob-native-java-help \
  --variable APP_ID="ca-app-pub-YOUR_APP_ID" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-YOUR_BANNER_ID" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-YOUR_INTERSTITIAL_ID" \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_SHOW_ON_PAGES="index.html,game.html"
```

### 2. Available Configuration Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_ID` | **Required**. Your AdMob Application ID. | - |
| `BANNER_AD_UNIT_ID` | Banner Ad Unit ID. | `""` |
| `INTERSTITIAL_AD_UNIT_ID` | Interstitial Ad Unit ID. | `""` |
| `AD_TYPE` | Active ad types: `banner`, `interstitial` or `banner,interstitial`. | `banner` |
| `AD_POSITION` | Banner position: `top` or `bottom`. | `bottom` |
| `BANNER_SHOW_ON_PAGES` | List of pages (comma separated) where the banner should appear. | `index.html` |
| `BANNER_HIDE_ON_PAGES` | List of pages where the banner should be hidden (high priority). | `""` |
| `CHECK_URL_INTERVAL` | Interval (ms) to check for page changes. | `1000` |
| `SETUP_DELAY` | Delay (ms) before starting AdMob setup. | `2000` |
| `JS_INTERFACE_DELAY` | Delay (ms) before injecting the JS interface. | `3000` |
| `ADMOB_INIT_DELAY` | Delay (ms) before initializing the AdMob SDK. | `1000` |

### 3. What happens during installation?

Unlike previous versions, this plugin **DOES NOT modify** your `MainActivity.java`.

1.  The plugin creates an `AdMobLauncher.java` file in your application's package.
2.  This file extends the plugin's class (`AdMobCordovaActivity`) which contains all the necessary logic.
3.  `AndroidManifest.xml` is automatically updated to use `AdMobLauncher` as the app's main activity.

This ensures a clean, safe installation that is easy to remove if necessary.

### 4. JavaScript Usage

#### For Interstitial Ads

The plugin automatically injects a global object `window.InterstitialAdInterface` (or `window.AdMobNativeHelp` depending on the version, but the native interface uses `InterstitialAdInterface`).

```javascript
// Check if interface exists and ad is loaded
if (window.InterstitialAdInterface && window.InterstitialAdInterface.isAdLoaded()) {
    window.InterstitialAdInterface.showAd();
} else {
    console.log('Ad not loaded yet or interface unavailable');
}

// Listen for close event (optional)
window.onInterstitialClosed = function() {
    console.log('Ad closed by user');
    // Resume game or app
};
```

#### For Banners

Banners are fully automatic. They appear or disappear based on the current WebView URL and the `BANNER_SHOW_ON_PAGES` and `BANNER_HIDE_ON_PAGES` settings.

### 5. Build and Test

```bash
# Build for Android
cordova build android

# Run on device
cordova run android
```

### 6. Installation Verification

After installing, you can verify if everything went well by checking if the `AdMobLauncher.java` file was created in:
`platforms/android/app/src/main/java/your/app/package/AdMobLauncher.java`

And if `AndroidManifest.xml` points to it:
```xml
<activity android:name=".AdMobLauncher" ...>
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

### 7. AdMob Test IDs

For development, use these official Google IDs:

- **App ID**: `ca-app-pub-3940256099942544~3347511713`
- **Banner**: `ca-app-pub-3940256099942544/6300978111`
- **Interstitial**: `ca-app-pub-3940256099942544/1033173712`
