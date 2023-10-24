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
- [7. Installing The App Binary](#7-installing-the-app-binary)
    - [7.1. Android Phone](#71-android-phone)
    - [7.2. Android Emulator](#72-android-emulator)
- [8. Running The Tests](#8-running-the-tests)
    - [8.1. Unit Testing](#81-unit-testing)
    - [8.2. End-To-End Testing](#82-end-to-end-testing)
        - [8.2.1. End-To-End Test Dependencies](#821-end-to-end-test-dependencies)
        - [8.2.2. Running End-To-End Tests](#822-running-end-to-end-tests)
- [9. Final Notes (Directed To Future Groups Taking Over This Project)](#9-final-notes-directed-to-future-groups-taking-over-this-project)
    - [9.1. iOS Documentation](#91-ios-documentation)
    - [9.2. Docker Files](#92-docker-files)
    - [9.3. Known Issues](#93-known-issues)
    - [9.4. Outdated \& Deprecated Project Dependencies](#94-outdated--deprecated-project-dependencies)

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

# 7. Installing The App Binary

## 7.1. Android Phone

Before you can install the release APK file on your Android phone, you must first allow the installation of apps from unknown sources.

1. Open your phone's **Settings**
2. Tap **Apps** (may also be called **Apps & Notifications**)
3. Tap **Special app access**
4. Tap **Install unknown apps**
5. Select an app for which you want to allow the installation of unknown apps (this will most likely be your preferred file manager)
6. Toggle the **Allow from this source** switch on

After you allow installing apps from unknown sources, you can simply download (see [Downloads](#2-downloads)) or transfer the release APK file to your phone and install it using your preferred file manager.

## 7.2. Android Emulator

If you don't have an Android phone, the release APK file can be dragged onto an Android Studio emulator to install it there. (You will need to uninstall this app later if you want to run the app with `npm run android` again though)

# 8. Running The Tests

## 8.1. Unit Testing

Run the command `npm run test` to run all unit tests. A code coverage report will be automatically generated after running all the unit tests which can be found in the `coverage` directory.

## 8.2. End-To-End Testing

### 8.2.1. End-To-End Test Dependencies

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

### 8.2.2. Running End-To-End Tests

Run the command `npm run e2e-android` to run all end-to-end tests. Screenshots will automatically be taken of the app during failed end-to-end tests which can be found in the `artifacts` directory.

# 9. Final Notes (Directed To Future Groups Taking Over This Project)

## 9.1. iOS Documentation

As you may have noticed, there is very little documentation provided in this README for developing, running, building and testing the app for iOS devices. Due to our client's preferences, we focused almost exclusively on developing and testing the app for Android devices but did make attempts to keep the app cross-platform.

Another issue was that the previous group before us left minimal and insufficient documentation. We were unable to get a lot of their instructions and scripts to work. In the end, we ignored or replaced parts of their setup and configurations to get things like building the app binary and end-to-end testing functional for Android.

We have provided a copy of the previous group's documentation for developing and testing the app for iOS (most of this is probably outdated and won't work)

> **Requirements**
>
> The iOS development [setup guide](https://docs.expo.dev/workflow/ios-simulator/) must be followed.
>
> **Running The App**
>
> Execute `npm run ios` to launch the app.
>
> **Unit Testing**
>
> Execute `npm run test`.
>
> **End-To-End Testing**
>
> Please note that all app binaries can be built using the external EAS Build server, however it is recommended to build these locally.
>
> App binaries must be placed in the correct location according to the .detoxrc.json file.
>
> - For running iOS tests, `applesimutil` needs to be installed
> - A binary `.app` file is required to run the detox tests from
> - A local build can be generated using this command `npx eas-cli build --platform ios --profile preview --non-interactive --local`, however it is highly temperamental and requires the correct versions of dependencies including fastlane, Xcode and CocoaPods. It is recommended to try using the latest versions. For example, it seems that Xcode 12.4 or below causes errors with fastlane. Refer to this [link](https://docs.expo.dev/build-reference/infrastructure/#image--macos-big-sur-114-xcode-125) for the exact server infrastructure EAS servers use. You will need to use a macOS that supports using Xcode above 12.4.
> - Run end-to-end tests with `npm run e2e-ios`

## 9.2. Docker Files

You may have noticed two files in the codebase, `docker-compose.yml` and `Dockerfile`, that are unexplained in this README. They were from the previous group for building the app binaries and running end-to-end tests for Android using Docker. Unfortunately, we could not get them to work.

The following was their instructions for using them:

> A Dockerfile and docker-compose.yml setup has been provided which uses Docker for building the binaries. Once the container has completed the build process, these binaries can be copied from the exited container to the host using the `docker cp` command. The app binary will be located at `CONTAINER_NAME:/app/android.apk`.

## 9.3. Known Issues

The following is a list of known issues we couldn't fix due to time constraints.

- End-to-end tests need to be updated to account for new UI changes
    - The existing end-to-end tests will fail because we didn't have time to update them for new UI changes
- Progress bar does not work on iOS devices
    - The current progress bar uses React Native’s [ProgressBarAndroid](https://reactnative.dev/docs/progressbarandroid). The problem with using this is that it is deprecated and is an Android-only component. This means the progress bar will not appear or work on iOS devices. (Worst case scenario, it may cause the app to crash)
- NativeBase is deprecated
    - [NativeBase](https://nativebase.io/) is a UI component library that was used in some parts of the codebase. Since July 24 2023, it has since been deprecated and replaced with [gluestack-ui](https://gluestack.io/). Read their [blog post](https://nativebase.io/blogs/road-ahead-with-gluestack-ui) for more information.

## 9.4. Outdated & Deprecated Project Dependencies

There will probably be at least a several month gap before another group takes over this project. You may encounter outdated and deprecated project dependencies that may prevent you from developing, running, building and testing the app.

Our advice is to do the following:

1. Ensure you have already installed all requirements from the [Requirements](#3-requirements) section
2. Follow steps 1 - 3 of the [Setup Guide](#4-setup-guide) section
3. `sudo npm install -g npm-check-updates` (You don't need to run this command again if you already have `npm-check-updates` globally installed)
4. `ncu -g`
    - Update any outdated global packages
5. `ncu -u`
6. `npm install`
7. `npm outdated`
    - If there are no outdated packages, proceed to the next step
    - Otherwise, you may need to manually install the latest versions of those outdated packages
8. `npx expo install --check`
    - Check all packages for incorrect versions, prompt to fix locally
    - Ensures all your packages will be compatible with whatever version of the Expo SDK you are using
9.  `npm audit`
    - Check for any critical vulnerabilities
10. Push your updated `package.json` to Bitbucket so other group members can pull it and run `npm install` to update their local packages
