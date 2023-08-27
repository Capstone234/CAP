import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/ROW5VMS/VMS1Style';

function VMS1(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Visual Motion Sensitivity</Text>
        <ImageBackground style={styles.image} 
          source = {require('../../../../assets/b3.png')}>
        <ScrollView>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a fixed circle in the center of
            the screen.
            {'\n'}
            {'\n'}
            Ask them to hold the phone at eye level, keep arms straight, and
            keep eyes on the circle the entire time.
            {'\n'}
            {'\n'}
            On the beat, tell them to turn 80 degrees right, back to the middle,
            turn 80 degrees left, back to the middle. Repeat 5 times.
            {'\n'}
            {'\n'}
            Please ensure the sound is on.
          </Text>
        </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VMS 2');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VMS1;
