import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import uiStyle from '../../../components/uiStyle';

function S1({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Saccades</Text>
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
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default S1;
