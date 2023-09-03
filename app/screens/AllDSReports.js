import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllDSReportScreenStyle';


function AllDSReports({ navigation }) {

  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const createPDF = async (results) => {
    exportMapAsPdf("Basic Report", results);
  }

  let usersButtons = [];
  //   const reports = incidentRepoContext.getPrelimReports(account.account_id);
  let reports = [];
  preliminaryReportRepoContext.getDSLFromPatient(account.account_id).then((values) => {
    //console.log(values);
    // if(reportResults != null){
    setReportResults(values);
    //}
  });


  if (reportResults.length > 0) {
    let j = 1; // pdf key
    let z = 0; // report key

    for (let i = 0; i < reportResults.length; i++) {
      const dateAndTime = reportResults[i].date_of_test.split('T');
      let time;
      if (dateAndTime[1] != null) {
        time = '' + dateAndTime[1].slice(0, 5);
      }
      const date = '' + dateAndTime[0];

      const description = ' ' + dateAndTime[0] + ' ' + time + '\n Headache: ' + reportResults[i].headache_result + '/6' + ' \n Nausea: ' + reportResults[i].nausea_result + '/6' +
        ' \n Dizziness: ' + reportResults[i].dizziness_result + '/6' + ' \n Vomiting: ' + reportResults[i].vomiting_result + '/6' + ' \n Balance Problem: ' +
        reportResults[i].balance_problem_result + '/6' + ' \n Blurry or Double Vision: ' + reportResults[i].blurry_or_double_vision_result + '/6'
        + ' \n Sensitivity to light: ' + reportResults[i].sensitivity_to_light_result + '/6' + ' \n Sensitivity to noise: ' + reportResults[i].sensitive_to_noise_result
        + '/6' + ' \n Pain other than headache: ' + reportResults[i].pain_other_than_headache_result + '/6' + ' \n Feeling Slowed Down: ' + reportResults[i].feeling_slowed_down_result +
        '/6' + ' \n Difficulty Concentrating: ' + reportResults[i].difficulty_concentrating_result + '/6' + ' \n Difficulty Remembering: ' + reportResults[i].difficulty_remembering_result +
        '/6' + ' \n Trouble falling asleep: ' + reportResults[i].trouble_fall_asleep_result + '/6' + ' \n Fatigue or low energy: ' + reportResults[i].fatigue_or_low_energy_result + '/6' +
        ' \n Drowsiness: ' + reportResults[i].drowsiness_result + '/6' + ' \n Feeling more emotional: ' + reportResults[i].feeling_more_emotional_result + '/6' + '\n Irritability: ' +
        reportResults[i].irritability_result + '/6' + '\n Sadness: ' + reportResults[i].sadness_result + '/6' + ' \n Nervousness: ' + reportResults[i].nervousness_result + '/6' +
        ' \n';

      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Continue Tests', { screen: 'All Reports' })} // TODO: change navigation
        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportResults[i].log_id} </Text>
            <Text style={styles.datetext}>Completed {date} {time} </Text>
          </Text>
        </TouchableOpacity>
      );

      // usersButtons.push(
      // <TouchableOpacity
      //   key={j} style={styles.pdfButton}
      //   onPress={() => { createPDF(description) }}
      // >
      //   <Text style={uiStyle.buttonLabel}>Generate PDF report</Text>
      // </TouchableOpacity>
      // );

      j += 2;
      z += 2;

      // if(reportResults.length == 1){
      //   reportResults.pop();
      // }
      // reportResults.slice(i+1, reportResults.length);
      //console.log(usersButtons[i]);
    }
  }
  else {
    usersButtons.push(
      <Text key={1} style={uiStyle.buttonLabel}>No such reports.</Text>
    );
  }

  //console.log(usersButtons);
  // TODO: Add a icon for each action
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.headerText}>
          Daily Symptom Reports
        </Text>
        <Text style={styles.text}>
          Hi {account.first_name},
        </Text>
      </View>

      <View style={styles.reportContainer} >
        <ScrollView>
          {usersButtons}
        </ScrollView>
      </View>

      <View style={styles.footercontainer}>
        <Text style={styles.subtext}>
          Generate CSV report{account.first_name},
        </Text>
        <Text style={styles.subtext}>
          Generate PDF report{account.first_name},
        </Text>
      </View>
    </SafeAreaView>
  );


}


export default AllDSReports;



