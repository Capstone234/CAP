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

function SP5({ navigation }) {
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
  }, [startValue, endRightValue, endLeftValue]);

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
        onPress={() => navigation.navigate('VOMS Smooth Pursuits 6 Response 2')}
        style={[styles.bottomButton, uiStyle.shadowProp]}
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
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/20,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});

export default SP5;