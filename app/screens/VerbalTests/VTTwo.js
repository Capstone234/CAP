import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ProgressBarAndroid
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import uiStyle from '../../styles/uiStyle';
import cbStyle from '../../components/checkboxStyle';
import styles from '../../styles/RedFlagsVTChecklistScreenStyle'
import ProgressBar from '../../styles/ProgressBar';

import {
  //Import the code we need. eg this now uses MedicalReportRepoContext
  //so we got to import that for the DB functionality.
  IncidentReportRepoContext,
  PrelimReportIdContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';

/**
 *
 */
function VTTwo({ navigation }) {
  //Have to define the context as a constant within the function that defines
  //this page.
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);

  const MyCheckbox = (props) => {
    const [checked, onChange] = useState(false);

    useEffect(() => {
      //this useeffect is to intialise the 'chosenList' array as a array that
      //already contains all the default value at -1 for each of the checkbox
      //names. Without this it was starting as an empty array that only added
      //values when the checkbox got clicked.
      //I *think* it works by going through the html/css stuff below to get
      //the names and then just sets default -1 for the value.
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
    //this defines what happens when the checkbox gets updated with a click.
    //also logs the change. index is pulled from the html/css below i believe.
  let i = chosenList.findIndex(item => item.name === name);
  console.log('Updating Chosen List:', chosenList[i].name);
  if (i !== -1) {
    chosenList[i].value = chosenList[i].value === -1 ? 1 : -1; // Toggle between 1 and -1
    console.log('New value:', chosenList[i].value);
  }
}

  const chosenList = [];

  async function handleNextPress() {

    // Create new Medical Report with the same ID as prelimReportId
    // (code originally from MTTwo, moved here when Verbal Test was moved)
    medicalReportRepoContext.createMedicalReport(prelimReportId,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10);

    //This ugly thing runs all the sql running functions in medicalReportRepo.
    // I would like a more elegant solution but oh well.
    // Simply uses the chosenList[i] to get the values held in chosenList.
    // Uses the prelimReportIdContext to get the prelim report id which is
    // established earlier in VTOne.
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
    //We call this function below when we press the button so the navigation
    //has been incorporated into here and where the navigation previously was
    //is replaced with a call of this function.
    navigation.navigate('Verbal Test 3');
  }

  return (
    <SafeAreaView style={uiStyle.container}>

      <Text style={styles.headingText}>
        Ask the patient to verbally answer these questions
      </Text>

      <Text style={styles.subheadingText}>
        Did the patient correctly answer these questions?
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

export default VTTwo;
