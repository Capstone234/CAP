import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/ROW5VMS/VMS1Style';
import preventBackAction from '../../../components/preventBackAction';

function VMS1(props) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text
        style={[uiStyle.titleText, uiStyle.titleTextBox]}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Visual Motion Sensitivity
      </Text>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
        <View style={uiStyle.infoTextContainer}>
          <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a fixed circle in the center of
            the screen.
            {'\n'}{'\n'}
            Ask them to hold the phone at eye level, keep arms straight, and
            keep eyes on the circle the entire time.
            {'\n'}{'\n'}
            On the beat, tell them to turn 80 degrees right, back to the middle,
            turn 80 degrees left, back to the middle. Repeat 5 times.
            {'\n'}{'\n'}
            Please ensure the sound is on.
          </Text>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('VOMS VMS 2');
            }}
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <Text style={[uiStyle.buttonLabelWhite, { flex: 1 }]}>Next</Text>
            <Ionicons name="arrow-forward-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VMS1;
