import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  View,
  ImageBackground,
  LogBox
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

function AllDSReportsIndividual({ route, navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [user, setUser] = useContext(UserContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [prelimReportResults, setPrelimReportResults] = useState([]);
  const { key, date } = route.params;
  const [incident, setIncident] = useState([]);
  let fullname;

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);


  let usersButtons = [];
  //   const reports = incidentRepoContext.getPrelimReports(account.account_id);
  incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
    setReportResults(values);
  });

  incidentReportRepoContext.getIncidents(user.uid).then((values) => {
    // if(reportResults != null){
    setPrelimReportResults(values);
    //}
  });

  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.dateTime);
    return isSameMonth(colDate, date);
  });


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  let myList = {};
  useEffect(() => {
    async function fetchName(uid, iid) {
      try {

        const array = await incidentReportRepoContext.getIncidentPatient(uid, iid);
        let data = array[0];
        if (array.length != 0 && data["incident"] != null && data["incident"] != undefined) {
          myList[iid] = data["incident"];
        } else {
          myList[iid] = null
        }
        setIncident(myList);

      } catch (error) {
        console.error('Error fetching incident:', error);
      }
    }
    for (let i = 0; i < prelimReportResults.length; i++) {
      fetchName(user.uid, i);
    }
  }, [prelimReportResults.length, reportResults.length]);

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
    const dateAndTime = filteredList[key].dateTime;
    let reportID = filteredList[key].sid;

    if (filteredList[key].sid == null) {
      reportID = 0; // i.e., do not have an ongoing incident
    }

    // ---------- Report details ---------- 
    let patient_fname;
    let patient_lname;

    if (incident[filteredList[key].iid] != null) {
      patient_fname = StringUtils.split(incident[filteredList[key].iid])[0];
      patient_lname = StringUtils.split(incident[filteredList[key].iid])[1];
    } else {
      if (user.uid == 0 && user.username == 'Guest') {
        patient_fname = 'unknown';
        patient_lname = ''
      } else {
        patient_fname = user.fname;
        patient_lname = user.sname;
      }
    }
    if (patient_fname === 'unknown'){
      fullname = 'Guest User'
    }
    else{
      fullname = patient_fname + " " + patient_lname;
    }

    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportID} </Text>,
      <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>,
      <Text key={3} style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>,
      <Text key={4} style={styles.scoretext}>Daily Symptom Score: {filteredList[key].symptomsPass} /132</Text>
    );

    usersButtons.push(
      <Text key={5} style={styles.reporttext}>Headache:  {filteredList[key].headache}</Text>,
      <Text key={6} style={styles.reporttext}>Nausea:  {filteredList[key].nausea}</Text>,
      <Text key={7} style={styles.reporttext}>Vomiting:  {filteredList[key].vomiting}</Text>,
      <Text key={8} style={styles.reporttext}>Balance Problem:  {filteredList[key].balance}</Text>,
      <Text key={9} style={styles.reporttext}>Dizziness:  {filteredList[key].dizziness}</Text>,
      <Text key={10} style={styles.reporttext}>Fatigue/Low energy:  {filteredList[key].fatigue}</Text>,
      <Text key={11} style={styles.reporttext}>Sensitivity to light:  {filteredList[key].light}</Text>,
      <Text key={12} style={styles.reporttext}>Sensitivity to noise:  {filteredList[key].noise}</Text>,
      <Text key={13} style={styles.reporttext}>Numbness/Tingling:  {filteredList[key].numb}</Text>,
      <Text key={14} style={styles.reporttext}>Feeling mentally foggy:  {filteredList[key].foggy}</Text>,
      <Text key={15} style={styles.reporttext}>Feeling slowed down:  {filteredList[key].slowed}</Text>,
      <Text key={16} style={styles.reporttext}>Difficulty concentrating:  {filteredList[key].concentrating}</Text>,
      <Text key={17} style={styles.reporttext}>Difficulty remembering:  {filteredList[key].remembering}</Text>,
      <Text key={18} style={styles.reporttext}>Drowsiness:  {filteredList[key].drowsiness}</Text>,
      <Text key={19} style={styles.reporttext}>Sleeping less than usual:  {filteredList[key].sleep_less}</Text>,
      <Text key={20} style={styles.reporttext}>Sleeping more than usual:  {filteredList[key].sleep_more}</Text>,
      <Text key={21} style={styles.reporttext}>Trouble falling asleep:  {filteredList[key].sleeping}</Text>,
      <Text key={22} style={styles.reporttext}>Irritability:  {filteredList[key].irritability}</Text>,
      <Text key={23} style={styles.reporttext}>Sadness:  {filteredList[key].sadness}</Text>,
      <Text key={24} style={styles.reporttext}>Nervousness:  {filteredList[key].nervousness}</Text>,
      <Text key={25} style={styles.reporttext}>Feeling more emotional:  {filteredList[key].emotional}</Text>,
      <Text key={26} style={styles.reporttext}>Blurry/Double vision:  {filteredList[key].blurry}</Text>,
    );
  }

  else {
    usersButtons.push(
      <Text key={0} style={uiStyle.buttonLabel}>Sorry, there is something wrong.</Text>
    );
  }

  const resultIndiv = []; 

  const createPDF = async (results) => {
    resultIndiv.push(results[key]);
    exportMapAsPdf("Daily Symptom Test Report", resultIndiv, fullname);
  }

  const createCSV = async (results) => {
    resultIndiv.push(results[key]);

    exportMapAsCsv("Daily Symptom Test Report", resultIndiv, fullname);
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => { navigation.navigate('DS Report') }}>
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
          onPress={() => { createCSV(filteredList) }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton} onPress={() => createPDF(filteredList)}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}


export default AllDSReportsIndividual;



