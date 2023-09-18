import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';

import { useContext } from 'react';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTCompleteStyle';
import ProgressBar from '../../styles/ProgressBar';

function BTComplete({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
      <ProgressBar percentage={57} />

      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Balance Test Complete</Text>
          <Text style={uiStyle.stackedText}>
            You have successfully completed the first balance test. Press next
            to continue to the second balance test. 
            
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Balance Test 4');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp, {marginBottom: 350}]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete;
