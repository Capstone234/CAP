import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  View,
} from 'react-native';

import uiStyle from '../components/uiStyle';

function NextStepsScreen({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Next Steps</Text>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          At this stage, the affected individual presents no symptoms
          necessitating hospitalisation.
          {'\n'} {'\n'}
          However, if they do develop any of the previous symptoms, immediately
          call for an ambulance or take them to hospital.
          {'\n'} {'\n'}
          The next tests will help further assess the severity of injury.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Mechanism Of Injury Check')}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const title = '#000000';
const background = '#fff';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
  normalText1: {
    color: title,
    fontSize: 20,
    position: 'absolute',
    left: 30,
    right: 30,
    top: 150,
    fontWeight: 'bold',
  },
  normalText2: {
    color: title,
    fontSize: 20,
    position: 'absolute',
    left: 30,
    right: 30,
    top: 350,
    fontWeight: 'bold',
  },
  startButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: 450,
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default NextStepsScreen;
