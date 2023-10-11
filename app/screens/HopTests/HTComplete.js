import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { useContext, useState, useEffect } from "react";
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  AgeHopTestContext,
  UserContext
} from '../../components/GlobalContextProvider';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/HopTestsStyles/HTCompleteStyle';
import ProgressBar from '../../styles/ProgressBar';

function HTComplete({ route, navigation }) {
  const hopTestRoute = route.params;
  var hopTestPreFormResult = Object.values(hopTestRoute)[0]
  var hopTestCountResult = Object.values(hopTestRoute)[1]
  var hopTestPostFormResult = Object.values(hopTestRoute)[2]
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const [ageHopTestContext, setAgeHopTestContext] = useContext(AgeHopTestContext);
  

  async function fetchHops(uid, iid) {
    try {
      const hop = await incidentReportRepoContext.getHop(uid, iid);
      console.log(hop);
    } catch (error) {
      console.error('Error fetching hop result:', error);
    }
  }
  // console.log(ageHopTestContext)
  // console.log(hopTestPreFormResult)
  // console.log(hopTestCountResult)
  // console.log(hopTestPostFormResult)

  const storeResult = () => {
    
    var result = 0;

    if (ageHopTestContext <= 3 && hopTestCountResult >= 0) {
      result = 1;
    }
    else if (ageHopTestContext == 4 && hopTestCountResult >= 1) {
      result = 1;
    }
    else if (ageHopTestContext == 5 && hopTestCountResult >= 4) {
      result = 1;
    }
    else if (ageHopTestContext == 6 && hopTestCountResult >= 8) {
      result = 1;
    }
    else if (ageHopTestContext == 7 && hopTestCountResult >= 10) {
      result = 1;
    }
    else if (ageHopTestContext == 8 && hopTestCountResult >= 13) {
      result = 1;
    }
    else if (ageHopTestContext >= 9 && ageHopTestContext <= 10 && hopTestCountResult >= 15) {
      result = 1;
    }
    else if (ageHopTestContext >= 11 && ageHopTestContext <= 12 && hopTestCountResult >= 17) {
      result = 1;
    }
    else if (ageHopTestContext >= 13 && ageHopTestContext <= 14 && hopTestCountResult >= 18) {
      result = 1;
    }
    else if (ageHopTestContext >= 15 && hopTestCountResult >= 20) {
      result = 1;
    }
    
    incidentReportRepoContext.setHop(user.uid, incidentId, hopTestCountResult, result);
    incidentReportRepoContext.incrementTestStage(incidentId);
    console.log(fetchHops(user.uid, incidentId));
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={87} />

        <View style={{ alignItems: 'center' }}>
          <Text style={uiStyle.titleText}>Hop Test Complete</Text>
        </View>

        <ScrollView>
          <Text style={uiStyle.stackedText}>
            You have successfully completed the hop test. Press next
            to continue with testing.
          </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              storeResult()
              navigation.navigate('Memory Test 5 Intro');
            }}
            style={[uiStyle.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HTComplete;
