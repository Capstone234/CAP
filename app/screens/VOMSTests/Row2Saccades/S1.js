import * as React from 'react';
import { Text, TouchableOpacity, ScrollView, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S1Style';

import preventBackAction from '../../../components/preventBackAction';

function S1({ navigation }) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Saccades</Text>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
        <View style={uiStyle.infoTextContainer}>
          <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown two circles at either end of the
            screen.
            {'\n'}{'\n'}
            Ask the affected person to keep their head still and alternate looking
            at the left and right dot 10 times as quickly as possible.
            {'\n'}{'\n'}
            Please allow them to sit down and hold the phone landscape at eye
            level, an arms length away.
          </Text>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VOMS Saccades 2')}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default S1;
