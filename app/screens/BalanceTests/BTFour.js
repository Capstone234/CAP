import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Accelerometer } from "expo-sensors";

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTFourStyle';
import { useContext, useState, useEffect } from "react";
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext,
  dataContext2
} from '../../components/GlobalContextProvider';
import getStandardDeviation from "../../model/standardDeviation";
import { useIsFocused } from "@react-navigation/native";

import preventBackAction from '../../components/preventBackAction';

function BTFour({ navigation }) {

  preventBackAction();

  const [text, setText] = useState("Start!");
  const startedText = () => setText("Recording!");
  const readyText = () => setText("Ready!");
  const resetText = () => setText("Start!");
  const [data2, setData2] = useContext(dataContext2);
  const [subscription, setSubscription] = useState(null);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const {incidentId, updateIncidentId} = useContext(IncidentIdContext);
  const [user, setUser] = useContext(UserContext);

  const x_arr = [];
  const y_arr = [];
  const z_arr = [];

  var startTimer = null;
  var endTimer = null;
  const [started, setStarted] = useState(false);
  const focussed = useIsFocused();

  async function fetchBalance(uid, iid) {
    try {
      const balance = await incidentReportRepoContext.getBalance(uid, iid);
      console.log(balance);
    } catch (error) {
      console.error('Error fetching balance result:', error);
    }
  }

  useEffect(() => {
    if (focussed) {
      if (started) {
        readyText();
        startTimer = setTimeout(() => {
          Vibration.vibrate();
          _subscribe();
          startedText();
          endTimer = setTimeout(() => {
            Accelerometer.removeAllListeners();
            Vibration.vibrate();
            setSubscription(null);
            resetText();
            // storeResult(data2);
            navigation.navigate("Balance Test Complete 2");
          }, 10000);
        }, 1000);
      } else {
        return () => {};
      }
    }
    return () => {
      Accelerometer.removeAllListeners();
      setSubscription(null);
      setStarted(false);
      storeResult(data2);
      clearTimeout(startTimer)
      clearTimeout(endTimer);
      clearInterval(startTimer, endTimer);
      clearImmediate(startTimer, endTimer);
      window.clearInterval(startTimer, endTimer);
    };
  }, [focussed, started]);

  const storeResult = async(info) => {
    var variation = Math.round(Math.pow(info, 2) * 1000) / 1000;
    var deviation = Math.round(info * 1000) / 1000;

    var result = 0;
    if (deviation < 0.2 && variation < 0.05) {
      result = 1;
    }
    try {
      const balanceData = await incidentReportRepoContext.getBalance(user.uid, incidentId);

      // Now you have memoryData available in variables
      if (balanceData) {
        varianceResult1 = balanceData.variance1;
        deviationResult1 = balanceData.deviation1;
        passResult1 = balanceData.balancePass1;
      }
    } catch (error) {
      console.error('Error:', error);
    }

    incidentReportRepoContext.updateBalance(user.uid, incidentId, varianceResult1, deviationResult1, variation, deviation, passResult1, result);
    console.log(fetchBalance(user.uid, incidentId));

  }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        // setData(accelerometerData);
        Accelerometer.setUpdateInterval(100);
        x_arr.push(accelerometerData.x);
        y_arr.push(accelerometerData.y);
        z_arr.push(accelerometerData.z);
        const x_sd = getStandardDeviation(x_arr);
        const y_sd = getStandardDeviation(y_arr);
        const z_sd = getStandardDeviation(z_arr);
        const sd = (x_sd + y_sd + z_sd) / 3;
        setData2(sd);
        // storeResult(sd);
      })
    );
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.stackedText}>
        Hold to chest for 10 seconds after clicking "Start!" while keeping one
        leg up in the air.
        {"\n"}{"\n"}
      </Text>

      <TouchableOpacity
        onPress={() => {
          if (!subscription) {
            setStarted(true);
          }
        }}
        style={styles.startCheckButton}
      >
        <Text
          style={styles.startCheckText}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {text}
        </Text>
      </TouchableOpacity>

      <View style={uiStyle.textContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Balance Test 1");
          }}
          style={[uiStyle.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BTFour;
