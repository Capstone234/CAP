import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S1Style';

function S1({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Saccades</Text>
      <ImageBackground style={styles.image} 
          source = {require('../../../../assets/b3.png')}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          The affected person will be shown two circles at either end of the
          screen.
          {'\n'} {'\n'}
          Ask the affected person to keep their head still and alternate looking
          at the left and right dot 10 times as quickly as possible.
          {'\n'}
          {'\n'}
          Please allow them to sit down and hold the phone landscape at eye
          level, an arms length away.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('VOMS Saccades 2')}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default S1;
