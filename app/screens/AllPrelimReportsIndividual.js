import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIndividualReportScreenStyle';


function AllPrelimReportsIndividual({ route, navigation }) {
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
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
  incidentReportRepoContext.getPrelimReports(user.uid, incidentId).then((values) => {
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  let formId = Object.values(key)[0]
  // console.log(formId);

  // console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    //console.log(reportResults[formId]);
    const dateAndTime = incidentReportRepoContext.getSpecificIncident(user.uid, incidentId).datetime;
    // let time;
    // if (dateAndTime[1] != null) {
    //   time = dateAndTime[1].slice(0, 5);
    // }
    // const date = dateAndTime[0];

    // ---------- Report details ----------
    // memTest, verbTest, pcss, reaction, balance, hoptest
    const memoryTest1 = dict[reportResults[formId].memoryPass1];
    const memoryTest2 = dict[reportResults[formId].memoryPass2];
    const verbalTest = dict[reportResults[formId].verbalPass];
    const pcssTest = dict[reportResults[formId].pcssPass];
    const reactionTest = dict[reportResults[formId].reactionPass];
    const balanceTest1 = dict[reportResults[formId].balancePass1];
    const balanceTest2 = dict[reportResults[formId].balancePass2];
    const hopTest = dict[reportResults[formId].hopPass];

    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportResults[formId].iid} </Text>,
      <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>
    );


    usersButtons.push(
      <Text key={4} style={styles.reporttext}>Memory Test 1:  {memoryTest1}</Text>,
      <Text key={5} style={styles.reporttext}>Memory Test 2:  {memoryTest2}</Text>,
      <Text key={6} style={styles.reporttext}>Verbal Test:  {verbalTest}</Text>,
      <Text key={7} style={styles.reporttext}>PCSS Test:  {pcssTest}</Text>,
      <Text key={8} style={styles.reporttext}>Reaction Test:  {reactionTest}</Text>,
      <Text key={9} style={styles.reporttext}>Balance Test 1:  {balanceTest1}</Text>,
      <Text key={10} style={styles.reporttext}>Balance Test 2:  {balanceTest2}</Text>,
      <Text key={11} style={styles.reporttext}>Hop Test:  {hopTest}</Text>,
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