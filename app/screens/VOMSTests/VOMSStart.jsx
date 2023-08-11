import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import uiStyle from '../../components/uiStyle';

function VOMSStart({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>VOMS Instructions</Text>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          The affected person will now be doing a series of tests that track
          their eye movements.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('VOMS Initial Symptoms')}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VOMSStart;
