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
import { Ionicons } from "@expo/vector-icons";
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

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={40} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={[uiStyle.titleText, uiStyle.titleTextBox]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Balance Tests Complete
          </Text>
        </View>

        <View style={uiStyle.infoTextContainer}>
        <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            You have successfully completed both the balance tests. Press next
            to continue with testing.
          </Text>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('VOMS Start');
            }}
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <Text style={[uiStyle.buttonLabelWhite, { flex: 1 }]}>Next</Text>
            <Ionicons name="arrow-forward-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete2;
