import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import uiStyle from '../../styles/uiStyle';
import cbStyle from '../../components/checkboxStyle';
import styles from '../../styles/A_WptasStyles/A_Wptas2Style'

import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../../components/GlobalContextProvider';

/**
 *
 */
function A_Wptas2({ navigation }) {
  const [, setReportId] = useContext(ReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  const MyCheckbox = (props) => {
    const [checked, onChange] = useState(false);

    function onCheckmarkPress() {
      onChange(!checked);
      onUpdate(props.value);
    }

    return (
      <Pressable
        style={[cbStyle.checkboxBase, checked && cbStyle.checkboxChecked]}
        onPress={onCheckmarkPress}
      >
        {checked && <Ionicons name="checkmark" size={24} color="black" />}
      </Pressable>
    );
  };

  function onUpdate(name) {
    let i = chosenList.indexOf(name);
    if (i === -1) {
      chosenList.push(name);
    } else {
      chosenList.splice(i, 1);
    }
    return chosenList;
  }
  const chosenList = [];

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={styles.headingText}>
        Ask the patient to verbally answer these questions
      </Text>
      <Text style={styles.subheadingText}>
        Did the patient correctly answer these question?
      </Text>
      <ScrollView>
        <SafeAreaView style={cbStyle.allCheckboxContainer}>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_name' accessible={true} accessibilityLabel={'patient_name'} label='patient_name' value="What is your name?" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`What is your name?`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_where' accessible={true} accessibilityLabel={'patient_where'} label='patient_where' value="Where are you at the moment?" />
            <Text style={cbStyle.checkboxLabel}>{`Where are you at the moment?`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_why' accessible={true} accessibilityLabel={'patient_why'} label='patient_why' value="Why are you here?" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Why are you here?`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='what_month' accessible={true} accessibilityLabel={'what_month'} label='what_month' value="What month is it?" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`What month is it?`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='what_year' accessible={true} accessibilityLabel={'what_year'} label='what_year' value="What year is it?" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`What year is it?`}</Text>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('A-WPTAS 3')}
        style={[styles.bottomButton, styles.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>

      </TouchableOpacity>

    </SafeAreaView>
  );
}

export default A_Wptas2;
