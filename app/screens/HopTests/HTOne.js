import * as React from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ProgressBarAndroid
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/HopTestsStyles/HTOneStyle';
import ProgressBar from '../../styles/ProgressBar';

import { useContext, useState } from "react";

import { AgeHopTestContext } from "../../components/GlobalContextProvider";

import preventBackAction from '../../components/preventBackAction';

function HTOne({ navigation }) {

  preventBackAction();
  
  const [ageHopTestContext, setAgeHopTestContext] = useContext(AgeHopTestContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [ages, setAges] = useState([]);

  if (ages.length <= 0) {
    for (let i = 0; i < 100; i++) {
      ages.push({ label: i, value: i });
    }
    ages.push({ label: "99+", value: 100 });
  }

  return (
    <SafeAreaView style={uiStyle.container}>

      <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Instructions</Text>

     <View style={uiStyle.infoTextContainer}>
       <ScrollView style={uiStyle.stackedTextBox}>
        <Text style={uiStyle.stackedText}>
          Read the instructions carefully before starting the test.
          {"\n"}{"\n"}
          Push 'Next' to navigate to the recording page, and hold the phone to
          your chest while recording. Count the number of hops.
          {"\n"}{"\n"}
          The vibration indicates that the recording has started and finished.
        </Text>
      </ScrollView>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={uiStyle.text}>Select Age</Text>
        <DropDownPicker
          value={value}
          items={ages}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          defaultValue={value}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdown}
          dropDownDirection="TOP"
        />
      </View>

      <View style={uiStyle.bottomContainer}>
        <TouchableOpacity
          onPress={() => {
            setAgeHopTestContext(value);
            navigation.navigate("Hop Test Form");
          }}
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <Text style={[uiStyle.buttonLabelWhite, { flex: 1 }]}>Next</Text>
            <Ionicons name="arrow-forward-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HTOne;
