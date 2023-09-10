# How To Run The App

## As A Developer

### Requirements

- All requirements are defined in the expo documentation [here](https://docs.expo.dev/get-started/installation/).
- `npm` is used as the package manager (not `yarn`).
- You will need to ensure that [Android Studio (with an emulator)](https://docs.expo.dev/workflow/android-studio-emulator/) is setup for running on Android.
- Similarly, the iOS development [setup guide](https://docs.expo.dev/workflow/ios-simulator/) must be followed.

### Quick Setup Guide

Run these following commands to quickly setup the codebase onto your computer with all necessary dependencies you would need for running the app. Assumes you already have setup everything from the [Requirements](#requirements) section.

1. Clone this repository (i.e. `git clone`)
2. `cd soft3888_m12_01_p05`
3. `sudo npm install -g expo-cli` (You don't need to run this command again if you already have `expo-cli` globally installed)
4. `npm install`

### Running The App

Execute `expo start --android` to launch the app.

## As A User

- An app binary must be installed. Binaries can be found in the [downloads section](https://bitbucket.org/soft3888m1201p05/soft3888_m12_01_p05/downloads/) of the Bitbucket repository.
- Depending on the operating system of your mobile device (iOS or Android), you will need to transfer the corresponding binary file onto the device.
- Currently, only Android apps can install the direct `app.apk` file on mobile devices. This is due to iOS security restrictions (an Apple Developer account is required for installation).

# Building The App Binary

Before you can build the apk file locally you need to setup some more dependencies first.

Log into your Expo account:

1. Make an Expo account if you haven't already
2. `sudo npm install -g eas-cli` (You don't need to run this command again if you already have `eas-cli` globally installed)
3. `eas login` (You don't need to run this command again if you're already logged in)

Then, install Java and Gradle (aim to install Java 17 and Gradle 8.0.1):

- If you're on MacOS / Linux
    1. Install [SDKMAN!](https://sdkman.io/)
    2. `sdk install java 17.0.2-open`
    3. `sdk default java 17.0.2-open`
    4. `sdk install gradle 8.0.1`
    5. `sdk default gradle 8.0.1`
- If you're on Windows, building locally is unsupported. You'll need to either use WSL or use Expo's external server through `eas build --platform android --profile preview` but Expo only allows you a limited number of builds on their external server before they start charging you money. And you will need to contact us to get access to our Expo organization.

Now, you can run `eas build --platform android --profile preview --non-interactive --local` to build the release apk file. This process does take a long time (on some computers it took approximately 30 mins). You'll find the apk file as `build-XXXXXXXXXXXXXX.apk` in the root directory.

You can also run `eas build --platform android --profile debug --non-interactive --local` to build the test apk file. This is mainly for the end-to-end tests.

If you don't have an Android phone, the release apk file (from "preview" profile) can be dragged onto the Android Studio emulator to install it there. (You will need to uninstall this app later if you want to use `expo start --android` again though)

# Running Tests

Please read below for details on running both unit and E2E tests.

## Unit Testing

To run unit tests, simply run the command `npm run test`.

## End-To-End Testing

Please read the information below for running E2E tests.

### Dependencies

Please note that all app binaries can be built using the external EAS Build server, however it is recommended to build these locally (see [Building App Binary](#building-app-binary) section for more details).

Both these binaries must be placed in the correct location according to the `.detoxrc.json` file.

#### iOS (Mac Only)

- For running iOS tests, `applesimutil` needs to be installed.
- A binary `.app` file is required to run the detox tests from.
- A local build can be generated using this command `npx eas-cli build --platform ios --profile preview --non-interactive --local`, however it is highly temperamental and requires the correct versions of dependencies including fastlane, Xcode and CocoaPods. It is recommended to try using the latest versions. For example, it seems that Xcode 12.4 or below causes errors with fastlane. Refer to this [link](https://docs.expo.dev/build-reference/infrastructure/#image--macos-big-sur-114-xcode-125) for the exact server infrastructure EAS servers use. You will need to use a macOS that supports using Xcode above 12.4.

#### Android (Windows & Mac)

- Two binaries are required, a "test" apk and the "actual app" apk.
- These binaries can be built locally with the correct setup using the 'debug' and 'preview' profiles in the `eas.json` configuration.
- Running the tests on Android requires using a 64-bit emulator.
- Currently, running Android tests are temperamental and not recommended.

### Running The Tests

These tests can be run on iOS and Android with the following commands, respectively:

- `npm run e2e-ios`
- `npm run e2e-android`
