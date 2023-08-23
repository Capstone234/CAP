import * as React from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView, Pressable,
    Dimensions,
    ImageBackground
} from 'react-native';

import uiStyle from '../../components/uiStyle';

import { useContext, useState } from 'react';

import {
  IncidentReportRepoContext,
  ReportIdContext,
  MemoryCorrectAnswerContext,
  PreliminaryReportRepoContext,
  PrelimReportIdContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';
import DisplayOptions from '../../components/MemoryTests/DisplayOptions';
import { getShuffledOptions } from '../../model/constants/MemoryTestOptions';
import MyCheckbox from "../../components/MyCheckbox";
import updateProps from "react-native-reanimated/src/reanimated2/UpdateProps";
import cbStyle from "../../components/checkboxStyle";
import {Ionicons} from "@expo/vector-icons";
import { exportMapAsCsv } from '../../model/exportAsCsv';

/**a
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */

function MTFour({ navigation }) {
  // Context variables
  const [prelimReportId] = useContext(PrelimReportIdContext); 
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

  const handleCreateMultiResponse = (res) => {
    // const desc = 'Memory Test Part 1';
    // incidentRepoContext.setMultiResponse(reportId, desc, res).then((r) => {});
    // console.log(memoryCorrectAnswerContext);
    // console.log(res)
    
  };

  // const handleCreateMultiResponse = (res) => {
  //   const desc = 'Memory Test Part 1';
  //   incidentRepoContext.setMultiResponse(reportId, desc, res).then((r) => {
  //       incidentRepoContext
  //           .getMultiResponses(reportId)
  //           .then((mrs) => console.log(mrs));
  //       },
  //       (err) => console.log(err),
  //   );
  // };

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
      <Text style={uiStyle.text}>
        What three images does the injured individual remember?
      </Text>
      <ScrollView style={{ margin: 10 }}>
        <SafeAreaView style={uiStyle.container}>
          <DisplayOptions options={options} updateOption={onUpdate} />
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity testID='remembering_touchable' accessible={true} accessibilityLabel={'remembering_touchable'} label='remembering_touchable'
        onPress={() => {
          //Logic to generate Pass or fail mark
          // memoryCorrectAnswerContext.sort();
          // chosenList.sort();
          
          const result = isEqual(memoryCorrectAnswerContext,chosenList);
          console.log(result);
          medicalReportRepoContext.updateMemoryTestReportResult1(prelimReportId,result);
          medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>console.log(data));
          // exportMapAsCsv("test",medicalReportRepoContext.getCurrentMemoryTestReportInformation(prelimReportId));
          if(result == 3){
            preliminaryReportRepoContext.updateMemoryTest1Result(prelimReportId,1);
          }
          else{
            preliminaryReportRepoContext.updateMemoryTest1Result(prelimReportId,0);
          }
          preliminaryReportRepoContext.getCurrentReportInformation(prelimReportId).then(data => console.log(data));

          navigation.navigate('Reaction Test 1');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.25,
    resizeMode: 'cover',
  },
  buttonLabel: {
    color: '#003A67',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default MTFour;
