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
  ReportIdContext,
  MemoryCorrectAnswerContext,
  PrelimReportIdContext,
  PreliminaryReportRepoContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';
import DisplayOptions from '../../components/MemoryTests/DisplayOptions';
import { getShuffledOptions } from '../../model/constants/MemoryTestOptions';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTFive({ navigation }) {
  // Context variables
  const [prelimReportId] = useContext(PrelimReportIdContext); 
  const [responses, setResponses] = useState(null);
  const [memoryCorrectAnswerContext] = useContext(MemoryCorrectAnswerContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);


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
        <SafeAreaView style={uiStyle.container}>
          <DisplayOptions options={options} updateOption={onUpdate} />
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {

          memoryCorrectAnswerContext.sort();
          chosenList.sort();
  
          const result = isEqual(memoryCorrectAnswerContext,chosenList);
          console.log(result);
          medicalReportRepoContext.updateMemoryTestReportResult2(prelimReportId,result);
          medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data) => console.log(data));

          if(result == 3){
            preliminaryReportRepoContext.updateMemoryTest2Result(prelimReportId,1);
          }
          else{
            preliminaryReportRepoContext.updateMemoryTest2Result(prelimReportId,0);
          }
          preliminaryReportRepoContext.getCurrentReportInformation(prelimReportId).then(data => console.log(data));

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
