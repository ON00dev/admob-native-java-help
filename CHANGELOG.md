# Changelog

All notable changes to this project will be documented in this file.

## [2.0.20] - 2026-02-06
### Changed
- **SDK Compatibility**: Updated the `AdMob.java` patcher to replace the deprecated `MobileAds.getVersionString()` with a hardcoded string `"23.0.0"` (instead of `"20.6.0"`), aligning with the latest SDK requirements.

## [2.0.19] - 2026-02-06
### Fixed
- **AdMobLauncher Injection**: Moved `AdMobLauncher` activity definition to `plugin.xml` (using `<config-file>`) instead of relying solely on the `after_prepare` hook. This ensures the activity is always present in the manifest, preventing "Cannot read properties of null (reading 'attrib')" errors during deployment.
- **MainActivity Cleanup**: Improved regex to handle self-closing `MainActivity` tags, ensuring duplicate launchers are properly removed.

## [2.0.18] - 2026-02-06
### Removed
- **Manifest Cleanup**: Removed automatic injection of `xmlns:tools` namespace to restore cleaner manifest behavior similar to v2.0.6. The plugin now focuses solely on fixing `AdMobLauncher`, `APPLICATION_ID` duplication, and removing unwanted `AD_SERVICES_CONFIG` properties.

## [2.0.17] - 2026-02-06
### Fixed
- **Manifest Cleanup**: Added script logic to actively remove `<property android:name="android.adservices.AD_SERVICES_CONFIG">` from `AndroidManifest.xml`. This prevents "resource not found" errors when dependencies inject this property but the referenced XML file is missing.

## [2.0.16] - 2026-02-06
### Removed
- **GMA Config**: Removed `gma_ad_services_config.xml` and the corresponding `<property android:name="android.adservices.AD_SERVICES_CONFIG">` from the manifest. This simplifies the plugin and avoids build errors related to missing resources, as the file is only required if the property is present.

## [2.0.15] - 2026-02-06
### Fixed
- **Resource Path**: Updated `<resource-file>` target to `app/src/main/res/xml/gma_ad_services_config.xml` to correctly match modern Cordova Android project structure (Android 13+), ensuring AAPT finds the file.

## [2.0.14] - 2026-02-06
### Fixed
- **Resource Error (Final Fix)**: Switched to using Cordova's native `<resource-file>` mechanism to copy `gma_ad_services_config.xml`. This ensures the file is copied at the correct build phase, resolving timing issues where the file was missing during resource compilation.

## [2.0.13] - 2026-02-06
### Fixed
- **Resource Error**: Updated `gma_ad_services_config.xml` generation logic to force creation/update with correct attributes (`allowAdImpressionAttribution`, `allowAdConversionAttribution`) in the correct path, definitively fixing the `resource ... not found` error.

## [2.0.12] - 2026-02-06
### Fixed
- **Build Error**: Explicitly create `gma_ad_services_config.xml` in `res/xml/` to resolve `AAPT: error: resource ... not found`.
- **Manifest**: Add `xmlns:tools` to `<manifest>` tag to prevent "prefix 'tools' is not bound" errors.
- **Cleanup**: Improved `AdMobLauncher` duplicate detection to avoid warnings.
- **Optimization**: Avoid overwriting `AdMobLauncher.java` if content is identical.

## [2.0.11] - 2026-02-05
### Fixed
- **Missing Resource**: Automatically create `gma_ad_services_config.xml` in `res/xml/` if missing, preventing "resource not found" build errors.
- **Manifest Merger**: Improved `AdMobLauncher` injection check to prevent duplication if the activity is already present (e.g. added by another hook).

## [2.0.10] - 2026-02-05
### Fixed
- **Manifest Merger**: Add `xmlns:tools="http://schemas.android.com/tools"` to `<manifest>` tag to resolve "The prefix 'tools' is not bound" build error.

## [2.0.9] - 2026-02-05
### Added
- **AdMob.java Patch**: Patch `AdMob.java` from `admob-plus-cordova` to replace deprecated `MobileAds.getVersionString()` with fixed "20.6.0" (SDK 23.0.0 fix).
- **Dynamic Launcher**: Create `AdMobLauncher.java` in the correct package path dynamically to avoid ClassNotFoundException.

### Fixed
- **Manifest Merger**: Clean duplicate `MainActivity` and `AdActivity` entries to avoid conflicts.
- **Manifest Merger**: Clean duplicate `APPLICATION_ID` entries.
- **Clean Architecture**: Remove redundant `config-file` injections from `plugin.xml`.

## [2.0.6] - 2026-02-01

### Fixed
- **Interstitial Loading**: Fixed an issue where Interstitial Ads were not loading if the `AD_TYPE` preference was not explicitly set to include "interstitial". Now, the plugin automatically attempts to load interstitials whenever `INTERSTITIAL_AD_UNIT_ID` is provided, regardless of the `AD_TYPE` value.
- **Banner Logic**: Similarly, banner logic is now activated based on the presence of `BANNER_AD_UNIT_ID` rather than relying solely on `AD_TYPE`.

## [2.0.5] - 2026-02-01

### Fixed
- **AdActivity Duplication**: Implemented automatic removal of explicit `com.google.android.gms.ads.AdActivity` declarations in `AndroidManifest.xml`. This resolves "Duplicate Activity" build errors caused by residual Cordova tracking (android.json) conflicting with the Google Ads SDK's internal manifest declaration.

## [2.0.4] - 2026-01-31

### Fixed
- **Manifest Merger Failure**: Implemented automatic detection and removal of duplicate `com.google.android.gms.ads.APPLICATION_ID` meta-data in `AndroidManifest.xml`. This resolves build errors caused by conflicts between the default placeholder value from dependencies and the user-provided App ID. The plugin now intelligently preserves the valid App ID.

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
