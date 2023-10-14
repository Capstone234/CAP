import * as React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ProgressBar
} from "react-native";

import uiStyle from '../../styles/uiStyle';
import ProgressBar from '../../styles/ProgressBar';

import preventBackAction from '../../components/preventBackAction';

function HTAgeForm({ navigation }) {

  preventBackAction();
  
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>

          <Text style={uiStyle.titleText}>Instructions</Text>
          <Text style={uiStyle.stackedText}>
            Read the instructions carefully before starting the test.{"\n"}
            {"\n"}
            Push 'Next' to navigate to the recording page, and hold the phone to
            your chest while recording.{"\n"}
            {"\n"}
            The vibration indicates that the recording has started and finished.
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Hop Test 2");
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HTAgeForm;
