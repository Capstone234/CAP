import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTComplete2Style';
import ProgressBar from '../../styles/ProgressBar';
import { IncidentReportRepoContext, IncidentIdContext} from "../../components/GlobalContextProvider";
import { useContext } from "react";

import preventBackAction from '../../components/preventBackAction';

function BTComplete2({ navigation }) {
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const {incidentId, updateIncidentId} = useContext(IncidentIdContext);

  preventBackAction();
  incidentReportRepoContext.setFinishedupto(incidentId, 7);

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={67} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={uiStyle.titleText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Balance Tests Complete
          </Text>
        </View>

        <ScrollView>
          <Text style={uiStyle.stackedText}>
            You have successfully completed both the balance tests. Press next
            to continue with testing.
          </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VOMS Start');
            }}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete2;
