# Kissflow Training — Android App

Native Android wrapper for the Kissflow Training web app. Loads all content, styles, and slides from GitHub Pages — always in sync with the web version.

## Install APK (phone or tablet)

1. Download **[Kissflow-Training.apk](./Kissflow-Training.apk)** from this folder
2. On your Android device, enable **Install unknown apps** for your file manager
3. Open the APK and tap **Install**
4. Launch **Kissflow Training**

> Requires Android 7.0+ (API 24) and internet connection.

## How it works

| Component | Source |
|-----------|--------|
| Training content | `https://jerome-kissflow.github.io/kissflow-training-showcase/data/content.json` |
| Styles & layout | Same GitHub Pages site (`css/styles.css`, `css/mobile.css`) |
| Slides & images | Loaded from kissflow.com CDN via slide data |

The app uses a WebView pointed at the live GitHub Pages URL. When you update content on `main`, the web deploy runs first; the Android app picks up changes on next launch (pull-to-refresh supported).

## Build APK locally

Requirements: JDK 17, Android SDK

```bash
cd "Mobile app for android/android"
sh gradlew-bootstrap.sh assembleDebug
cp app/build/outputs/apk/debug/Kissflow-Training-debug.apk ../Kissflow-Training.apk
```

## Build via GitHub Actions

Push to `main` triggers `.github/workflows/build-android.yml`, which builds and commits `Kissflow-Training.apk` to this folder.

## Project structure

```
Mobile app for android/
├── Kissflow-Training.apk      ← Install this file
├── README.md
└── android/                   ← Android Studio / Gradle project
    └── app/src/main/
        ├── java/.../MainActivity.java
        └── res/
```

## App details

- **Name:** Kissflow Training
- **Package:** com.kissflow.training
- **Features:** Swipe navigation, pull-to-refresh, offline error screen, tablet & phone layouts
