# 📦 admob-native-java-help

Cordova plugin to dynamically inject **native AdMob blocks** into `MainActivity.java`, enabling banners and interstitials to overlay the Cordova WebView — with flexibility, without overwriting entire files, and respecting user choices.

---

## ⚠️ Mandatory Requirements

This plugin **does not include** the AdMob SDK directly. You must also install the [`admob-plus-cordova`](https://admob-plus.github.io) plugin:

```bash
cordova plugin add admob-plus-cordova --variable APP_ID_ANDROID="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"
```
🧪 Use Google AdMob test IDs during development.

## 🚀 Plugin Installation

### Basic Configuration
Clone or download this repository and install locally:

```bash
cordova plugin add admob-native-java-help@latest
```

### ⚙️ Configuration Variables

| Variable | Required | Description |
| --- | --- | --- |
| AD_TYPE | ✅ | Ad type: `banner`, `interstitial` or `banner,interstitial` |
| AD_POSITION | ❌ | Banner position: `top` or `bottom` (default: `bottom`) |
| BANNER_AD_UNIT_ID | ✅ (if using banner) | AdMob banner ID |
| INTERSTITIAL_AD_UNIT_ID | ✅ (if using interstitial) | AdMob interstitial ID |
| APP_ID | ✅ | App ID provided by AdMob |

### 📋 Installation Examples

**1. Banner Only (bottom position):**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

**2. Banner Only (top position):**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

**3. Interstitial Only:**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="interstitial" --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

**4. Banner + Interstitial (complete configuration):**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner,interstitial" --variable AD_POSITION="bottom" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

**5. Using your own production IDs:**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner,interstitial" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY" --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ" --variable APP_ID="ca-app-pub-XXXXXXXXXXXXXXXX~WWWWWWWWWW"
```


## 📄 Usage Examples in Cordova WebView

### 🎯 Interstitial Ads
To display interstitial ads via JavaScript:

```js
// Check if the ad is loaded
if (window.AndroidInterstitial && window.AndroidInterstitial.isAdLoaded()) {
  console.log('Interstitial ad ready for display');
  
  // Show the ad
  window.AndroidInterstitial.showAd();
} else {
  console.log('Interstitial ad not yet loaded');
}

// Register callback when the ad is closed
if (window.AndroidInterstitial) {
  window.AndroidInterstitial.setOnAdClosedCallback(function () {
    console.log('Interstitial ad closed!');
    // Here you can reload the ad or perform other actions
  });
}
```

### 🏷️ Native Banners
Banners are displayed automatically when configured:

```js
// Banners appear automatically at the configured position
// (top or bottom) without needing additional JavaScript code

// Example of checking if the banner is active
if (typeof window.AndroidInterstitial !== 'undefined') {
  console.log('Native AdMob plugin is active');
  console.log('Banner will be displayed automatically');
}
```

### 🔄 Complete Integration Example
```js
document.addEventListener('deviceready', function() {
  console.log('Cordova ready - Initializing native AdMob');
  
  // Check if the plugin is available
  if (window.AndroidInterstitial) {
    console.log('Native AdMob plugin loaded successfully');
    
    // Set callback for when the ad is closed
    window.AndroidInterstitial.setOnAdClosedCallback(function() {
      console.log('User closed the interstitial ad');
      // Optional: reload the ad for the next display
    });
    
    // Example: show ad after 5 seconds
    setTimeout(function() {
      if (window.AndroidInterstitial.isAdLoaded()) {
        window.AndroidInterstitial.showAd();
      }
    }, 5000);
  } else {
    console.log('Native AdMob plugin not found');
  }
}, false);
```

## 🎛️ Settings and Behaviors

### 📍 Banner Positions
- **`AD_POSITION="top"`**: Fixed banner at the top of the screen, above the WebView
- **`AD_POSITION="bottom"`** (default): Fixed banner at the bottom, below the WebView
- **No banner**: When `AD_TYPE` doesn't include "banner"

### 🎯 Ad Types
- **`AD_TYPE="banner"`**: Only persistent banner at the chosen position
- **`AD_TYPE="interstitial"`**: Only interstitial ads (full screen)
- **`AD_TYPE="banner,interstitial"`**: Both types available

### ⚡ Automatic Behavior
- **Banners**: Load and display automatically when starting the app
- **Interstitials**: Load automatically, but need to be displayed via JavaScript
- **Native overlay**: Ads appear over the WebView without affecting the layout

## 📐 How the Plugin Works

1. Automatically locates your MainActivity.java;

2. Injects only the necessary blocks (banner_top, banner_bottom, interstitial, js_interface);

3. Dynamically replaces placeholders {{BANNER_ID}}, {{INTERSTITIAL_ID}};

4. Ensures WebView compatibility without overlapping existing content;

5. Allows reapplication without duplications via // ADMOB_NATIVE_PLUGIN marker.

## 🛠️ Useful Commands
```bash
cordova clean android
cordova build android
cordova run android
```

## 🧪 Test IDs (Google AdMob)

| Type | Test ID |
| --- | --- |
| App ID | ca-app-pub-3940256099942544~3347511713 |
| Banner | ca-app-pub-3940256099942544/6300978111 |
| Interstitial | ca-app-pub-3940256099942544/1033173712 |

## 🔧 Troubleshooting

### Problem: Variables not being saved correctly
If you see `undefined` values in the installation log:

1. **Remove the plugin completely:**
```bash
cordova plugin remove admob-native-java-help
```

2. **Clean the project:**
```bash
cordova clean android
```

3. **Reinstall with explicit variables:**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

### Problem: Banner not appearing
If the banner doesn't show up:

1. **Check the MainActivity.java file** at `platforms/android/app/src/main/java/com/yourpackage/MainActivity.java`
2. **Look for the comment `// ADMOB_NATIVE_PLUGIN`** - this indicates the code was injected
3. **Verify the Application ID** in `platforms/android/app/src/main/AndroidManifest.xml`
4. **Rebuild the project:**
```bash
cordova build android
cordova run android
```

### Problem: Compatibility with admob-plus-cordova
If you have both plugins installed:

- The plugin automatically detects `admob-plus-cordova`
- It skips AndroidManifest.xml modifications to avoid conflicts
- Both plugins work together: `admob-plus-cordova` handles the SDK, `admob-native-java-help` adds native overlay
- Make sure the Application ID is configured in one of the plugins

### Problem: App crashes on startup
If the app crashes:

1. **Check if the Application ID is in AndroidManifest.xml:**
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3940256099942544~3347511713" />
```

2. **Verify AdMob imports in MainActivity.java:**
```java
import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdSize;
import com.google.android.gms.ads.AdView;
```

3. **Check the build.gradle dependencies:**
```gradle
implementation 'com.google.android.gms:play-services-ads:22.6.0'
```

## ⚠️ Important Notes

### 🔧 MainActivity Modifications
Changes are made to the MainActivity.java generated by Cordova (in `platforms\android\app\src\main\java\com\your_package\app_name\MainActivity.java`). If you remove the Android platform, the injections will be lost.

### 🔄 Manual Preparation
If you modify the MainActivity manually, before compiling the APK you need to run:
```bash
cordova prepare android
```

### ✅ Best Practices
- **Always use test IDs** before publishing your app
- **Compatible with admob-plus-cordova** - no need to duplicate the SDK
- **Doesn't overwrite the entire MainActivity** - safe for existing projects
- **Native overlay** - ads don't interfere with WebView layout

## 📁 Plugin Structure

```bash
admob-native-java-help/
├── plugin.xml              # Cordova plugin configuration
├── package.json            # Dependencies and metadata
├── scripts/                # Installation scripts
│   ├── pre_install.js      # Runs before installation
│   └── after_install.js    # Injects code into MainActivity
├── src/android/            # Android source code
│   ├── utils.js            # Utilities for injection
│   └── blocks/             # Java code blocks
│       ├── banner_bottom.java.block    # Bottom banner
│       ├── banner_top.java.block       # Top banner
│       ├── interstitial.java.block     # Interstitial ads
│       └── js_interface.java.block     # JavaScript interface
└── README.md               # Documentation
```

## 👨‍💻 Author
Developed by **ON00dev**  
Contributions, improvements and forks are welcome!

## 📄 License
[MIT](https://github.com/ON00dev/admob-native-java-help/blob/main/LICENSE) © 2024 — You are free to modify, reuse and share.
