import * as React from 'react';

import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/MemoryTestsStyles/MTFiveStyle';

import { useContext, useState } from 'react';

import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext,
  MemoryCorrectAnswerContext
} from '../../components/GlobalContextProvider';
import DisplayOptions from '../../components/MemoryTests/DisplayOptions';
import { getShuffledOptions } from '../../model/constants/MemoryTestOptions';

import preventBackAction from '../../components/preventBackAction';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTFive({ navigation }) {

  preventBackAction();

  // Context variables
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [memoryCorrectAnswerContext] = useContext(MemoryCorrectAnswerContext);
  const [user, setUser] = useContext(UserContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);



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
  // const handleCreateMultiResponse = (res) => {
  //   const desc = 'Memory Test Part 2';
  //   incidentRepoContext.setMultiResponse(reportId, desc, res).then((r) => {});
  // };

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
      <Text style={uiStyle.text}>
        What three images does the injured individual remember?
      </Text>
      <ScrollView style={{ margin: 10 }}>
        <SafeAreaView style={[uiStyle.container, styles.checkBoxes]}>
          <DisplayOptions options={options} updateOption={onUpdate} />
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={async() => {

          memoryCorrectAnswerContext.sort();
          chosenList.sort();

          const result = isEqual(memoryCorrectAnswerContext,chosenList);
          console.log(result);
          try {
            const memoryData = await incidentReportRepoContext.getMemory(user.uid, incidentId);

            // Now you have memoryData available in variables
            if (memoryData) {
              correctResult1 = memoryData.correctAnswersTest1;
              passResult1 = memoryData.memoryPass1;
            }
          } catch (error) {
            console.error('Error:', error);
          }
          var pass2 = 0
          if (result == 3) {
            pass2 = 1;
          }
          incidentReportRepoContext.updateMemory(user.uid, incidentId, correctResult1, result, passResult1, pass2);
          incidentReportRepoContext.incrementTestStage(incidentId);
          console.log(fetchMemory(user.uid, incidentId));

          navigation.navigate('Prelim Test Results', {
            secondMemoryTestResponses: chosenList,
          });


        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default MTFive;
