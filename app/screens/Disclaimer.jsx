import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import uiStyle from '../components/uiStyle';

function Disclaimer({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          This App does not represent a substitute for expert medical attention.
          {'\n'} {'\n'}
          You must not rely on the information on this App as an alternative to
          medical advice from your doctor or other professional healthcare
          provider.
          {'\n'} {'\n'}
          We strongly recommend that you consult your own physician or another
          available health professional regarding any diagnosis, findings,
          interpretation or course of treatment.
        </Text>
        <SafeAreaView style={uiStyle.contentContainerCentered}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Voms Start')}
            onPress={() => navigation.navigate('Home')}
            style={[uiStyle.bottomButton]}
          >
            <Text style={uiStyle.buttonLabel}>I understand</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Disclaimer;
