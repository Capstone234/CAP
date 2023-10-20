import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// code to prevent users from going back mid test. already cannot resubmit result
// on most tests anyway but this will prevent it on the few that can, and also
// prevent non-unique key warnings.

//just import to any screen and run the function to prevent back button use.

const preventBackAction = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Error", "Cannot go back during testing.", [
        {
          text: "OK",
          onPress: () => null,
          style: "cancel"
        }
      ]);
      return true; // This will prevent the default back action
    };

    const addBackListener = () => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    };

    const removeBackListener = () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };

    // Add the listener when the screen is focused
    const focusSubscription = navigation.addListener('focus', addBackListener);
    // Remove the listener when the screen loses focus
    const blurSubscription = navigation.addListener('blur', removeBackListener);

    return () => {
      // Clean up event listeners upon unmount or when navigating away
      focusSubscription && focusSubscription();
      blurSubscription && blurSubscription();
      removeBackListener();
    };
  }, [navigation]);
};

export default preventBackAction;
