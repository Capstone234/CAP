import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform
} from 'react-native';

import { useEffect, useContext, useState, useRef } from 'react';
import {
  IncidentIdContext,
  UserContext,
  IncidentReportRepoContext
} from '../components/GlobalContextProvider';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/PrelimTestResultScreenStyle';
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
function PrelimTestResultScreen({ route, navigation }) {
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [user] = useContext(UserContext);
  const [reportResults, setReportResults] = useState([]);
  const {incidentId, updateIncidentId} = useContext(IncidentIdContext);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    //Retrieve db data in here. With the new db system.

    // try {
    //   const data = await incidentRepoContext.getPrelimReports(user.uid, incidentId);
    //
    //   if (data) {
    //     memoryResult1 = data.memoryPass1;
    //     memoryResult2 = data.memoryPass2;
    //     reationResult = data.reactionPass;
    //     balanceResult1 = data.balancePass1;
    //     balanceResult2 = data.balancePass2;
    //     hopResult = data.hopPass;
    //   }
    // }
    // catch (error) {
    //   console('Error:', error);
    // }

  }, [IncidentReportRepoContext, incidentId]);

  let allTestResults = [];
  var dict = {0:'FAIL', 1:'PASS'};
  Object.entries(reportResults).forEach(([key, value]) => {
    switch (key) {
      case 'memory_test1_result':
        allTestResults.push(
          <Text key={0} style={uiStyle.text}>
            {'Memory Test 1 Result: ' + dict[memoryResult1]}
          </Text>,
        );
        break;
      case 'memory_test2_result':
        allTestResults.push(
          <Text key={1} style={uiStyle.text}>
            {'Memory Test 2 Result: ' + dict[memoryResult2]}
          </Text>,
        );
        break;
      case 'reaction_test_result':
        allTestResults.push(
          <Text key={2} style={uiStyle.text}>
            {'Reaction Test Result: ' + dict[reactionResult]}
          </Text>,
        );
        break;
      case 'balance_test1_result':
        allTestResults.push(
          <Text key={3} style={uiStyle.text}>
            {'Balance Test 1 Result: ' + dict[balanceResult1]}
          </Text>,
        );
        break;
      case 'balance_test2_result':
        allTestResults.push(
          <Text key={4} style={uiStyle.text}>
            {'Balance Test 2 Result: ' + dict[balanceResult2]}
          </Text>,
        );
        break;
      case 'hop_test_result':
        allTestResults.push(
          <Text key={5} style={uiStyle.text}>
            {'Hop Test Result: ' + dict[hopResult]}
          </Text>,
        );
        break;
      default:
        // Handle the default case if needed
        break;
      }
    });

    // console.log(key , value); // key ,value
    // console.log(pdfResults);

  const htmlPDF = `
    <ul>
      {% for iresult in pdfResults %}
        <li>{{ iresult.test_name iresult.grade}}</li>
      {% endfor %}
    </ul>
  `;
  //NEED TO FIX
  const createPDF = async () => {
    // exportMapAsPdf(reportResults);
  }
  // NEED TO FIX
  const createMedicalIOSPdf = async () => {
    // medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>IOSexportMapAsPdf(data));
  }

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

  const createCSV = () => {
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>exportMapAsCsv("Medical Report", data));
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text
        style={uiStyle.titleText}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Preliminary Tests Results
      </Text>

      <ScrollView>
        {allTestResults}
      </ScrollView>

      <TouchableOpacity onPress={()=>{
        if(account.account_id != null && account.first_name != 'John'){
          createAlert();
        }
        else{
          navigation.navigate('Login');
        }
      }} style={[styles.bottomButton, uiStyle.shadowProp]}>
        <Text style={styles.buttonLabel}>Save Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bottomButton, uiStyle.shadowProp]}
        onPress={createPDF}
      >
        <Text style={styles.buttonLabel}>Generate PDF report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bottomButton, uiStyle.shadowProp]}
        onPress={() => {Platform.OS === 'ios' ? createMedicalIOSPdf() : createCSV()}}
      >
        <Text style={styles.buttonLabel}>Generate and Email Medical Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.bottomButton, uiStyle.shadowProp]}
        onPress={() => navigation.navigate('Home Page')}
      >
        <Text style={styles.buttonLabel}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


export default PrelimTestResultScreen;
