import * as React from "react";
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
  Alert,
  ImageBackground
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <View style={uiStyle.container}>
          <Text
            style={uiStyle.titleText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Hop Test Confirmation
          </Text>
          <Text style={uiStyle.stackedText}>Enter the number of hops</Text>

          <View style={styles.inputAreaContainer}>
            <TextInput
              style={styles.input}
              onChangeText={onChangedHops}
              value={hops}
              placeholder="Hops"
              keyboardType="number-pad"
              returnKeyType="done"
            />
          </View>
        </View>

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
