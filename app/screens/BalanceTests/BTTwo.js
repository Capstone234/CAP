import * as React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import { Accelerometer } from "expo-sensors";

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTTwoStyle';

import { useContext, useState, useEffect } from "react";
import { IncidentReportRepoContext, UserContext, UserRepoContext, IncidentIdContext, dataContext} from "../../components/GlobalContextProvider";
import getStandardDeviation from "../../model/standardDeviation";
import { useIsFocused } from "@react-navigation/native";

import preventBackAction from '../../components/preventBackAction';

function BTTwo({ navigation }) {

  preventBackAction();

  const [text, setText] = useState("Start!");
  const startedText = () => setText("Recording!");
  const readyText = () => setText("Ready!");
  const resetText = () => setText("Start!");
  const [data, setData] = useContext(dataContext);
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
        readyText()
        startTimer = setTimeout(() => {
          Vibration.vibrate();
          _subscribe();
          startedText();
          endTimer = setTimeout(() => {
            Accelerometer.removeAllListeners();
            Vibration.vibrate();
            setSubscription(null);
            resetText();
            storeResult(data);
            navigation.navigate("Balance Test Complete");
          }, 10000);
        }, 1000);
      } else {
        return () => {};
      }
    }
    return () => {
      Accelerometer.removeAllListeners();
      setSubscription(null);
      setStarted(false)
      // storeResult(data);
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      clearInterval(startTimer, endTimer);
      clearImmediate(startTimer, endTimer);
      window.clearInterval(startTimer, endTimer);
    };
  }, [focussed, started]);

  const storeResult = (info) => {
    var variation = Math.round(Math.pow(info, 2) * 1000) / 1000;
    var deviation = Math.round(info * 1000) / 1000;
    console.log(variation);
    console.log(deviation);

    var result = 0;
    if (deviation < 0.2 && variation < 0.05) {
      result = 1;
    }

    incidentReportRepoContext.setBalance(user.uid, incidentId, variation, deviation, null, null, result, null);
    incidentReportRepoContext.incrementTestStage(incidentId);
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
        // console.log("x: " + accelerometerData.x + " y:" + accelerometerData.y + " z:" + accelerometerData.z);
        // console.log("x_sd: " + x_sd + " y_sd:" + y_sd + " z_sd:" + z_sd);
        // console.log("sd:" + sd);
        // console.log("\n");
        setData(sd);
        // storeResult(sd);

        //Logic for storing result in table




      })
    );
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.stackedText}>
        Hold to chest for 10 seconds after clicking "Start!" while keeping one
        foot in front of the other {"\n"}
        {"\n"}
      </Text>
      <TouchableOpacity testID='pressButton' accessible={true} accessibilityLabel={'pressButton'} label='pressButton'
        onPress={() => {
          if (!subscription) {
            setStarted(true);
          }
        }}
        style={styles.startCheckButton}
      >
        <Text style={styles.startCheckText}>{text}</Text>
      </TouchableOpacity>
      <View style={uiStyle.textContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Balance Test 1");
            console.log('Navigation to "Balance Test 1" executed.');
          }}
          style={[uiStyle.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BTTwo;
