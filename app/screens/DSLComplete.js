import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';

import { useContext } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/DSLCompleteScreenStyle';

function DSLComplete({ navigation }) {

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Daily Symptom Log Complete</Text>
          <Text style={uiStyle.stackedText}>
            You have successfully submitted your Daily Sympton Checkist,
            please refer to action plan for further steps.

          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home Page');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Return to Home</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default DSLComplete;
