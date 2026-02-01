# admob-native-java-help

Cordova plugin for native AdMob integration using a Clean Architecture approach (v2).
This plugin creates a dedicated `AdMobCordovaActivity` that extends `CordovaActivity` to manage AdMob banners and interstitials natively, outside the WebView, ensuring reliable display and no z-index issues.

## Prerequisites

- **admob-plus-cordova**: This plugin depends on `admob-plus-cordova` for the underlying AdMob SDK and App ID configuration. It will be automatically installed as a dependency.

## Features

- **Native Activity**: Uses `AdMobCordovaActivity` instead of injecting code into `MainActivity.java`.
- **No WebView Hacks**: Banners are placed in a native layout alongside the WebView, not over it.
- **Page Control**: Show/Hide banners based on current WebView URL (configured via `BANNER_SHOW_ON_PAGES` and `BANNER_HIDE_ON_PAGES`).
- **Interstitials**: Full support for interstitial ads with auto-reload.
- **Clean Install**: Does not modify your project's `MainActivity.java` or other core files.

## Installation

See [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed instructions.

```bash
cordova plugin add admob-native-java-help --variable APP_ID_ANDROID="your_app_id" ...
```

## Documentation

- [Installation Guide](INSTALLATION_GUIDE.md)
- [Folder Examples](FOLDER_EXAMPLES.md)
- [Page Detection Logic](PAGE_DETECTION.md)
- [Changelog](CHANGELOG.md)

## License

MIT
