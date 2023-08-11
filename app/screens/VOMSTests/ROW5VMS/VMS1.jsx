import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function VMS1(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.contentContainerCentered}>
        <Text style={uiStyle.titleText}>Visual Motion Sensitivity</Text>
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
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VMS 2');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VMS1;
