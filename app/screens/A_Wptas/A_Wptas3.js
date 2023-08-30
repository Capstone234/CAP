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
import styles from '../../styles/RedFlagsWptasChecklistScreenStyle';

import {
  //Import the code we need. eg this now uses MedicalReportRepoContext
  //so we got to import that for the DB functionality.
  IncidentReportRepoContext,
  ReportIdContext,
  PrelimReportIdContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';

/**
 *
 */
function A_Wptas3({ navigation }) {
  //Have to define the context as a constant within the function that defines
  //this page.
  const [, setReportId] = useContext(ReportIdContext);
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

  async function handleSubmitPress() {
    //Simply uses the chosenList[i] to get the values held in chosenList.
    //Uses the prelimReportIdContext to get the prelim report id which is
    //established earlier in the application somewhere.
    try {
      await medicalReportRepoContext.updateAWptasSymptomA(prelimReportId, chosenList[0].value);
      await medicalReportRepoContext.updateAWptasSymptomB(prelimReportId, chosenList[1].value);
      await medicalReportRepoContext.updateAWptasSymptomC(prelimReportId, chosenList[2].value);
      await medicalReportRepoContext.updateAWptasSymptomD(prelimReportId, chosenList[3].value);
      console.log(`${chosenList[0].value}${chosenList[1].value}${chosenList[2].value}${chosenList[3].value}} inserted into the database.`);
    } catch (error) {
      console.error(`Error inserting ${chosenList[0].value}${chosenList[1].value}${chosenList[2].value}${chosenList[3].value}:`, error);
    }

//    if (chosenList.length === 0) {
//      navigation.navigate('Reaction Test 1');
//    }

    // TODO
    // if any box checked (go emergency)
    // if no box check BUT not all 5 checked on page 2 (go emergency)

    navigation.navigate('Check Result');

  }


  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={styles.headingText}>
        Patient Demeanor Check
      </Text>
      <Text style={styles.subheadingText}>
        Were any of the following issues presented while asking these questions?
      </Text>
      <ScrollView>
        <SafeAreaView style={cbStyle.allCheckboxContainer}>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_confused' accessible={true} accessibilityLabel={'patient_confused'} label='patient_confused' value="The person seemed confused or unsure of how to answer" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person seemed confused or unsure of how to answer`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_random_words' accessible={true} accessibilityLabel={'patient_random_words'} label='patient_random_words' value="The person was saying random words which did not appropriately respond to the questions" />
            <Text style={cbStyle.checkboxLabel}>{`The person was saying random words which did not appropriately respond to the questions`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_incomprehensible' accessible={true} accessibilityLabel={'patient_incomprehensible'} label='patient_incomprehensible' value="The person was making incomprehensible sounds" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person was making incomprehensible sounds`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='patient_no_response' accessible={true} accessibilityLabel={'patient_no_response'} label='patient_no_response' value="The person was not able to respond at all" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person was not able to respond at all`}</Text>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={handleSubmitPress}

  //        onPress={() => {
  ////          incidentRepoContext.createReport(null).then((id) => {
  ////
  ////            // Update ReportId context;
  ////            setReportId(id);
  ////
  ////            // Create MultiResponse in db
  ////            const desc = 'Red Flags';
  ////            incidentRepoContext
  ////              .setMultiResponse(id, desc, chosenList)
  ////              .catch(console.log);
  ////          });
  //
  //            // navigates to next page, depending on result
  //            // should be the name value from App.js of RootStack.Screen
  //
  //            // if any box checked (go emergency)
  //            // if no box check BUT not all 5 checked on page 2 (go emergency)
  //          if (chosenList.length === 0) {
  //            navigation.navigate('Reaction Test 1');
  //          } else {
  //            navigation.navigate('Check Result');
  //          }
  //        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default A_Wptas3;
