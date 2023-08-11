import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';
import { useEffect, useRef } from 'react';

const height = Dimensions.get('screen').height;

function SP2({ navigation }) {
  const startValue = useRef(new Animated.Value(0)).current;
  const endRightValue = height / 3;
  const endLeftValue = -height / 3;
  const halfDuration = 1000;
  const fullDuration = 2000;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(startValue, {
          toValue: endRightValue,
          duration: halfDuration,
          useNativeDriver: true,
        }),
        Animated.timing(startValue, {
          toValue: endLeftValue,
          duration: fullDuration,
          useNativeDriver: true,
        }),
        Animated.timing(startValue, {
          toValue: 0,
          duration: halfDuration,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 },
    ).start();
  }, [startValue, endRightValue, endLeftValue, navigation]);

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            uiStyle.vomsCircle,
            {
              transform: [
                {
                  translateY: startValue,
                },
              ],
            },
          ]}
        />
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Voms SP 3 Response 1')}
        onPress={() => navigation.navigate('VOMS Smooth Pursuits 3 Response 1')}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    ...uiStyle.contentContainer,
    justifyContent: 'center',
  },
});

export default SP2;
