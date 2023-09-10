import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';

import { useContext } from 'react';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTOneStyle';

function BTOne({ navigation }) {

  return (
    <SafeAreaView style={uiStyle.container}>
       <ImageBackground style={styles.image} 
        source = {require('../../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Balance Test</Text>
          <Text style={uiStyle.stackedText}>
            This section consists of 2 tests with 2 recordings. Read the
            instructions carefully before starting each test.{'\n'}
            {'\n'}
            Push 'Next' to navigate to the recording page, and hold the phone to
            your chest while recording.{'\n'}
            {'\n'}
            The vibration indicates that the recording has finished.
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity testID='button' accessible={true} accessibilityLabel={'button'} label='button'
        onPress={() => {
          navigation.navigate('Balance Test 2');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTOne;
