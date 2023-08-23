import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { useContext, useState, useEffect } from "react";
import { PrelimReportIdContext, PreliminaryReportRepoContext, MedicalReportRepoContext, AgeHopTestContext } from "../../components/GlobalContextProvider";

import uiStyle from '../../components/uiStyle';

function HTComplete({ route, navigation }) {
  const hopTestRoute = route.params;
  var hopTestPreFormResult = Object.values(hopTestRoute)[0]
  var hopTestCountResult = Object.values(hopTestRoute)[1]
  var hopTestPostFormResult = Object.values(hopTestRoute)[2]
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);
  const [ageHopTestContext, setAgeHopTestContext] = useContext(AgeHopTestContext);
  
  // console.log(ageHopTestContext)
  // console.log(hopTestPreFormResult)
  // console.log(hopTestCountResult)
  // console.log(hopTestPostFormResult)

  const storeResult = () => {
    medicalReportRepoContext.updateHopTestResults(prelimReportId, hopTestPreFormResult, hopTestCountResult, hopTestPostFormResult);
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId)
      .then((data) => console.log(data));
    
    var result = "FAIL";

    if (ageHopTestContext <= 3 && hopTestCountResult >= 0) {
      result = "PASS";
    }
    else if (ageHopTestContext == 4 && hopTestCountResult >= 1) {
      result = "PASS";
    }
    else if (ageHopTestContext == 5 && hopTestCountResult >= 4) {
      result = "PASS";
    }
    else if (ageHopTestContext == 6 && hopTestCountResult >= 8) {
      result = "PASS";
    }
    else if (ageHopTestContext == 7 && hopTestCountResult >= 10) {
      result = "PASS";
    }
    else if (ageHopTestContext == 8 && hopTestCountResult >= 13) {
      result = "PASS";
    }
    else if (ageHopTestContext >= 9 && ageHopTestContext <= 10 && hopTestCountResult >= 15) {
      result = "PASS";
    }
    else if (ageHopTestContext >= 11 && ageHopTestContext <= 12 && hopTestCountResult >= 17) {
      result = "PASS";
    }
    else if (ageHopTestContext >= 13 && ageHopTestContext <= 14 && hopTestCountResult >= 18) {
      result = "PASS";
    }
    else if (ageHopTestContext >= 15 && hopTestCountResult >= 20) {
      result = "PASS";
    }
    
    if(result == "FAIL"){
      preliminaryReportRepoContext.updateHopTestResult(prelimReportId, 0);
    }
    else{
      preliminaryReportRepoContext.updateHopTestResult(prelimReportId, 1);
    }

    preliminaryReportRepoContext.getCurrentReportInformation(prelimReportId).then(data => console.log(data));
    
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
        source = {require('../../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Hop Test Complete</Text>
          <Text style={uiStyle.stackedText}>
            You have successfully completed the hop test. Press next
            to continue with testing. 
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          storeResult()
          navigation.navigate('Memory Test 5 Intro');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
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
    marginBottom: (Dimensions.get('window').height)/2,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});


export default HTComplete;
