import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Platform
} from 'react-native';

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
import uiStyle from '../components/uiStyle';
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
    preliminaryReportRepoContext
        .getCurrentReportInformation(prelimReportId)
        .then((data) => setReportResults(data)); 
    
  }, [preliminaryReportRepoContext, prelimReportId]);
  
  let allTestResults = [];
  var dict = {0:'FAIL', 1:'PASS'};
  Object.entries(reportResults).forEach(([key, value]) => {
    switch(key){
      case 'memory_test1_result':
        allTestResults.push(
          <Text key={0} style={uiStyle.text}>
            {'Memory Test 1 Result: ' + dict[value]}
          </Text>,
          
        );
       
        break
      case 'memory_test2_result':
        allTestResults.push(
          <Text key={1} style={uiStyle.text}>
            {'Memory Test 2 Result: ' + dict[value]}
          </Text>,
        );

        break
      case 'reaction_test_result':
        allTestResults.push(
          <Text key={2} style={uiStyle.text}>
            {'Reaction Test Result: ' + dict[value]}
          </Text>,
        );

        break
      case 'balance_test1_result':
        allTestResults.push(
          <Text key={3} style={uiStyle.text}>
            {'Balance Test 1 Result: ' + dict[value]}
          </Text>,
        );

        break
      case 'balance_test2_result':
        allTestResults.push(
          <Text key={4} style={uiStyle.text}>
            {'Balance Test 2 Result: ' + dict[value]}
          </Text>,
        );

        break
      case 'hop_test_result':
        allTestResults.push(
          <Text key={5} style={uiStyle.text}>
            {'Hop Test Result: ' + dict[value]}
          </Text>,
        );

    }

    // console.log(key , value); // key ,value
    // console.log(pdfResults);
    
  });

  const htmlPDF = `
    <ul>
      {% for iresult in pdfResults %}
        <li>{{ iresult.test_name iresult.grade}}</li>
      {% endfor %}  
    </ul>
  `;
  const createPDF = async () => {
    exportMapAsPdf(reportResults);
  }

  const createMedicalIOSPdf = async () => {
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>IOSexportMapAsPdf(data));
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
          navigation.navigate('Home')}
        ,
      },
    ],
  );

    
  // }
  const createCSV = () => {
    medicalReportRepoContext.getCurrentMedicalReportInformation(prelimReportId).then((data)=>exportMapAsCsv("Medical Report", data));
  }
  return (
    
    <View style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Preliminary Tests Results</Text>
      <ScrollView>{allTestResults}</ScrollView>
      {/* Natalie can you fix these buttons plz */}
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
        {/* Natalie can you make this button bigger, it doesnt fit the text*/}
        <Text style={styles.buttonLabel}>Generate and Email Medical Report</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottomButton, uiStyle.shadowProp]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonLabel}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/12,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/25,
    alignSelf: 'center',
  },
  buttonLabel: {
    // Buttom buttons in all tests
    color: '#003A67',
    fontSize: Dimensions.get('window').width/30,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

export default PrelimTestResultScreen;
