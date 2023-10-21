import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  LogBox
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext
} from '../components/GlobalContextProvider';
import StringUtils from '../model/database/StringUtils';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIndividualReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';


function AllPrelimReportsIndividual({ route, navigation }) {
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [indivResults, setIndivResults] = useState([]);
  const { uid, iid } = route.params;

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
  incidentReportRepoContext.getIncidents(uid).then((values) => {
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  // async function fetchPrelimReports(uid, iid) {
  //   try {
  //     const values = await incidentReportRepoContext.getPrelimReports(uid, iid);
  //     setReportResults(values);
  //     console.log(reportResults);

  //   } catch (error) {
  //     console.error('Error fetching incident:', error);
  //   }
  // }
  // fetchPrelimReports(uid, iid);

  let myArray = [];
  async function fetchResults(uid, iid) {
    try {
      let myObject = {};

      let result = await incidentReportRepoContext.getRedFlag(uid, iid);
      if (result != undefined) {
        result = result["redFlagPass"];
      }
      myObject['redflag'] = result;

      result = await incidentReportRepoContext.getPCSS(uid, iid);
      if (result != undefined) {
        result = result["pcssPass"];
      }
      myObject['pcss'] = result;

      result = await incidentReportRepoContext.getReaction(uid, iid);
      if (result != undefined) {
        result = result["reactionPass"];
      }
      myObject['reaction'] = result;

      result = await incidentReportRepoContext.getVerbalTest(uid, iid);
      if (result != undefined) {
        result = result["verbalPass"];
      }
      myObject['verbal'] = result;

      result = await incidentReportRepoContext.getBalance(uid, iid);
      if (result != undefined) {
        result = result["balancePass1"];
      }
      myObject['balance1'] = result;

      result = await incidentReportRepoContext.getBalance(uid, iid);
      if (result != undefined) {
        result = result["balancePass2"];
      }
      myObject['balance2'] = result;

      result = await incidentReportRepoContext.getHop(uid, iid);
      if (result != undefined) {
        result = result["hopPass"];
      }
      myObject['hop'] = result;

      result = await incidentReportRepoContext.getMemory(uid, iid);
      if (result != undefined) {
        result = result["memoryPass1"];
      }
      myObject['mem1'] = result;

      result = await incidentReportRepoContext.getMemory(uid, iid);
      if (result != undefined) {
        result = result["memoryPass2"];
      }
      myObject['mem2'] = result;

      myArray.push(myObject);

      // console.log('All Results:', myArray);
      setIndivResults(myArray);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {

    let report;
    for (let i = 0; i < reportResults.length; i++) {
      if (reportResults[i].iid == iid) {
        report = reportResults[i];
        break;
      }
    }

    // update patient name (either username or user input)
    let patient_fname
    let patient_lname
    if (report.incident == null || report.incident == undefined) {
      if (user.uid == 0 && user.username == 'Guest') {
        patient_fname = 'unknown';
        patient_lname = ''
      } else {
        patient_fname = user.fname;
        patient_lname = user.sname;
      }
    } else {
      patient_fname = StringUtils.split(report.incident)[0];
      patient_lname = StringUtils.split(report.incident)[1];
    }

    const dateAndTime = report.datetime;

    // ---------- Report details ----------
    // memTest, verbTest, pcss, reaction, balance, hoptest
    fetchResults(uid, iid);
    // console.log(indivResults);

    if (indivResults.length > 0) {
      const report = indivResults[0];

      usersButtons.push(
        <Text key={1} style={styles.headerText}>Report #{iid} </Text>,
        <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>,
        <Text key={3} style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>
      );

      usersButtons.push(
        <Text key={4} style={styles.reporttext}>Red Flag Test:  {dict[report["redflag"]]}</Text>,
        <Text key={5} style={styles.reporttext}>Verbal Test:  {dict[report["verbal"]]}</Text>,
        <Text key={6} style={styles.reporttext}>PCSS Test:  {dict[report["pcss"]]}</Text>,
        <Text key={7} style={styles.reporttext}>Memory Test 1:  {dict[report["mem1"]]}</Text>,
        <Text key={8} style={styles.reporttext}>Memory Test 2:  {dict[report["mem2"]]}</Text>,
        <Text key={9} style={styles.reporttext}>Reaction Test:  {dict[report["reaction"]]}</Text>,
        <Text key={10} style={styles.reporttext}>Balance Test 1:  {dict[report["balance1"]]}</Text>,
        <Text key={11} style={styles.reporttext}>Balance Test 2:  {dict[report["balance2"]]}</Text>,
        <Text key={12} style={styles.reporttext}>Hop Test:  {dict[report["hop"]]}</Text>,
      );
    }
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