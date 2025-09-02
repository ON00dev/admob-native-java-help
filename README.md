# 📦 admob-native-java-help

Cordova plugin to dynamically inject **native AdMob blocks** into `MainActivity.java`, enabling banners and interstitials to overlay the Cordova WebView — with advanced page control, flexible configuration, and complete JavaScript integration.

**🆕 Version 1.2.2** includes comprehensive documentation for page detection and folder structures, with practical examples and best practices for any project architecture.

## 📚 Documentation

- **[📋 Installation Guide](INSTALLATION_GUIDE.md)** - Complete installation and configuration guide
- **[🧠 Page Detection](PAGE_DETECTION.md)** - Technical documentation on how the plugin detects HTML pages
- **[📁 Folder Examples](FOLDER_EXAMPLES.md)** - Practical examples with different folder structures
- **[📝 Changelog](CHANGELOG.md)** - Version history and changes

## ✨ Key Features

### 🧠 Smart Page Detection
- **Real-time URL monitoring** with configurable intervals
- **Flexible folder structure support** - works with any project organization
- **Granular control** - specify individual files or entire folders
- **Priority system** - hide pages take precedence over show pages

### 🎯 Advanced Configuration
- **Multiple ad types** - banner, interstitial, or both
- **Flexible positioning** - top or bottom banner placement
- **Timing control** - configurable delays for optimal performance
- **Page-specific banners** - show/hide based on current page

### 🔧 Developer Experience
- **Complete examples** - ready-to-use HTML and JavaScript files
- **Comprehensive documentation** - detailed guides for any scenario
- **Debug support** - detailed logging for troubleshooting
- **Modular architecture** - clean, maintainable code structure

### 📱 Production Ready
- **Google AdMob test IDs** included for development
- **Easy migration** to production IDs
- **Error handling** - robust error recovery
- **Performance optimized** - minimal impact on app performance

## 🚀 Quick Production Guide

### Simple Installation
```bash
# 1. Add Android platform
cordova platform add android

# 2. Install plugin with your configuration
cordova plugin add admob-native-java-help \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" \
  --variable APP_ID="ca-app-pub-3940256099942544~3347511713" \
  --variable BANNER_SHOW_ON_PAGES="index.html,home.html"

# 3. Build and test
cordova build android
cordova run android
```

### JavaScript Usage
```javascript
// Show interstitial ad
if (window.InterstitialAdInterface && window.InterstitialAdInterface.isAdLoaded()) {
    window.InterstitialAdInterface.showAd();
}

// Callback when closed
function onInterstitialClosed() {
    console.log('Ad closed by user');
}
```

### 🎯 Smart Page Detection

The plugin automatically detects which pages should display banners:

```bash
# Show banners only on specific pages
--variable BANNER_SHOW_ON_PAGES="index.html,game.html,menu.html"

# Hide banners on specific pages
--variable BANNER_HIDE_ON_PAGES="login.html,settings.html"

# Works with any folder structure
--variable BANNER_SHOW_ON_PAGES="index.html,game/,levels/easy/"
```

**📁 See [Folder Examples](FOLDER_EXAMPLES.md) for advanced configurations with complex project structures.**

---

## 📋 Recent Updates

### Version 1.2.2 - Latest
- ✅ **COMPREHENSIVE DOCUMENTATION**: Complete documentation for page detection and folder structures
  - `PAGE_DETECTION.md`: Technical documentation explaining how the plugin detects HTML pages
  - `FOLDER_EXAMPLES.md`: Practical examples with different folder structures and configurations
  - Real-world scenarios for games, enterprise apps, and e-commerce
  - Best practices for folder organization and configuration
  - Debug tips and troubleshooting guides

### Version 1.2.1
- ✅ **OPTIMIZED INITIALIZATION**: Implementation of AdMob initialization with configurable delay
  - New `ADMOB_INIT_DELAY` preference to control initialization delay
  - New `setup_admob_with_delay.java.block` for delayed initialization
  - Dedicated `admob_init.java.block` for AdMob initialization
- ✅ **BUG FIXES**:
  - Fixed syntax errors in MainActivity.java injections
  - Moved AdMob variable declarations inside MainActivity class
  - Removed duplicate variable declarations
  - Added necessary imports for AdMob classes
  - Fixed class structure by adding missing closing brace
  - Added @NonNull annotations for better SDK compatibility
- ✅ **IMPROVEMENTS**:
  - Implemented complete methods for AdMob functionality
  - Improved error handling and exception management
  - Optimized JavaScript interface for interstitial ads
  - Updated documentation and examples

### Version 1.2.0
- ✅ Introduced smart page detection
- ✅ Added configurable preferences
- ✅ Implemented modular architecture for enhanced ad display control

**📝 See [Complete Changelog](CHANGELOG.md) for detailed version history.**

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

#### Core Variables
| Variable | Required | Description |
| --- | --- | --- |
| AD_TYPE | ✅ | Ad type: `banner`, `interstitial` or `banner,interstitial` |
| AD_POSITION | ❌ | Banner position: `top` or `bottom` (default: `bottom`) |
| BANNER_AD_UNIT_ID | ✅ (if using banner) | AdMob banner ID |
| INTERSTITIAL_AD_UNIT_ID | ✅ (if using interstitial) | AdMob interstitial ID |
| APP_ID | ✅ | App ID provided by AdMob |

#### 🆕 Advanced Page Control (v1.2.0+)
| Variable | Default | Description |
| --- | --- | --- |
| BANNER_SHOW_ON_PAGES | `index.html` | Pages where banners should appear (comma-separated) |
| BANNER_HIDE_ON_PAGES | `` (empty) | Pages where banners should be hidden (comma-separated) |
| CHECK_URL_INTERVAL | `1000` | URL checking interval in milliseconds |
| SETUP_DELAY | `2000` | Initial setup delay in milliseconds |
| JS_INTERFACE_DELAY | `3000` | JavaScript interface setup delay in milliseconds |
| ADMOB_INIT_DELAY | `1000` | AdMob SDK initialization delay in milliseconds (v1.2.1+) |

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

**5. 🆕 Advanced Page Control (v1.2.1):**
```bash
cordova plugin add admob-native-java-help \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom" \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" \
  --variable APP_ID="ca-app-pub-3940256099942544~3347511713" \
  --variable BANNER_SHOW_ON_PAGES="index.html,home.html,products.html" \
  --variable BANNER_HIDE_ON_PAGES="login.html,register.html" \
  --variable CHECK_URL_INTERVAL="500" \
  --variable SETUP_DELAY="1500" \
  --variable JS_INTERFACE_DELAY="2500" \
  --variable ADMOB_INIT_DELAY="2000"
```

**6. Using your own production IDs:**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner,interstitial" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY" --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ" --variable APP_ID="ca-app-pub-XXXXXXXXXXXXXXXX~WWWWWWWWWW"
```


## 📄 Usage Examples in Cordova WebView

### 🎯 Interstitial Ads (Enhanced v1.2.0)
To display interstitial ads via the improved JavaScript interface:

```js
// 🆕 New interface (v1.2.0) - Recommended
if (window.InterstitialAdInterface) {
  // Check if the ad is loaded
  if (window.InterstitialAdInterface.isAdLoaded()) {
    console.log('Interstitial ad ready for display');
    
    // Show the ad
    window.InterstitialAdInterface.showAd();
  } else {
    console.log('Interstitial ad not yet loaded');
  }
  
  // Register callback when the ad is closed
  window.InterstitialAdInterface.setOnAdClosedCallback('onInterstitialClosed');
}

// Callback function
function onInterstitialClosed() {
  console.log('Interstitial ad closed!');
  // Ad will be automatically reloaded
}

// Legacy interface (still supported)
if (window.AndroidInterstitial && window.AndroidInterstitial.isAdLoaded()) {
  window.AndroidInterstitial.showAd();
}
```

### 🏷️ Smart Banner Control (New v1.2.0)
Banners now support intelligent page detection:

```js
// Banners appear automatically based on page configuration
// Configure during installation:
// --variable BANNER_SHOW_ON_PAGES="index.html,home.html,products.html"
// --variable BANNER_HIDE_ON_PAGES="login.html,register.html,splash.html"

// The plugin automatically monitors the current URL and shows/hides banners
console.log('Current page:', window.location.href);

// Example: Check if banner should be visible on current page
if (typeof window.InterstitialAdInterface !== 'undefined') {
  console.log('Native AdMob plugin is active');
  console.log('Banner visibility controlled by page configuration');
}
```

### 🔄 Complete Integration Example (v1.2.0)
```js
document.addEventListener('deviceready', function() {
  console.log('Cordova ready - Initializing native AdMob v1.2.0');
  
  // Wait for the enhanced interface to be available
  const checkInterface = setInterval(() => {
    if (window.InterstitialAdInterface) {
      console.log('Enhanced AdMob interface loaded successfully');
      clearInterval(checkInterface);
      
      // Set callback for when the ad is closed
      window.InterstitialAdInterface.setOnAdClosedCallback('onAdClosed');
      
      // Example: show ad after user interaction
      document.getElementById('showAdBtn').addEventListener('click', () => {
        if (window.InterstitialAdInterface.isAdLoaded()) {
          window.InterstitialAdInterface.showAd();
        } else {
          console.log('Ad not ready yet, please wait...');
        }
      });
    }
  }, 500);
  
  // Stop checking after 30 seconds
  setTimeout(() => clearInterval(checkInterface), 30000);
}, false);

// Enhanced callback function
function onAdClosed() {
  console.log('User closed the interstitial ad');
  // Dispatch custom event for better integration
  document.dispatchEvent(new CustomEvent('admobAdClosed', {
    detail: { type: 'interstitial', timestamp: Date.now() }
  }));
}

// Listen to custom events
document.addEventListener('admobAdClosed', (event) => {
  console.log('AdMob event received:', event.detail);
  // Perform actions after ad is closed
});
```

### 📱 Using the Example Files
The plugin now includes complete example files in the `example/` directory:

```html
<!-- Include the example JavaScript library -->
<script src="path/to/admob-example.js"></script>

<!-- Simple usage -->
<button onclick="showAdMobInterstitial()">Show Ad</button>
<button onclick="checkAdMobStatus()">Check Status</button>

<script>
// Using the AdMobManager class
const manager = new AdMobManager();
manager.showInterstitial(
  () => console.log('Ad shown successfully'),
  (error) => console.error('Error:', error)
);
</script>
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

### 🆕 Smart Page Control (v1.2.0)
- **`BANNER_SHOW_ON_PAGES`**: Comma-separated list of pages where banners should appear
  - Example: `"index.html,home.html,products.html"`
  - Default: `"index.html"`
- **`BANNER_HIDE_ON_PAGES`**: Comma-separated list of pages where banners should be hidden
  - Example: `"login.html,register.html,splash.html"`
  - Takes priority over `BANNER_SHOW_ON_PAGES`
  - Default: empty (no pages hidden)
- **URL Monitoring**: Automatic detection of current page with configurable intervals

### ⚡ Automatic Behavior
- **Banners**: Load and display automatically based on page configuration
- **Page Detection**: Monitors URL changes every `CHECK_URL_INTERVAL` milliseconds
- **Interstitials**: Load automatically, displayed via enhanced JavaScript interface
- **Native overlay**: Ads appear over the WebView without affecting the layout
- **Smart Timing**: Configurable delays for setup and JavaScript interface initialization

### 🔧 Timing Configuration
- **`CHECK_URL_INTERVAL`** (default: 1000ms): How often to check the current URL
- **`SETUP_DELAY`** (default: 2000ms): Initial delay before setting up ads
- **`JS_INTERFACE_DELAY`** (default: 3000ms): Delay before JavaScript interface becomes available

## 📐 How the Plugin Works

### 🏗️ Modular Architecture (v1.2.0)
The plugin now uses a modular approach with separate Java blocks:

1. **`variables.java.block`**: Centralizes all configuration variables and IDs
2. **`check_pages.java.block`**: Monitors URL changes and controls banner visibility
3. **`setup_banner.java.block`**: Handles banner creation and positioning
4. **`setup_js_interface.java.block`**: Configures the enhanced JavaScript interface
5. **`interstitial_methods.java.block`**: Manages interstitial ad lifecycle
6. **`admob_init.java.block`**: Initializes AdMob and coordinates all components

### 🔄 Installation Process
1. **Locates MainActivity.java** automatically in your Cordova project
2. **Injects modular blocks** based on your configuration (`AD_TYPE`)
3. **Replaces placeholders** with your actual AdMob IDs and preferences
4. **Configures page detection** using your `BANNER_SHOW_ON_PAGES` settings
5. **Sets up timing** according to your delay preferences
6. **Ensures compatibility** with existing code and other AdMob plugins
7. **Prevents duplications** via `// ADMOB_NATIVE_PLUGIN` marker

### 🎯 Smart Features
- **Page-aware banners**: Only show on configured pages
- **URL monitoring**: Real-time detection of page changes
- **Enhanced JavaScript interface**: Better callback system and error handling
- **Automatic reloading**: Interstitial ads reload after being closed
- **Conflict prevention**: Compatible with `admob-plus-cordova`

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

## 🆕 What's New in v1.2.0

### 🎯 Smart Page Control
- **Selective Banner Display**: Configure exactly which pages should show banners
- **Page Exclusion**: Hide banners on specific pages (login, splash, etc.)
- **Real-time URL Monitoring**: Automatic detection of page changes
- **Priority System**: `BANNER_HIDE_ON_PAGES` takes precedence over `BANNER_SHOW_ON_PAGES`

### 🏗️ Enhanced Architecture
- **Modular Java Blocks**: Separated functionality into maintainable components
- **Centralized Configuration**: All variables managed in one place
- **Better Error Handling**: Improved logging and debugging capabilities
- **Timing Control**: Configurable delays for optimal performance

### 📱 Developer Experience
- **Complete Examples**: Ready-to-use HTML and JavaScript files
- **AdMobManager Class**: Professional JavaScript library for ad management
- **Enhanced Interface**: Improved callback system and event handling
- **Comprehensive Documentation**: Detailed guides and troubleshooting

### 🔧 Configuration Flexibility
```bash
# Example: Show banners only on main pages, hide on auth pages
--variable BANNER_SHOW_ON_PAGES="index.html,home.html,products.html,about.html"
--variable BANNER_HIDE_ON_PAGES="login.html,register.html,forgot-password.html"

# Fine-tune timing for your app's needs
--variable CHECK_URL_INTERVAL="500"    # Check URL every 500ms
--variable SETUP_DELAY="1000"          # Start setup after 1 second
--variable JS_INTERFACE_DELAY="2000"   # JavaScript ready after 2 seconds
```

## 🔧 Troubleshooting

### Problem: ENOENT error - cordova_plugins.js not found
If you get `ENOENT: no such file or directory, open '...cordova_plugins.js'`:

1. **Ensure the Android platform is added:**
```bash
cordova platform add android
```

2. **Prepare the project first:**
```bash
cordova prepare android
```

3. **Then install the plugin:**
```bash
cordova plugin add admob-native-java-help --variable AD_TYPE="banner" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

### Problem: CLI variables showing as empty {}
If you see `[DEBUG] Received CLI variables: {}`:

1. **Use the local plugin installation method:**
```bash
# Clone or download the plugin locally first
git clone https://github.com/ON00dev/admob-native-java-help.git

# Then install from local path
cordova plugin add ./admob-native-java-help --variable AD_TYPE="banner" --variable AD_POSITION="top" --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" --variable APP_ID="ca-app-pub-3940256099942544~3347511713"
```

2. **Alternative: Install without variables and edit userConfig.json manually:**
```bash
# Install without variables
cordova plugin add admob-native-java-help

# Then edit the file: plugins/admob-native-java-help/scripts/userConfig.json
# Change the values manually:
{
  "adType": "banner",
  "adPosition": "top",
  "bannerId": "ca-app-pub-3940256099942544/6300978111",
  "interstitialId": "ca-app-pub-3940256099942544/1033173712",
  "appId": "ca-app-pub-3940256099942544~3347511713"
}

# Then run the after_install script manually
node plugins/admob-native-java-help/scripts/after_install.js
```

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
- **🆕 Page Configuration**: Use `BANNER_SHOW_ON_PAGES` and `BANNER_HIDE_ON_PAGES` for precise control
- **🆕 Performance Tuning**: Adjust timing variables based on your app's loading characteristics

### 🆕 Version 1.2.0 Considerations
- **Backward Compatibility**: All existing configurations continue to work
- **Enhanced Interface**: New `InterstitialAdInterface` is recommended over legacy `AndroidInterstitial`
- **Example Integration**: Check the `example/` directory for implementation patterns
- **Modular Updates**: Individual components can be updated without affecting others

## 📁 Plugin Structure

```bash
admob-native-java-help/
├── plugin.xml              # Cordova plugin configuration
├── package.json            # Dependencies and metadata
├── CHANGELOG.md            # Version history and changes
├── scripts/                # Installation scripts
│   ├── pre_install.js      # Processes configuration variables
│   ├── after_install.js    # Injects code into MainActivity
│   └── userConfig.json     # Generated configuration file
├── src/android/            # Android source code
│   ├── utils.js            # Enhanced utilities for injection
│   └── blocks/             # 🆕 Modular Java code blocks (v1.2.0)
│       ├── variables.java.block        # Configuration variables
│       ├── check_pages.java.block      # URL monitoring logic
│       ├── setup_banner.java.block     # Banner configuration
│       ├── setup_js_interface.java.block # JavaScript interface
│       ├── interstitial_methods.java.block # Interstitial management
│       └── admob_init.java.block       # AdMob initialization
├── example/                # 🆕 Complete usage examples (v1.2.0)
│   ├── index.html          # HTML demo with UI
│   ├── admob-example.js    # JavaScript library with AdMobManager
│   └── README.md           # Detailed usage documentation
└── README.md               # Main documentation
```

### 🆕 New in v1.2.0
- **Modular Java blocks**: Better organization and maintainability
- **Example directory**: Complete working examples for developers
- **Enhanced configuration**: Support for page-specific banner control
- **Improved documentation**: Comprehensive guides and examples

## 👨‍💻 Author
Developed by **ON00dev**  
Contributions, improvements and forks are welcome!

## 📄 License
[MIT](https://github.com/ON00dev/admob-native-java-help/blob/main/LICENSE) © 2024 — You are free to modify, reuse and share.
