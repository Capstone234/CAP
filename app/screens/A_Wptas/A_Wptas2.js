import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import uiStyle from '../../styles/uiStyle';
import cbStyle from '../../components/checkboxStyle';
import styles from '../../styles/RedFlagsWptasChecklistScreenStyle'

import {
  IncidentReportRepoContext,
  PrelimReportIdContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';

/**
 *
 */
function A_Wptas2({ navigation }) {
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);
  const MyCheckbox = (props) => {
    const [checked, onChange] = useState(false);

    useEffect(() => {
    const existingItem = chosenList.find(item => item.name === props.value);
    if (!existingItem) {
      chosenList.push({ name: props.value, value: -1 });
    }
  }, []);

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
  let i = chosenList.findIndex(item => item.name === name);
  console.log('Updating Chosen List:', chosenList[i].name);
  if (i !== -1) {
    chosenList[i].value = chosenList[i].value === -1 ? 1 : -1; // Toggle between 1 and -1
    console.log('New value:', chosenList[i].value);
  }
}

  const chosenList = [];

  async function handleNextPress() {
    //console.log('Chosen List:', chosenList);
    try {
      await medicalReportRepoContext.updateAWptasAnswerA(prelimReportId, chosenList[0].value);
      await medicalReportRepoContext.updateAWptasAnswerB(prelimReportId, chosenList[1].value);
      await medicalReportRepoContext.updateAWptasAnswerC(prelimReportId, chosenList[2].value);
      await medicalReportRepoContext.updateAWptasAnswerD(prelimReportId, chosenList[3].value);
      await medicalReportRepoContext.updateAWptasAnswerE(prelimReportId, chosenList[4].value);
      console.log(`${chosenList[0].value}${chosenList[1].value}${chosenList[2].value}${chosenList[3].value}${chosenList[4].value} inserted into the database.`);
    } catch (error) {
      console.error(`Error inserting ${chosenList[0].value}${chosenList[1].value}${chosenList[2].value}${chosenList[3].value}${chosenList[4].value}:`, error);
    }

    navigation.navigate('A-WPTAS 3');
  }

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
        onPress={handleNextPress}
        style={[styles.bottomButton, styles.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>

      </TouchableOpacity>

    </SafeAreaView>
  );
}

export default A_Wptas2;
