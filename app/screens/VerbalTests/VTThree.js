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
import cbStyle from '../../components/bigcheckboxStyle';
import styles from '../../styles/RedFlagsVTChecklistScreenStyle';

import {
  //Import the code we need. eg this now uses MedicalReportRepoContext
  //so we got to import that for the DB functionality.
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../components/GlobalContextProvider';

/**
 *
 */
function VTThree({ navigation, route }) {
  //Have to define the context as a constant within the function that defines
  //this page.
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { chosenList1 } = route.params;
  console.log(chosenList1)

  const MyCheckbox = (props) => {
    const [checked, onChange] = useState(false);

    useEffect(() => {
      //this useeffect is to intialise the 'chosenList' array as a array that
      //already contains all the default value at -1 for each of the checkbox
      //names. Without this it was starting as an empty array that only added
      //values when the checkbox got clicked.
      //I *think* it works by going through the html/css stuff below to get
      //the names and then just sets default -1 for the value.
    const existingItem = chosenList2.find(item => item.name === props.value);
    if (!existingItem) {
      chosenList2.push({ name: props.value, value: 0 });
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
        {checked && <Ionicons name="checkmark" size={28} color="white" />}
      </Pressable>
    );
  };

  function onUpdate(name) {
    //this defines what happens when the checkbox gets updated with a click.
    //also logs the change. index is pulled from the html/css below i believe.
    let i = chosenList2.findIndex(item => item.name === name);
    console.log('Updating Chosen List:', chosenList2[i].name);
    if (i !== -1) {
      chosenList2[i].value = chosenList2[i].value === 0 ? 1 : 0; // Toggle between 1 and -1
      console.log('New value:', chosenList2[i].value);
    }
  }
  const chosenList2 = [];

  async function fetchVerbalTest(uid, iid) {
    try {
      const verbalTest = await incidentReportRepoContext.getVerbalTest(uid, iid);
      console.log(verbalTest);
    } catch (error) {
      console.error('Error fetching verbal test:', error);
    }
  }

  async function handleSubmitPress() {
    //Simply uses the chosenList[i] to get the values held in chosenList.
    //Uses the prelimReportIdContext to get the prelim report id which is
    //established earlier in the application somewhere.
    //use chosenList1 from the previous page for the other ones.
    var pass = 0;
    const correctAnswers = chosenList1.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
    }, 0);
    console.log(correctAnswers)
    const symptoms = chosenList2.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.value;
    }, 0);
    console.log(symptoms)
    if (correctAnswers == 5 && symptoms == 0) {
      pass = 1;
    }
    try {
      await incidentReportRepoContext.setVerbalTest(user.uid, incidentId,
                            chosenList1[0].value, chosenList1[1].value, chosenList1[2].value,
                            chosenList1[3].value, chosenList1[4].value, chosenList2[0].value,
                            chosenList2[1].value, chosenList2[2].value, chosenList2[3].value, pass);
    } catch (error) {
          console.error('Error while setting verbal test:', error);
        }
    await fetchVerbalTest(user.uid, incidentId)
    if (pass == 0) {
      navigation.navigate('Check Result');
    }
    else {
      incidentReportRepoContext.incrementTestStage(incidentId)
      navigation.navigate('PCSS Checklist'); // Go to PCSS test
    }
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
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person seemed confused or unsure of how to answer`}</Text>
            <MyCheckbox testID='patient_confused' accessible={true} accessibilityLabel={'patient_confused'} label='patient_confused' value="The person seemed confused or unsure of how to answer" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text style={cbStyle.checkboxLabel}>{`The person was saying random words which did not appropriately respond to the questions`}</Text>
            <MyCheckbox testID='patient_random_words' accessible={true} accessibilityLabel={'patient_random_words'} label='patient_random_words' value="The person was saying random words which did not appropriately respond to the questions" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person was making incomprehensible sounds`}</Text>
            <MyCheckbox testID='patient_incomprehensible' accessible={true} accessibilityLabel={'patient_incomprehensible'} label='patient_incomprehensible' value="The person was making incomprehensible sounds" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`The person was not able to respond at all`}</Text>
            <MyCheckbox testID='patient_no_response' accessible={true} accessibilityLabel={'patient_no_response'} label='patient_no_response' value="The person was not able to respond at all" />
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={handleSubmitPress}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VTThree;
