import * as React from 'react';
import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/MemoryTestsStyles/MTOneStyle';
import ProgressBar from '../../styles/ProgressBar';

/**
 * The screen will be performed memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>
          <ProgressBar percentage={1} />

          <View style={{ alignItems: 'center' }}>
            <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Memory Test</Text>
          </View>

          <View style={uiStyle.infoTextContainer}>
          <ScrollView style={uiStyle.stackedTextBox}>
            <Text style={uiStyle.stackedText}>
              Welcome to the first memory test.
              {'\n'}{'\n'}
              The affected person will be presented with three images to remember.
              {'\n'}{'\n'}
              They will be tested on these images once now and then again at the end
              other assessments.
              {'\n'}{'\n'}
              Please pass the phone to the affected person.
            </Text>
          </ScrollView>
          </View>

          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Memory Test 2')}
              style={[styles.bottomButton, uiStyle.shadowProp]}
            >
              <Text style={uiStyle.buttonLabel}>Start!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
   </SafeAreaView>
  );
}

export default MTOne;
