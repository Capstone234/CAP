import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ProgressBarAndroid,
} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/ReactionTestsStyles/RTOneStyle';
import ProgressBar from '../../styles/ProgressBar';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function RTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>
          <ProgressBar percentage={17} />

          <View style={{ alignItems: 'center' }}>
            <Text style={uiStyle.titleText}>Reaction Test</Text>
          </View>

          <ScrollView>
              <Text style={uiStyle.stackedText}>
                On the next screen, there will be a green start
                button. Press anywhere to start.
                {'\n'}{'\n'}
                A blue circle will be presented which turns orange after a
                period of time. You should press the button as soon as it
                turns orange.
                {'\n'}{'\n'}
                Your reaction time will be recorded, and the test will run
                three times.
              </Text>
          </ScrollView>

          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Reaction Test 2')}
              style={[styles.bottomButton, uiStyle.shadowProp]}
            >
              <Text style={uiStyle.buttonLabel}>Next</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default RTOne;
