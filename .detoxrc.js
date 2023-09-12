/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: 'e2e/jest.config.js'
    },
    jest: {
      setupTimeout: 150000
    }
  },
  apps: {
    'ios': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/YOUR_APP.app',
      build: 'xcodebuild -workspace ios/YOUR_APP.xcworkspace -scheme YOUR_APP -configuration Release -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/release/app-release.apk',
      build: 'cd android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 12 Pro'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_4a_API_31'
      }
    }
  },
  configurations: {
    'ios': {
      device: 'simulator',
      app: 'ios'
    },
    'android': {
      device: 'emulator',
      app: 'android'
    }
  }
};
