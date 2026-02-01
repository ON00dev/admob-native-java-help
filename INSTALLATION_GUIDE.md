# Installation Guide

## Prerequisites

This plugin requires **admob-plus-cordova** to be installed, as it relies on its AdMob SDK integration and configuration.

## Install

To install the plugin, run the following command in your Cordova project root:

```bash
cordova plugin add admob-native-java-help --variable BANNER_AD_UNIT_ID="your_banner_id" --variable INTERSTITIAL_AD_UNIT_ID="your_interstitial_id" --variable APP_ID_ANDROID="your_app_id"
```

**Note:** The `APP_ID_ANDROID` variable is required by the `admob-plus-cordova` dependency.

## Required Variables

- `BANNER_AD_UNIT_ID`: Your AdMob Banner Unit ID.
- `INTERSTITIAL_AD_UNIT_ID`: Your AdMob Interstitial Unit ID.
- `APP_ID_ANDROID`: Your AdMob Application ID (required for `admob-plus-cordova`).

## Optional Variables

- `AD_TYPE`: `banner`, `interstitial`, or `banner,interstitial` (default: `banner`).
- `AD_POSITION`: `top` or `bottom` (default: `bottom`).
- `BANNER_SHOW_ON_PAGES`: Comma-separated list of URL parts where banner should show (default: `index.html`).
- `BANNER_HIDE_ON_PAGES`: Comma-separated list of URL parts where banner should hide.
- `CHECK_URL_INTERVAL`: Interval in ms to check URL changes (default: `1000`).
- `SETUP_DELAY`: Delay in ms before initial setup (default: `2000`).
- `JS_INTERFACE_DELAY`: Delay in ms before injecting JS interface (default: `3000`).
- `ADMOB_INIT_DELAY`: Delay in ms before initializing AdMob (default: `1000`).

## Example

```bash
cordova plugin add admob-native-java-help \
  --variable BANNER_AD_UNIT_ID="ca-app-pub-3940256099942544/6300978111" \
  --variable INTERSTITIAL_AD_UNIT_ID="ca-app-pub-3940256099942544/1033173712" \
  --variable APP_ID_ANDROID="ca-app-pub-3940256099942544~3347511713" \
  --variable AD_TYPE="banner,interstitial" \
  --variable AD_POSITION="bottom"
```
