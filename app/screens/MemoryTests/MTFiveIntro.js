import * as React from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/MemoryTestsStyles/MTFiveIntroStyle';
import ProgressBar from '../../styles/ProgressBar';

import preventBackAction from '../../components/preventBackAction';
/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTFiveIntro({ navigation }) {

  preventBackAction();

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={90} />

        <View style={{ alignItems: 'center' }}>
          <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Second Memory Test</Text>
        </View>

        <View style={uiStyle.infoTextContainer}>
          <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            On the following page the same checklist will be presented
            with the selections for the images presented in the beginning.
            {'\n'}{'\n'}
            Please pass the phone to the supervisor to enter the images the
            injured individual remembers.
          </Text>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Memory Test 5')}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default MTFiveIntro;
