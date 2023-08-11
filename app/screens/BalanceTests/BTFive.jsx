import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';

import uiStyle from '../../components/uiStyle.jsx';
import { useContext, useState } from 'react';
import {
  dataContext,
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../../components/GlobalContextProvider';

function BTFive({ navigation }) {
  // Context variables
  const [patient, setPatient] = useContext(PatientContext);
  const [reportId, setReportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);

  const handleCreateMultiResponse = (answers) => {
    const desc = 'BalanceTest-response: first SD, second VAR, one leg up';
    incidentRepoContext.setMultiResponse(reportId, desc, answers).then(
      () => {
        incidentRepoContext
          .getMultiResponses(reportId)
          .then((mrs) => console.log(mrs));
      },
      (err) => console.log(err),
    );
  };
  const [data2, setData2] = useContext(dataContext);
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Stability Grade</Text>
          <Text style={uiStyle.stackedText}>
            {'\n'}
            Variation:{'\n'}
            {'\n'}
            X: Y: Z: Average: {Math.round(Math.pow(data2, 2) * 1000) /
              1000}{' '}
            {'\n'}
            {'\n'}
            Deviation:{'\n'}
            {'\n'}
            X: Y: Z: Average: {Math.round(data2 * 1000) / 1000} {'\n'}
            {'\n'}
            Please pass the phone to your supervisor {'\n'}
          </Text>
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VOMS Start');
          handleCreateMultiResponse([
            Math.round(data2 * 1000) / 1000,
            Math.round(Math.pow(data2, 2) * 1000) / 1000,
          ]);
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff3333';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
});

export default BTFive;
