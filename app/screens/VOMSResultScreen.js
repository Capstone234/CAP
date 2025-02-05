import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEffect, useContext, useState, useRef } from 'react';
import {
  IncidentReportRepoContext,
  ReportIdContext,
  PrelimReportIdContext,
  PreliminaryReportRepoContext,
  AccountContext,
  AccountRepoContext,
  MedicalReportRepoContext
} from '../components/GlobalContextProvider';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/VOMSResultScreenStyle';
import { shareAsync } from 'expo-sharing';
import { exportMapAsCsv } from '../model/exportAsCsv';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { IOSexportMapAsPdf } from '../model/IOSexportasPdf';

const reactionThreshold = 500;
const parseReactionTest = (rt) => {
  const reactionTestResponses = [];
  if ((rt.time_attempt_1 < reactionThreshold || rt.time_attempt_2 < reactionThreshold || rt.time_attempt_3 < reactionThreshold)) {
    reactionTestResponses.push('Reaction Test Result: Passed');
  } else {
    reactionTestResponses.push('Reaction Test Result: Failed');
  }
  return reactionTestResponses;
};

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 * @param {boolean} route.params.secondMemoryTestResponses response of the second memory test. Inserting from the
 * previous screen tends to be too slow.
 */
function VOMSResultScreen({ route, navigation }) {
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [reportId] = useContext(ReportIdContext);
  const [mtAndBtResults, setMTBTResults] = useState([]);
  const [reportResults, setReportResults] = useState([]);
  const [reactionTest, setReactionTest] = useState(null);
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const [account] = useContext(AccountContext);
  const mounted = useRef(false);
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    incidentRepoContext
        .getVOMSCluster(prelimReportId)
        .then((data) => {
            setReportResults(data._array);
        });

  }, []);

  let allTestResults = [];
  let count = 0;
  reportResults.map((obj) => {
    allTestResults.push(<Text key={count} style={uiStyle.text}>{

        obj.symptom_name + '\n\n'+
        'Headache rating: ' + obj.headache_rating + '\n' +
        'Nausea rating: ' + obj.nausea_rating +  '\n' +
        'Dizziness rating: ' + obj.dizziness_rating +  '\n' +
        'Fogginess rating: ' + obj.fogginess_rating +  '\n\n\n'
        }</Text>);
       count++;
  })

  const createAlert = () =>
  Alert.alert(
    'Alert',
    'Save To Profile',
    [
      {
        text: 'Save to new profile',
        onPress: () => navigation.navigate('Login'),
      },
      {
        text: 'Save to logged profile',
        onPress: () => {
          console.log(account.account_id);
          console.log(prelimReportId);
          incidentRepoContext.updatePrelimReport(account.account_id, prelimReportId);
          navigation.navigate('Home Page')}
        ,
      },
    ],
  );


  // }
  const createCSV = () => {
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>exportMapAsCsv("Medical Report", data));
  }
  return (

    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>VOMS Tests Results</Text>
      <ScrollView>{allTestResults}</ScrollView>
      <TouchableOpacity
        style={[styles.bottomButton, uiStyle.shadowProp]}
        onPress={() => navigation.navigate('Home Page')}
      >
        <Text style={styles.buttonLabel}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VOMSResultScreen;
