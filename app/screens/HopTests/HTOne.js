import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/HopTestsStyles/HTOneStyle';
import { useContext, useState } from "react";

import { AgeHopTestContext } from "../../components/GlobalContextProvider";

function HTOne({ navigation }) {
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
      <SafeAreaView style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Instructions</Text>
        <Text style={uiStyle.stackedText}>
          Read the instructions carefully before starting the test.{"\n"}
          {"\n"}
          Push 'Next' to navigate to the recording page, and hold the phone to
          your chest while recording. Count the number of hops.{"\n"}
          {"\n"}
          The vibration indicates that the recording has started and finished.
        </Text>

        <Text style={uiStyle.text}>Select age</Text>
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
      </SafeAreaView>

      <TouchableOpacity
        onPress={() => {
          setAgeHopTestContext(value);
          navigation.navigate("Hop Test Form");
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  
}


export default HTOne;
