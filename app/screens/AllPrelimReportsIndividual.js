import * as React from 'react';
import {
  Text,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import styles from '../styles/AllIndividualReportScreenStyle';


function AllPrelimReportsIndividual({ route, navigation }) {

  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const key = route.params;

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
  var dict = { 0: 'FAIL', 1: 'PASS' };

  // get all reports for logged-in user
  let reports = [];
  preliminaryReportRepoContext.getListofPatientReports(account.account_id).then((values) => {
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  let formId = Object.values(key)[0]
  // console.log(formId);

  //console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    //console.log(reportResults[formId]);
    const dateAndTime = reportResults[formId].date_of_test.split('T');
    let time;
    if (dateAndTime[1] != null) {
      time = dateAndTime[1].slice(0, 5);
    }
    const date = dateAndTime[0];

    // ---------- Report details ----------
    const memoryTest1 = dict[reportResults[formId].memory_test1_result];
    const memoryTest2 = dict[reportResults[formId].memory_test2_result];
    const reactionTest = dict[reportResults[formId].reaction_test_result];
    const balanceTest1 = dict[reportResults[formId].balance_test1_result];
    const balanceTest2 = dict[reportResults[formId].balance_test2_result];
    const hopTest = dict[reportResults[formId].hop_test_result];

    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportResults[formId].report_id} </Text>,
      <Text key={2} style={styles.datetext}>Completed {date} {time} </Text>
    );


    usersButtons.push(
      <Text key={4} style={styles.reporttext}>Memory Test 1:  {memoryTest1}</Text>,
      <Text key={5} style={styles.reporttext}>Memory Test 2:  {memoryTest2}</Text>,
      <Text key={6} style={styles.reporttext}>Reaction Test:  {reactionTest}</Text>,
      <Text key={7} style={styles.reporttext}>Balance Test 1:  {balanceTest1}</Text>,
      <Text key={8} style={styles.reporttext}>Balance Test 2:  {balanceTest2}</Text>,
      <Text key={9} style={styles.reporttext}>Hop Test:  {hopTest}</Text>,
    );
  }

  else {
    usersButtons.push(
      <Text key={0} style={uiStyle.buttonLabel}>Sorry, there is something wrong.</Text>
    );
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => { navigation.navigate('Prelim Report') }}>
          <Text style={styles.backBtnText}>&lt; Back to Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formcontainer} >
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


export default AllPrelimReportsIndividual;