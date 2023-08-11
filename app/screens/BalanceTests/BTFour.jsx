import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

import uiStyle from '../../components/uiStyle.jsx';
import { useContext, useState } from 'react';
import { dataContext } from '../../components/GlobalContextProvider';
import getStandardDeviation from '../../model/standardDeviation';

function BTFour({ navigation }) {
  const [text, setText] = useState('Start!');
  const changeText = () => setText('Recording!');
  const [data2, setData2] = useContext(dataContext);
  const [subscription, setSubscription] = useState(null);
  const x_arr = [];
  const y_arr = [];
  const z_arr = [];
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        // setData(accelerometerData);
        Accelerometer.setUpdateInterval(500);
        x_arr.push(accelerometerData.x);
        y_arr.push(accelerometerData.y);
        z_arr.push(accelerometerData.z);
        const x_sd = getStandardDeviation(x_arr);
        const y_sd = getStandardDeviation(y_arr);
        const z_sd = getStandardDeviation(z_arr);
        const sd = (x_sd + y_sd + z_sd) / 3;
        setData2(sd);
      }),
    );
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.stackedText}>
        Hold to chest for 10 seconds after clicking "Start!" while keeping one
        leg up in the air. {'\n'}
        {'\n'}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (!subscription) {
            _subscribe();
          }
          changeText();
          setTimeout(() => {
            Accelerometer.removeAllListeners();
            Vibration.vibrate();
            navigation.navigate('Balance Test 5');
          }, 10000);
        }}
        style={styles.startCheckButton}
      >
        <Text style={styles.startCheckText}>{text}</Text>
      </TouchableOpacity>
      <View style={uiStyle.textContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Balance Test 1')}
          style={uiStyle.bottomButton}
        >
          <Text style={uiStyle.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff3333';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
});

export default BTFour;
