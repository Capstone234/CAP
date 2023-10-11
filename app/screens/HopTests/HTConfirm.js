import * as React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ImageBackground
} from "react-native";
import { useContext, useState, useEffect } from 'react';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/HopTestsStyles/HTConfirmStyle';

import preventBackAction from '../../components/preventBackAction';

function HTConfirm({ route, navigation }) {

  preventBackAction();
  
  const [hops, onChangedHops] = useState('');
  const hopTestRoute = route.params;
  var hopTestPreFormResult = Object.values(hopTestRoute)[0]

  const createAlert = (message) => {
    Alert.alert("Alert", message, [
      {
        text: "Ok"
      },
    ]);
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
        source = {require('../../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Hop Test Confirmation</Text>
          <Text style={uiStyle.stackedText}>Enter the number of hops</Text>
          <SafeAreaView style={styles.inputAreaContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangedHops}
              value={hops}
              placeholder="Hops"
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          if (hops) {
            var digitsPattern = /^\d*$/
            if (digitsPattern.test(hops)) {
              var hopsInt = parseInt(hops);
              navigation.navigate("Hop Test Form 2", {hopTestPreForm:hopTestPreFormResult, hopTestCount:hopsInt});
            }
            else {
              createAlert("Please enter whole numbers only")
            }
          }
          else {
            createAlert("Enter the number of hops")
          }

        }}
        style={[uiStyle.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HTConfirm;
