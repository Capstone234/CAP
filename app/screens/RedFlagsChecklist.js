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
  ReportIdContext,
} from '../components/GlobalContextProvider';

/**
 * The screen will ask user for details about concussion in checklist form.
 */

function RedFlagsChecklist({ navigation }) {
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
        Red Flag Checklist
      </Text>
      <Text style={styles.subheadingText}>
        Are any of the following symptoms present? Select all that apply.
      </Text>
      <ScrollView>
        <SafeAreaView style={cbStyle.allCheckboxContainer}>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Neck pain or tenderness`}</Text>
            <MyCheckbox testID='neck_pain' accessible={true} accessibilityLabel={'neck_pain'} label='neck_pain' value="Neck pain or tenderness" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text style={cbStyle.checkboxLabel}>{`Double vision`}</Text>
            <MyCheckbox testID='double_vision' accessible={true} accessibilityLabel={'double_vision'} label='double_vision' value="Double vision" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Weakness or tingling/burning in the arms or legs`}</Text>
            <MyCheckbox testID='weakness_tingling' accessible={true} accessibilityLabel={'weakness_tingling'} label='weakness_tingling' value="Weakness or tingling/burning in the arms or legs" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Severe or increasing headache`}</Text>
            <MyCheckbox testID='severe_headache' accessible={true} accessibilityLabel={'severe_headache'} label='severe_headache' value="Severe or increasing headache" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Seizures or convulsions`}</Text>
            <MyCheckbox testID='seizures' accessible={true} accessibilityLabel={'seizures'} label='seizures' value="Seizures or convulsions" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text style={cbStyle.checkboxLabel}>{`Loss of consciousness`}</Text>
            <MyCheckbox testID='consciousness' accessible={true} accessibilityLabel={'consciousness'} label='consciousness' value="Loss of consciousness" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Deteriorating conscious state`}</Text>
            <MyCheckbox testID='deteriorating' accessible={true} accessibilityLabel={'deteriorating'} label='deteriorating' value="Deteriorating conscious state" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text style={cbStyle.checkboxLabel}>{`Vomiting`}</Text>
            <MyCheckbox testID='vomiting' accessible={true} accessibilityLabel={'vomiting'} label='vomiting' value="Vomiting" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Increasing restlessness`}</Text>
            <MyCheckbox testID='restlessness' accessible={true} accessibilityLabel={'restlessness'} label='restlessness' value="Increasing restlessness" />
          </SafeAreaView>
          <SafeAreaView style={cbStyle.checkboxContainer}>
            <Text
              style={cbStyle.checkboxLabel}
            >{`Agitation or combativeness`}</Text>
            <MyCheckbox testID='agitation' accessible={true} accessibilityLabel={'agitation'} label='agitation' value="Agitation or combativeness" />
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          incidentRepoContext.createReport(null).then((id) => {

            // Update ReportId context;
            setReportId(id);

            // Create MultiResponse in db
            const desc = 'Red Flags';
            incidentRepoContext
              .setMultiResponse(id, desc, chosenList)
              .catch(console.log);
          });

          if (chosenList.length === 0) {
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
