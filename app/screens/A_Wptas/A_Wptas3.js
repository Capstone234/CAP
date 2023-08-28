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
import styles from '../../styles/RedFlagsWptasChecklistScreenStyle';

import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../../components/GlobalContextProvider';

/**
 *
 */
function A_Wptas3({ navigation }) {
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
        onPress={() => {
//          incidentRepoContext.createReport(null).then((id) => {
//
//            // Update ReportId context;
//            setReportId(id);
//
//            // Create MultiResponse in db
//            const desc = 'Red Flags';
//            incidentRepoContext
//              .setMultiResponse(id, desc, chosenList)
//              .catch(console.log);
//          });

            // navigates to next page, depending on result
            // should be the name value from App.js of RootStack.Screen

            // if any box checked (go emergency)
            // if no box check BUT not all 5 checked on page 2 (go emergency)
          if (chosenList.length === 0) {
            navigation.navigate('Reaction Test 1');
          } else {
            navigation.navigate('Check Result');
          }
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default A_Wptas3;
