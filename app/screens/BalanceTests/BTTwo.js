import * as React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Vibration,
  Dimensions
} from "react-native";
import { Accelerometer } from "expo-sensors";

import uiStyle from "../../components/uiStyle";
import { useContext, useState, useEffect } from "react";
import { dataContext, PrelimReportIdContext, PreliminaryReportRepoContext, MedicalReportRepoContext } from "../../components/GlobalContextProvider";
import getStandardDeviation from "../../model/standardDeviation";
import { useIsFocused } from "@react-navigation/native";

function BTTwo({ navigation }) {
  const [text, setText] = useState("Start!");
  const startedText = () => setText("Recording!");
  const readyText = () => setText("Ready!");
  const resetText = () => setText("Start!");
  const [data, setData] = useContext(dataContext);
  const [subscription, setSubscription] = useState(null);
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);

  const x_arr = [];
  const y_arr = [];
  const z_arr = [];
  var startTimer = null;
  var endTimer = null;
  const [started, setStarted] = useState(false);
  const focussed = useIsFocused();

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
            // storeResult(data);
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
      storeResult(data);
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
    medicalReportRepoContext.updateBalanceTest1Result(prelimReportId,variation,deviation);
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>console.log(data));

    var result = "FAIL";
    if (deviation < 0.2 && variation < 0.05) {
      result = "PASS";
    }

    if(result == "FAIL"){
      preliminaryReportRepoContext.updateBalanceTest1Result(prelimReportId,0);
    }
    else{
      preliminaryReportRepoContext.updateBalanceTest1Result(prelimReportId,1);
    }

    preliminaryReportRepoContext.getCurrentReportInformation(prelimReportId).then(data => console.log(data));

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
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const title = "#000000";
const styles = StyleSheet.create({
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#69C93C",
  },
  startCheckText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/15,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
});

export default BTTwo;
