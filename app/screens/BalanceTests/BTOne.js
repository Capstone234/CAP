import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useContext } from 'react';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTOneStyle';
import ProgressBar from '../../styles/ProgressBar';

function BTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={33} />

        <View style={{ alignItems: 'center' }}>
          <Text style={uiStyle.titleText}>Balance Test</Text>
        </View>

        <ScrollView>
            <Text style={uiStyle.stackedText}>
              This section consists of 2 tests with 2 recordings. Read the
              instructions carefully before starting each test.
              {'\n'}{'\n'}
              Push 'Next' to navigate to the recording page, and hold the phone to
              your chest while recording.
              {'\n'}{'\n'}
              The vibration indicates that the recording has finished.
            </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity testID='button' accessible={true} accessibilityLabel={'button'} label='button'
            onPress={() => {
              navigation.navigate('Balance Test 2');
            }}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTOne;
