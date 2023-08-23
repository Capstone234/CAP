import * as React from 'react';
import { useContext, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import uiStyle from '../../components/uiStyle';
import MTImages from '../../../assets/MemoryTestResources/MTImages';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  PrelimReportIdContext,
  MemoryCorrectAnswerContext,
  MedicalReportRepoContext
} from '../../components/GlobalContextProvider';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */

function MTTwo({ navigation }) {
  // Context variables
  const [patient, setPatient] = useContext(PatientContext);
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [memoryCorrectAnswerContext, setMemoryCorrectAnswerContext] = useContext(MemoryCorrectAnswerContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);


  const handleCreateMultiResponse = (res) => {
    console.log('correct answers: ' + res);
    const desc = 'Memory Test Correct Answers';
    // incidentRepoContext.setMultiResponse(reportId, desc, res).then((r) => {});
    setMemoryCorrectAnswerContext(res);
    // medicalReportRepoContext.createMemoryTestReport(prelimReportId, -10, -10);
    medicalReportRepoContext.createMedicalReport(prelimReportId,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10,-10);
  };

  const arr = [];
  const threeImages = [];

  function generate3Images(ar) {
    while (ar.length < 3) {
      const r = Math.floor(Math.random() * 8) + 1;
      if (ar.indexOf(r) === -1) {
        ar.push(r);
        threeImages.push(MTImages[r]);
      }
    }
    return ar;
  }

  generate3Images(arr);

  const [state, setState] = useState({ index: 0, imgs: threeImages });
  const { index, imgs } = state;
  return (
    <View style={uiStyle.container}>
      <View style={[uiStyle.container, { justifyContent: 'center' }]}>
        <Text style={uiStyle.text}>{imgs[index].title}</Text>
        <Image testID='image' accessible={true} accessibilityLabel={'image'} label='image' 
          style={{ width: 300, height: 300, resizeMode: 'contain' }}
          source={imgs[index].src}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (index === 0) {
              const correctAnswers = [];
              correctAnswers.push(imgs[0].title);
              correctAnswers.push(imgs[1].title);
              correctAnswers.push(imgs[2].title);
              handleCreateMultiResponse(correctAnswers);
            }
            if (index >= 2) {
              navigation.navigate('Memory Test 3');
            } else {
              if (index < arr.length - 1) {
                setState({ ...state, index: index + 1 });
              }
            }
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: (Dimensions.get('window').height)/4,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});

export default MTTwo;
