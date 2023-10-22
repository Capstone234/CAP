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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MonthPicker from '../components/MonthPicker';
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
import styles from '../styles/AllDSReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';


function AllDSReports({ navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [prelimReportResults, setPrelimReportResults] = useState([]);
  const [date, setDate] = useState(new Date());
  const [incident, setIncident] = useState([]);
  const [userInput, setUserInput] = useState("");

  // ----------------------------------------
  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const createPDF = async (results) => {
    // console.log(reportResults);
    exportMapAsPdf("Daily Symptom Test Report", results, fullname);
  }

  const createCSV = async (results) => {
    exportMapAsCsv("Daily Symptom Test Report", results, fullname);
  }

  let usersButtons = [];
  if (user.uid != undefined && user.uid != null && incidentId != undefined) {
    incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
      setReportResults(values);
    });
  }

  if (user.uid != undefined && user.uid != null) {
    incidentReportRepoContext.getIncidents(user.uid).then((values) => {
      // if(reportResults != null){
      setPrelimReportResults(values);
      //}
    });
  }

  // -------- date filter --------
  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.dateTime);
    return isSameMonth(colDate, date);
  });

  // -------- user-input (patient) filter --------
  const filterData = (item, index) => {
    // index is number of FILTERED reports in the list (belonging to this user)
    let name = "" + user.fname + user.sname;
    let len = filteredList.length - 1; // chronological order
    // if input is empty
    if (filteredList.length > 0) {
      if (userInput === "") {
        return item;
      }
      // username
      else if (name && name.toLowerCase().includes(userInput.toLowerCase())) {
        return item;
      }
      // patient name
      else if (incident[filteredList[len - index].iid] && incident[filteredList[len - index].iid].toLowerCase().includes(userInput.toLowerCase())) {
        return item;
      }
      // uncomment this for debug
      // else {
      //   console.log(index)
      //   console.log(filteredList[len-index].incident)
      //   console.log("No reports found")
      // }
    }
  }

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
  }, [prelimReportResults.length, filteredList.length]); // when either changes, update the names

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
    let z = 0; // report key 

    for (let i = filteredList.length - 1; i >= 0; i--) {
      const dateAndTime = filteredList[i].dateTime;

      let reportID = filteredList[i].sid;

      if (filteredList[i].sid == null) {
        reportID = 0; // i.e., do not have an ongoing incident
      }

      // ---------- Report details ----------
      // update patient name (either username or user input)

      let patient_fname;
      let patient_lname;

      if (incident[filteredList[i].iid] != null) {
        patient_fname = StringUtils.split(incident[filteredList[i].iid])[0];
        patient_lname = StringUtils.split(incident[filteredList[i].iid])[1];
      } else {
        if (user.uid == 0 && user.username == 'Guest') {
          patient_fname = 'unknown';
          patient_lname = ''
        } else {
          patient_fname = user.fname;
          patient_lname = user.sname;
        }
      }
      if (patient_fname === 'unknown') {
        fullname = 'Guest User'
      }
      else {
        fullname = patient_fname + " " + patient_lname;
      }

      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Individual DS Report', { key: i, date: date })}
        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportID}    </Text>
            <Text style={styles.datetext}>Completed {dateAndTime} </Text>
          </Text>
          <Text style={styles.scoretext}>{reportResults[i].symptomsPass} /132 </Text>
          <Text style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>
        </TouchableOpacity>
      );

      z += 2;
    }
  }
  else {
    usersButtons.push(
      <Text key={1} style={styles.alert}>No reports found.</Text>
    );
  }

  const findName = () => {
    if (user.uid == 0 && user.username == 'Guest') {
      return "Guest";
    } else {
      return user.fname;
    }
  }

  return (

    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.headerText}>
          Daily Symptom Reports
        </Text>
        <Text style={styles.text}>
          Hi {findName()},
        </Text>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput placeholder='Search by Patient Name' onChangeText={(text) => setUserInput(text)} />
      </View>

      <View style={styles.reportContainer} >
        <FlatList
          data={usersButtons}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)} />}
          renderItem={({ item, index }) => filterData(item, index)}
        />
      </View>

      <View style={styles.footercontainer}>
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createCSV(filteredList) }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createPDF(filteredList) }}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );


}


export default AllDSReports;



