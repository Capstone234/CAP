import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ProgressBarAndroid

} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/MemoryTestsStyles/MTThreeStyle';
import ProgressBar from '../../styles/ProgressBar';

import preventBackAction from '../../components/preventBackAction';
/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTThree({ navigation }) {

  preventBackAction();

  return (
    <View style={uiStyle.container}>
      <ImageBackground style={styles.image}
        source = {require('../../../assets/b3.png')}>

        <ProgressBar percentage={8} />

      <View style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Instructions</Text>
        <Text style={uiStyle.stackedText}>
          Please pass the phone to your supervisor so they can input the
          results.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Memory Test 4')}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}

export default MTThree;
