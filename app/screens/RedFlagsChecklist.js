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
import uiStyle from '../styles/uiStyle';
import cbStyle from '../components/checkboxStyle';
import styles from '../styles/RedFlagsVTChecklistScreenStyle';

import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../components/GlobalContextProvider';

/**
 * The screen will ask user for details about concussion in checklist form.
 */

function RedFlagsChecklist({ navigation }) {
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

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

  // Initialize an array of length 10 with zeros
  const chosenList = new Array(10).fill(0);

  // Function to toggle values from 0 to 1
  function onUpdate(index) {
  // Check if the index is valid
    if (index >= 0 && index < chosenList.length) {
      chosenList[index] = chosenList[index] === 0 ? 1 : 0;
    }
    return chosenList;
  }

  //debug function to confirm that the db got updated
  async function fetchIncidents(uid) {
    try {
      const incidents = await incidentReportRepoContext.getIncidents(uid);
      console.log(incidents);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  }

  async function fetchRedFlag(uid, iid) {
    try {
      const redFlags = await incidentReportRepoContext.getRedFlag(uid, iid);
      console.log(redFlags);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  }


  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={styles.headingText}>
        Red Flag Checklist
      </Text>
      <Text style={styles.subheadingText}>
        Are any of the following symptoms present? Select all that apply.
      </Text>
      <ScrollView>
        <SafeAreaView style={cbStyle.allCheckboxContainer}>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='neck_pain' accessible={true} accessibilityLabel={'neck_pain'} label='neck_pain' value="0" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Neck pain or tenderness`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='double_vision' accessible={true} accessibilityLabel={'double_vision'} label='double_vision' value="1" />
            <Text style={cbStyle.checkboxLabel}>{`Double vision`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='weakness_tingling' accessible={true} accessibilityLabel={'weakness_tingling'} label='weakness_tingling' value="2" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Weakness or tingling/burning in the arms or legs`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='severe_headache' accessible={true} accessibilityLabel={'severe_headache'} label='severe_headache' value="3" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Severe or increasing headache`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='seizures' accessible={true} accessibilityLabel={'seizures'} label='seizures' value="4" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Seizures or convulsions`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='consciousness' accessible={true} accessibilityLabel={'consciousness'} label='consciousness' value="5" />
            <Text style={cbStyle.checkboxLabel}>{`Loss of consciousness`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='deteriorating' accessible={true} accessibilityLabel={'deteriorating'} label='deteriorating' value="6" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Deteriorating conscious state`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='vomiting' accessible={true} accessibilityLabel={'vomiting'} label='vomiting' value="7" />
            <Text style={cbStyle.checkboxLabel}>{`Vomiting`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='restlessness' accessible={true} accessibilityLabel={'restlessness'} label='restlessness' value="8" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Increasing restlessness`}</Text>
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <MyCheckbox testID='agitation' accessible={true} accessibilityLabel={'agitation'} label='agitation' value="9" />
            <Text
              style={cbStyle.checkboxLabel}
            >{`Agitation or combativeness`}</Text>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          incidentReportRepoContext.createReport(user.uid, user.username, null, 0, 0).then((id) => {
          // Update ReportId context for the app;
          updateIncidentId(id);

          });
          fetchIncidents(user.uid)
          //console.log(user.uid + " " + incidentId)
          //console.log(chosenList)
          // Using reduce() to sum the array
          const sum = chosenList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          let pass = null;
          if (sum > 0) {
            pass = 0;
          } else {
            pass = 1;
          }
          incidentReportRepoContext.setRedFlag(user.uid, incidentId, chosenList[0],
                      chosenList[1], chosenList[2], chosenList[3], chosenList[4],
                      chosenList[5], chosenList[6], chosenList[7], chosenList[8],
                      chosenList[9], pass)
          incidentReportRepoContext.incrementTestStage(incidentId)
          fetchRedFlag(user.uid, incidentId)
          if (pass === 1) {
            navigation.navigate('Next Steps');
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

export default RedFlagsChecklist;
