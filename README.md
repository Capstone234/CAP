![Concussion Action Plan App Logo](./assets/logo.png)

<!-- omit in toc -->
# Concussion Action Plan App

- [1. Overview](#1-overview)
- [2. Downloads](#2-downloads)
- [3. Requirements](#3-requirements)
- [4. Setup Guide](#4-setup-guide)
- [5. Running The App](#5-running-the-app)
- [6. Building The App Binary](#6-building-the-app-binary)
    - [6.1. Windows](#61-windows)
    - [6.2. MacOS / Linux](#62-macos--linux)
- [7. Running The Tests](#7-running-the-tests)
    - [7.1. Unit Testing](#71-unit-testing)
    - [7.2. End-To-End Testing](#72-end-to-end-testing)
        - [7.2.1. End-To-End Test Dependencies](#721-end-to-end-test-dependencies)
        - [7.2.2. Running End-To-End Tests](#722-running-end-to-end-tests)

# 1. Overview

The following describes the tools, languages and frameworks used to develop, run, build and test the app:

- Package Manager
    - **npm**
- Languages and Frameworks Used for Cross-Platform Mobile Development
    - **Expo**
    - **React Native**
    - **JavaScript**
- Android IDE and Emulator
    - **Android Studio**
- iOS IDE and Emulator
    - **Xcode**
- Build Process
    - **Expo (EAS Build)**
    - **Java 17**
    - **Gradle 8.0.1**
- Database (Local)
    - **SQLite**
- Unit Tests, Mocking and Code Coverage Reports
    - **Jest**
- End-To-End Tests
    - **Detox**

# 2. Downloads

- App binaries can be found in the [Downloads](https://bitbucket.org/soft3888m1201p05/soft3888_m12_01_p05/downloads/) section of the Bitbucket repository.
- Depending on the operating system of your mobile device (iOS or Android), you will need to transfer the corresponding binary file onto the device.
- Currently, only Android apps can install the direct `app-release.apk` file on mobile devices. (This is due to iOS security restrictions as an Apple Developer account is required for installation)

# 3. Requirements

- All requirements are defined in the [Expo documentation](https://docs.expo.dev/get-started/installation/).
- `npm` is used as the package manager (not `yarn`).
- You will need to ensure that [Android Studio (with an emulator)](https://docs.expo.dev/workflow/android-studio-emulator/) is setup for running on Android.
- Similarly, for iOS development, this [setup guide](https://docs.expo.dev/workflow/ios-simulator/) must be followed.
- Set your environment variables correctly for `ANDROID_HOME` (Check this [page](https://docs.expo.dev/workflow/android-studio-emulator/#set-up-android-studios-tools) or this [page](https://stackoverflow.com/questions/29391511/where-is-android-sdk-root-and-how-do-i-set-it) for instructions)

# 4. Setup Guide

Run the following commands to setup the codebase onto your computer with all necessary dependencies you need for running, building and testing the app. This setup guide assumes you have already installed all requirements from the [Requirements](#3-requirements) section.

1. Clone this repository (i.e. `git clone`)
2. `cd soft3888_m12_01_p05`
3. Install project dependencies
    - `sudo npm install -g eas-cli` (You don't need to run this command again if you already have `eas-cli` globally installed)
    - `sudo npm install -g detox-cli` (You don't need to run this command again if you already have `detox-cli` globally installed)
    - `npm install`
4. Create an [Expo account](https://expo.dev/signup) if you don't have one already
5. `eas login` (You don't need to run this command again if you're already logged in)
6. Install Java 17 and Gradle 8.0.1
    - If you're on Windows, building the app binary locally is unsupported (see the [Building The App Binary](#61-windows) section for alternative methods)
    - If you're on MacOS / Linux
        1. Install [SDKMAN!](https://sdkman.io/)
        2. `sdk install java 17.0.2-open`
        3. `sdk default java 17.0.2-open`
        4. `sdk install gradle 8.0.1`
        5. `sdk default gradle 8.0.1`
7. `npx expo prebuild`
8. `mkdir -p e2e/bin`

# 5. Running The App

Run the command `npm run android` to launch the app in an Android Studio emulator.

# 6. Building The App Binary

You will need to either contact us to get access to our Expo organization or create your own Expo organization and edit `app.json` to remove the `extra` and `owner` sections. If you don't do this, you will most likely get errors such as:

> `You don't have the required permissions to perform this operation.`

## 6.1. Windows

You'll need to either use [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/) to setup the codebase again or build the app binary on Expo's external servers through `eas build --platform android --profile test` but Expo only allows a limited number of builds on their external servers before they start charging money (see their [pricing plans](https://expo.dev/pricing)).

## 6.2. MacOS / Linux

Run the command `npm run build` to build both the release and debug Android APK files. You'll find the APK files as `build-XXXXXXXXXXXXX.tar.gz` in the root directory.

If you don't have an Android phone, the release APK file can be dragged onto an Android Studio emulator to install it there. (You will need to uninstall this app later if you want to run the app with `npm run android` again though)

# 7. Running The Tests

## 7.1. Unit Testing

Run the command `npm run test` to run all unit tests. A code coverage report will be automatically generated after running all the unit tests which can be found in the `coverage` directory.

## 7.2. End-To-End Testing

### 7.2.1. End-To-End Test Dependencies

1. Build the app binary (see [Building The App Binary](#6-building-the-app-binary) section for more details)
2. Extract the contents of the built `build-XXXXXXXXXXXXX.tar.gz` file into `e2e/bin`
3. Create a new emulator in Android Studio with the following specifications: (You don't need to make this emulator again if you already have it setup)
    - Hardware
        - **Pixel 7**
    - System Image
        - Release Name
            - **S**
        - API Level
            - **31**
        - ABI
            - **x86_64** (If on Windows / Linux)
            - **arm64-v8a** (If on MacOS)
        - Target
            - **Android 12.0**
    - Make sure you use **Android Open Source Project (AOSP)** system images and not ones from **Google Inc**

### 7.2.2. Running End-To-End Tests

Run the command `npm run e2e-android` to run all end-to-end tests. Screenshots will automatically be taken of the app during failed end-to-end tests which can be found in the `artifacts` directory.
