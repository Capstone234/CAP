import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  PatientContext,
  AccountContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllPrelimReportScreenStyle';


function AllPrelimReports({ navigation }) {

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

  const createCSV = async (results) => {
    exportMapAsCsv("Basic Report", results);
  }

  let usersButtons = [];
  var dict = { 0: 'FAIL', 1: 'PASS' };

  // get all reports for logged-in user
  let reports = [];
  preliminaryReportRepoContext.getListofPatientReports(account.account_id).then((values) => {
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  //console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    let z = 0; // report key

    for (let i = 0; i < reportResults.length; i++) {
      //console.log(reportResults[i]);
      const dateAndTime = reportResults[i].date_of_test.split('T');
      let time;
      if (dateAndTime[1] != null) {
        time = dateAndTime[1].slice(0, 5);
      }
      const date = dateAndTime[0];

      // ---------- Report details ----------
      // const description = ' ' + dateAndTime[0] + ' ' + time + '\n Memory Test 1: ' + dict[reportResults[i].memory_test1_result] + ' \n Memory Test 2: ' + dict[reportResults[i].memory_test2_result] +
      //   ' \n Reaction Test: ' + dict[reportResults[i].reaction_test_result] + ' \n Balance Test 1: ' + dict[reportResults[i].balance_test1_result] + ' \n Balance Test 2: ' +
      //   dict[reportResults[i].balance_test2_result] + ' \n Hop Test: ' + dict[reportResults[i].hop_test_result] + ' \n';

      const memoryTest1 = dict[reportResults[i].memory_test1_result];
      const memoryTest2 = dict[reportResults[i].memory_test2_result];
      const reactionTest = dict[reportResults[i].reaction_test_result];
      const balanceTest1 = dict[reportResults[i].balance_test1_result];
      const balanceTest2 = dict[reportResults[i].balance_test2_result];
      const hopTest = dict[reportResults[i].hop_test_result];

      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Individual Prelim Report', { key: i})}
        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportResults[i].report_id} </Text>
            <Text style={styles.datetext}>Completed {date} {time} </Text>
          </Text>
        </TouchableOpacity>
      );

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

  // TODO: Add a icon for each action
  // TODO: add csv + add report content
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.headerText}>
          Preliminary Reports
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
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createCSV(' ') }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createPDF(' ') }}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

}


export default AllPrelimReports;




















