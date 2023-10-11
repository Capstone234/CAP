import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

// This file is used for normalizing text and spacing between different screen sizes.
// Categorizes first by PixelRatio then by Dimensions.
// Credit: https://www.reactnativeschool.com/normalizing-text-and-spacing-between-screen-sizes
// Credit: https://dev.to/jasurkurbanov/how-to-create-custom-fully-responsive-text-component-in-react-native-51d8

const pixelRatio = PixelRatio.get();

const normalize = (size) => {
  const { deviceWidth, deviceHeight } = Dimensions.get('window');

  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iPhone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iPhone 5
    if (deviceHeight < 667) {
      return size;
    }
    // iPhone 6 - 6s
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }

    // Catch older phablet devices
    return size * 1.25;
  } if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // Catch Android font scaling on small machines where pixel ratio / font scale ratio >= 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird Android width sizes
    if (deviceHeight < 667) {
      return size * 1.15;
    }
    // Catch in-between size Androids and scale font up a tad but not too much
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }

    // Catch larger devices (i.e. iPhone 6s Plus / iPhone 7 Plus / Xiaomi Mi Notes etc...)
    return size * 1.27;
  } if (pixelRatio >= 3.5) {
    // Catch Android font scaling on small machines where pixel ratio / font scale ratio >= 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other smaller Android height sizes
    if (deviceHeight < 667) {
      return size * 1.2;
    }
    // Catch in-between size Androids and scale font up a tad but not too much
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }

    // Catch larger phablet devices
    return size * 1.4;
  }

  return size;
};

// Parses CSS code for a series of target keys (see targetProperties) and normalizes them
// automatically otherwise it will just forward them along without any changes.
export const create = (
  styles,
  targetProperties = [
    'height',
    'margin',
    'marginBottom',
    'marginEnd',
    'marginHorizontal',
    'marginLeft',
    'marginRight',
    'marginStart',
    'marginTop',
    'marginVertical',
    'padding',
    'paddingBottom',
    'paddingEnd',
    'paddingHorizontal',
    'paddingLeft',
    'paddingRight',
    'paddingStart',
    'paddingTop',
    'paddingVertical',
    'width',
    'fontSize',
    'letterSpacing',
    'lineHeight',
  ]
) => {
  const normalizedStyles = {};
  Object.keys(styles).forEach((key) => {
    normalizedStyles[key] = {};
    Object.keys(styles[key]).forEach((property) => {
      if (targetProperties.includes(property)) {
        normalizedStyles[key][property] = normalize(styles[key][property]);
      } else {
        normalizedStyles[key][property] = styles[key][property];
      }
    });
  });

  return StyleSheet.create(normalizedStyles);
};

export default normalize;