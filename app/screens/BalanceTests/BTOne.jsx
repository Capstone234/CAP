import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';

import uiStyle from '../../components/uiStyle.jsx';

function BTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Instructions</Text>
          <Text style={uiStyle.stackedText}>
            This section consists of 2 tests with 2 recordings. Read the
            instructions carefully before starting each test.{'\n'}
            {'\n'}
            Push 'Next' to navigate to the recording page, and hold the phone to
            your chest while recording.{'\n'}
            {'\n'}
            The vibration indicates that the recording has finished.
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Balance Test 2');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.startCheckText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff0000';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
    top: 50,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
});

export default BTOne;
