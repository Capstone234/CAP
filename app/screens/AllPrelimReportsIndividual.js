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
  incidentReportRepoContext.getPrelimReports(uid, iid).then((values) => {
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // console.log(uid)
  // console.log(iid)
  // console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    const dateAndTime = reportResults.datetime;

    // ---------- Report details ----------
    // memTest, verbTest, pcss, reaction, balance, hoptest
    const redflagTest = dict[reportResults.redFlagPass];
    const verbalTest = dict[reportResults.verbalPass];
    const pcssTest = dict[reportResults.pcssPass];
    const reactionTest = dict[reportResults.reactionPass];
    const balanceTest1 = dict[reportResults.balancePass1];
    const balanceTest2 = dict[reportResults.balancePass2];
    const memoryTest1 = dict[reportResults.memoryPass1];
    const memoryTest2 = dict[reportResults.memoryPass2];
    const hopTest = dict[reportResults.hopPass];

    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{iid} </Text>,
      <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>,
      <Text key={3} style={styles.datetext}>Patient: {} </Text>
    );


    usersButtons.push(
      <Text key={4} style={styles.reporttext}>Red Flag Test:  {redflagTest}</Text>,
      <Text key={6} style={styles.reporttext}>Verbal Test:  {verbalTest}</Text>,
      <Text key={7} style={styles.reporttext}>PCSS Test:  {pcssTest}</Text>,
      <Text key={4} style={styles.reporttext}>Memory Test 1:  {memoryTest1}</Text>,
      <Text key={5} style={styles.reporttext}>Memory Test 2:  {memoryTest2}</Text>,
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