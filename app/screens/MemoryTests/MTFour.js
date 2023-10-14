import * as React from 'react';

import {
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    ScrollView,
    Pressable
} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/MemoryTestsStyles/MTFourStyle';

import { useContext, useState } from 'react';

import {
  IncidentReportRepoContext,
  IncidentIdContext,
  MemoryCorrectAnswerContext,
  UserContext
} from '../../components/GlobalContextProvider';
import DisplayOptions from '../../components/MemoryTests/DisplayOptions';
import { getShuffledOptions } from '../../model/constants/MemoryTestOptions';
import MyCheckbox from "../../components/MyCheckbox";
import updateProps from "react-native-reanimated/src/reanimated2/UpdateProps";
import cbStyle from "../../components/checkboxStyle";
import {Ionicons} from "@expo/vector-icons";
import { exportMapAsCsv } from '../../model/exportAsCsv';

import preventBackAction from '../../components/preventBackAction';

/**a
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */

function MTFour({ navigation }) {

  preventBackAction();
  // Context variables
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [memoryCorrectAnswerContext] = useContext(MemoryCorrectAnswerContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  // Local state
  const [options] = useState(getShuffledOptions());


  function isEqual(a, b)
  {
    var counter = 3;
    for(var i=0;i<a.length;i++){
      if(!(a.includes(b[i]))){
        counter--;
      }
    }
    return counter;
  }

  async function fetchMemory(uid, iid) {
    try {
      const memory = await incidentReportRepoContext.getMemory(uid, iid);
      console.log(memory);
    } catch (error) {
      console.error('Error fetching memory result:', error);
    }
  }

  const MyCheckbox = (props) => {
      const [checked, onChange] = useState(false);

      function onCheckmarkPress() {
          onChange(!checked);
          onUpdate(props.value);
      }

      return (
          <Pressable testID='pressable' accessible={true} accessibilityLabel={'pressable'} label='pressable'
              style={[cbStyle.checkboxBase, checked && cbStyle.checkboxChecked]}
              onPress={onCheckmarkPress}
          >
              {checked && <Ionicons name="checkmark" size={24} color="black" />}
          </Pressable>
      );

  };


  // updates const list when onCheckmarkPress() is called
  function onUpdate(name) {
    let index = chosenList.indexOf(name);
    if (index === -1) {
      chosenList.push(name); // if it isn't stored add it to the array
    } else {
      chosenList.splice(index, 1); // if it is stored then remove it from the array
    }
    return { chosenList };
  }



  const chosenList = [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#9AD3FF' }}>
      <Text
        style={uiStyle.text}
        adjustsFontSizeToFit={true}
        numberOfLines={2}
      >
        What three images does the injured individual remember?
      </Text>

      <ScrollView style={{ margin: 10 }}>
        <SafeAreaView style={uiStyle.container}>
          <DisplayOptions options={options} updateOption={onUpdate} />
        </SafeAreaView>
      </ScrollView>

      <View style={uiStyle.bottomContainer}>
        <TouchableOpacity testID='remembering_touchable' accessible={true} accessibilityLabel={'remembering_touchable'} label='remembering_touchable'
          onPress={() => {
            //Logic to generate Pass or fail mark
            // memoryCorrectAnswerContext.sort();
            // chosenList.sort();

            const result = isEqual(memoryCorrectAnswerContext,chosenList);
            console.log(result);
            var pass1 = 0;
            if (result == 3) {
              pass1 = 1;
            }
            incidentReportRepoContext.setMemory(user.uid, incidentId, result, null, pass1, null);
            incidentReportRepoContext.incrementTestStage(incidentId);
            console.log(fetchMemory(user.uid, incidentId));
            navigation.navigate('Reaction Test 1');
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default MTFour;
