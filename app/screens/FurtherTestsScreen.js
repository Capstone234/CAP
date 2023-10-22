import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';

import uiStyle from '../styles/uiStyle';
import styles from '../styles/FurtherTestScreenStyle'

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function FurtherTests({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <Text  style={[uiStyle.titleText, uiStyle.titleTextBox]}>Preliminary Tests</Text>
        <ImageBackground style={styles.image}
            source = {require('../../assets/b3.png')}>
          <View style={uiStyle.infoTextContainer}>
              <ScrollView style={uiStyle.stackedTextBox}>
                <Text style={uiStyle.stackedText}>
                  There are 6 more tests that will determine the likelihood of the
                  affected person having a concussion
                  {'\n'}{'\n'}
                  The tests consists of two memory tests, at the start and again at the
                  end, a verbal test, a reaction test, a balance test and a hop test.
                  {'\n'}{'\n'}
                  Press Start to begin the tests.
                </Text>
              </ScrollView>
          </View>


          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Continue Tests', {screen: 'Memory Test 1'})
              }}
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
export default FurtherTests;
