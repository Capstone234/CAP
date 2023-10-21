import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTComplete2Style';
import ProgressBar from '../../styles/ProgressBar';
//import { IncidentReportRepoContext, IncidentIdContext} from "../../components/GlobalContextProvider";
//import { useContext } from "react";

import preventBackAction from '../../components/preventBackAction';

function BTComplete2({ navigation }) {
//  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
//  const {incidentId, updateIncidentId} = useContext(IncidentIdContext);

  preventBackAction();
//  incidentReportRepoContext.incrementTestStage(incidentId);

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
      <ProgressBar percentage={67} />

      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Balance Tests Complete</Text>
          <Text style={uiStyle.stackedText}>
            You have successfully completed both the balance tests. Press next
            to continue with testing.

          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VOMS Start');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete2;
