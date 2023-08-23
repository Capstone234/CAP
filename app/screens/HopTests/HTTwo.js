import * as React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Vibration,
  Alert,
  Dimensions
} from "react-native";
import { Accelerometer } from "expo-sensors";

import uiStyle from "../../components/uiStyle";
import { useContext, useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";

import { AgeHopTestContext } from "../../components/GlobalContextProvider";

function HTTwo({ route, navigation }) {
  const [ageHopTestContext] = useContext(AgeHopTestContext);
  const [text, setText] = useState("Start!");
  const startedText = () => setText("Recording!");
  const readyText = () => setText("Ready!");
  const resetText = () => setText("Start!");
  const [subscription, setSubscription] = useState(null);
  const hopTestRoute = route.params;
  var hopTestPreFormResult = Object.values(hopTestRoute)[0]


  var startTimer = null;
  var endTimer = null;
  const [started, setStarted] = useState(false);
  const focussed = useIsFocused();
  var hopCnt = 0;
  
  const createAlert = () => {
    var message = "Did you hop " + hopCnt
    if (hopCnt == 1) {
      message += " time?"
    }
    else {
      message += " times?"
    }
    Alert.alert("Alert", message, [
      {
        text: "Yes",
        onPress: () => navigation.navigate("Hop Test Form 2", {hopTestPreForm:hopTestPreFormResult, hopTestCount:hopCnt}),
      },
      {
        text: "No",
        onPress: () => navigation.navigate("Hop Test Confirm", {hopTestPreForm:hopTestPreFormResult}),
      },
    ]);
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
            // storeResult(data);
            console.log("Hops: " + hopCnt);
            createAlert()
            // navigation.navigate("Hop Test Complete");
          }, 15000);
        }, 1000)
      } else {
        return () => {};
      }
    }
    return () => {
      Accelerometer.removeAllListeners();
      setSubscription(null);
      setStarted(false)
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      clearInterval(startTimer, endTimer);
      clearImmediate(startTimer, endTimer);
      window.clearInterval(startTimer, endTimer);
    };
  }, [focussed, started]);

  const _subscribe = () => {
    var sameHop = false;
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        Accelerometer.setUpdateInterval(100);

        if (accelerometerData.y > 2.05) { 
          if (!sameHop) {
            hopCnt += 1;
            // console.log("hop" + " " + "y: " + accelerometerData.y);
          }
          sameHop = true;
          
        }
        else {
          sameHop = false;
        }
      
      })
    );
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.stackedText}>
        Hold the phone to your chest and click "Start!". Upon the vibration, begin hopping on your
        dominant foot (i.e. the foot you would usually kick a ball with) for 15 seconds. {"\n"}
        {"\n"}
      </Text>
      <TouchableOpacity testID='btn' accessible={true} accessibilityLabel={'btn'} label='btn'
        onPress={() => {
          if (!subscription) {
            setStarted(true);
            clearInterval(startTimer, endTimer);
          }
        }}
        style={styles.startCheckButton}
      >
        <Text style={styles.startCheckText}>{text}</Text>
      </TouchableOpacity>
      <View style={uiStyle.textContainer}>
        <TouchableOpacity testID='btn2' accessible={true} accessibilityLabel={'btn2'} label='btn2'
          onPress={() => {
            navigation.navigate("Hop Test 1");
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const text = "#fff";
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
    color: text,
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
    marginBottom: (Dimensions.get('window').height)/40,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});

export default HTTwo;
