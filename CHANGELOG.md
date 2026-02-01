# Changelog

All notable changes to this project will be documented in this file.

## [2.0.3] - 2026-01-31

### Changed
- **UI Architecture**: Switched from `LinearLayout` to `FrameLayout` for the main Activity layout.
- **Overlay Support**: WebView is now configured with a transparent background (`0x00000000`), allowing banners to be displayed in overlay mode (floating above or below content) without resizing or cutting the WebView viewport.
- **Dependency Config**: Explicitly exposed `APP_ID_ANDROID` preference to be passed down to the `admob-plus-cordova` dependency for automatic `AndroidManifest.xml` configuration.

## [2.0.2] - 2026-01-31

### Changed
- **Dependency Management**: Replaced direct Google Play Services SDK reference with `admob-plus-cordova` dependency.
- **Simplification**: Removed `APP_ID` preference from plugin configuration (handled by dependency).
- **Documentation**: Updated installation guides to reflect new dependency requirements.

## [2.0.1] - 2026-01-31

### Fixed
- **Critical WebView Fix**: Added `loadUrl(launchUrl)` to `AdMobCordovaActivity` to ensure the app loads correctly on startup.
- **Build Compliance**: Added `DummyActivity.java` to satisfy Cordova build checks that require a `CordovaActivity` subclass in the main package.
- **Manifest Logic**: Improved `fix-manifest.js` to correctly handle Activity aliases and launcher registration.

## [2.0.0] - 2026-01-29

### Major Architecture Change
- **CLEAN ARCHITECTURE (No Injection)**: Completely removed the logic that injected Java code into `MainActivity.java`.
- **AdMobLauncher**: Introduced `AdMobLauncher` class that extends `AdMobCordovaActivity`. This new class acts as the entry point for the application.
- **Safe Installation**: The plugin now creates `AdMobLauncher.java` in the app's package structure and updates `AndroidManifest.xml` to use it, leaving the original `MainActivity.java` untouched.
- **Compatibility**: Enhanced compatibility with Cordova Android 10+ and Java 11+.

### Added
- **CLI Variable Mapping**: All configuration options (`BANNER_AD_UNIT_ID`, `AD_POSITION`, `SETUP_DELAY`, etc.) are now automatically mapped from CLI variables to Android preferences.
- **Smart Manifest Management**: New hook `scripts/fix-manifest.js` that safely handles the switch to `AdMobLauncher` and preserves project integrity.

### Removed
- **Code Injection**: Removed all regex-based injection scripts (`pre_install.js`, `after_install.js`) that modified `MainActivity.java`.
- **Legacy Blocks**: Removed obsolete Java code blocks (`.java.block` files) used for injection.

## [1.2.2] - 2025-09-02

### Added
- **COMPREHENSIVE DOCUMENTATION**: Complete documentation for page detection and folder structures
  - `PAGE_DETECTION.md`: Technical documentation explaining how the plugin detects HTML pages
  - `FOLDER_EXAMPLES.md`: Practical examples with different folder structures and configurations
  - Detailed explanations of URL monitoring mechanism and real-time detection
  - Advanced configuration examples for complex project structures

### Enhanced
- **DEVELOPER EXPERIENCE**: Improved documentation with practical examples
  - Real-world scenarios for games, enterprise apps, and e-commerce
  - Best practices for folder organization and configuration
  - Debug tips and troubleshooting guides
  - Performance optimization recommendations

## [1.2.1] - 2025-07-30

### Added
- **OPTIMIZED INITIALIZATION**: Implementation of AdMob initialization with configurable delay
  - `ADMOB_INIT_DELAY`: New preference to control AdMob initialization delay
  - `setup_admob_with_delay.java.block`: New block for delayed initialization
  - `admob_init.java.block`: Dedicated block for AdMob initialization

### Fixed
- Fixed syntax errors in `MainActivity.java` injections
- Moved AdMob variable declarations inside the MainActivity class
- Removed duplicate variable declarations
- Added necessary imports for AdMob classes
- Fixed class structure by adding missing closing brace in `setupAdMobBanner` method
- Added `@NonNull` annotations for better compatibility with the latest SDK
- Improved error recovery when loading ads

### Improved
- Implemented full methods for AdMob functionality
- Improved error and exception handling
- Optimized JavaScript interface for interstitial ads
- Updated documentation and examples

## [1.2.0] - 2025-07-30

### Added
- **CUSTOM PREFERENCES**: Added configurable preferences for advanced banner control
  - `BANNER_SHOW_ON_PAGES`: Control which pages display banners
  - `BANNER_HIDE_ON_PAGES`: Control which pages hide banners
  - `CHECK_URL_INTERVAL`: Configurable URL checking interval
  - `SETUP_DELAY`: Configurable setup delay
  - `JS_INTERFACE_DELAY`: Configurable JavaScript interface delay
- **MODULAR ARCHITECTURE**: Complete restructure with separate Java blocks
  - `variables.java.block`: Centralized variable management
  - `check_pages.java.block`: URL monitoring and page detection
  - `setup_banner.java.block`: Banner configuration and positioning
  - `setup_js_interface.java.block`: JavaScript interface setup
  - `interstitial_methods.java.block`: Interstitial ad management
- **EXAMPLE FILES**: Comprehensive examples for developers
  - `example/index.html`: Complete HTML interface demo
  - `example/admob-example.js`: JavaScript library with AdMobManager class
  - `example/README.md`: Detailed documentation and usage guide

### Enhanced
- **SMART PAGE DETECTION**: Automatic URL monitoring with configurable intervals
- **FLEXIBLE BANNER CONTROL**: Show/hide banners based on current page
- **IMPROVED JAVASCRIPT INTERFACE**: Enhanced callback system and error handling
- **BETTER CONFIGURATION**: All timing and behavior aspects are now configurable
- **DEVELOPER EXPERIENCE**: Complete examples and documentation

### Technical Improvements
- Modular Java block architecture for better maintainability
- Enhanced utils.js with support for all new configuration options
- Improved pre_install.js to handle new preference variables
- Better separation of concerns between different plugin components
- Comprehensive error handling and logging throughout

## [1.1.0] - 2025-07-30

### Fixed
- **CRITICAL BUG**: Fixed interstitial ads not displaying properly
- **INTERSTITIAL IMPLEMENTATION**: Complete rewrite of interstitial.java.block based on working example
- **JAVASCRIPT INTERFACE**: Fixed js_interface.java.block with proper callback handling
- **ADMOB INITIALIZATION**: Added admob_init.java.block for proper AdMob SDK initialization
