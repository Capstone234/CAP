import * as React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';

import uiStyle from '../../components/uiStyle';

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

const styles = StyleSheet.create({
  allCheckboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 1,
  },

  checkboxBase: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#C4C4C4',
  },

  checkboxLabel: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
  },

  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/10,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});

export default MTFive;
