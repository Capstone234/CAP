# How to Run the App

## As a Developer

### Requirements

- All requirements are defined in the expo documentation [here](https://docs.expo.dev/get-started/installation/).
- `npm` is used as the package manager (not `yarn`).
- You will need to ensure that [Android Studio (with an emulator)](https://docs.expo.dev/workflow/android-studio-emulator/) is setup for running on Android.
- Similarly, the iOS development [setup guide](https://docs.expo.dev/workflow/ios-simulator/) must be followed.

### Running

Simply execute `npm run android` or `npm run ios` to launch the app.

## As a User

- An app binary must be installed. Binaries can be found in the [downloads section](https://bitbucket.org/soft3888m1201p05/soft3888_m12_01_p05/downloads/) of the Bitbucket repository.
- Depending on the operating system of your mobile device (iOS or Android), you will need to transfer the corresponding binary file onto the device.
- Currently, only Android apps can install the direct `app.apk` file on mobile devices. This is due to iOS security restrictions (an Apple Developer account is required for installation).

# Running Tests

Please read below for details on running both unit and E2E tests.

## Unit Testing

To run unit tests, simply run the command `npm run test`.

## End-to-End Testing

Please read the information below for running E2E tests.

### Dependencies

Please note that all app binaries can be built using the external EAS Build server, however it is recommended to build these locally.

Both these binaries must be placed in the correct location according to the .detoxrc.json file.

#### iOS (Mac Only)

- For running iOS tests, `applesimutil` needs to be installed.
- A binary `.app` file is required to run the detox tests from.
- A local build can be generated using this command `npx eas-cli build --platform ios --profile preview --non-interactive --local`, however it is highly temperamental and requires the correct versions of dependencies including fastlane, Xcode and CocoaPods. It is recommended to try using the latest versions. For example, it seems that Xcode 12.4 or below causes errors with fastlane. Refer to this [link](https://docs.expo.dev/build-reference/infrastructure/#image--macos-big-sur-114-xcode-125) for the exact server infrastructure EAS servers use. You will need to use a macOS that supports using Xcode above 12.4.

#### Android (Windows and Mac)

- Two binaries are required, a "Test" apk, and the "actual app" apk.
- These binaries can be built locally with the correct setup using the 'debug' and 'preview' profiles in the `eas.json` configuration.
- A Dockerfile and docker-compose.yml setup has been provided which uses Docker for building the binaries. Once the container has completed the build process, these binaries can be copied from the exited container to the host using the `docker cp` command. The app binary will be located at `CONTAINER_NAME:/app/android.apk`.
- Running the tests on Android requires using a 64-bit emulator.
- Currently, running Android tests are temperamental and not recommended.

### Running the tests

These tests can be run on iOS and Android with the following commands, respectively:
- `npm run e2e-ios`
- `npm run e2e-android`
