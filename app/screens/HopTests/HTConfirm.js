import * as React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  ImageBackground
} from "react-native";
import { useContext, useState, useEffect } from 'react';

import uiStyle from "../../components/uiStyle";

function HTConfirm({ route, navigation }) {
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
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputAreaContainer: {
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
    marginBottom: (Dimensions.get('window').height),
    marginTop: (Dimensions.get('window').height)/45,
  },
  input: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').width / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: (Dimensions.get('window').height) / 80,
    marginTop: (Dimensions.get('window').height) / 80,
    borderRadius: 20,
    padding: Dimensions.get('window').width / 50,
    backgroundColor: '#FFFFFF',
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/3.5,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default HTConfirm;
