import * as React from 'react';
import {
  Text,
  ScrollView,
  View,
  LogBox
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
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
import styles from '../styles/AllPrelimReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';


function AllPrelimReports({ navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [indivResults, setIndivResults] = useState([]);
  const [date, setDate] = useState(new Date());
  const [generatePdf, setGeneratePdf] = useState(false);
  const [userInput, setUserInput] = useState("");
  let myArray = [];
  let fullname;

  // ----------------------------------------
  useEffect(() => {
    mounted.current = true; // Component is mounted
    // console.log(mounted.current)
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const createPDF = async (results) => {
    // console.log(results);
    exportMapAsPdf("Preliminary Test Report", results, fullname);
  }

  const createCSV = async (results) => {
    exportMapAsCsv("Preliminary Test Report", results, fullname);
  }

  let usersButtons = [];
  var dict = { 0: 'FAIL', 1: 'PASS' };

  // get all reports for logged-in user
  if (user.uid != undefined && user.uid != null) {
    incidentReportRepoContext.getIncidents(user.uid).then((values) => {
      // if(reportResults != null){
      setReportResults(values);
      //}
    });
  }

  // -------- date filter --------
  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.datetime);
    return isSameMonth(colDate, date);
  });

  // -------- user-input (patient) filter --------
  const filterData = (item, index) => {
    // index is number of FILTERED reports in the list (belonging to this user)
    let name = "" + user.fname + user.sname;
    let len = filteredList.length-1; // chronological order
    // if input is empty
    if (userInput === "") {
      return item;
    }
    // username
    else if (name && name.toLowerCase().includes(userInput.toLowerCase())) {
      return item;
    }
    // patient name
    else if (filteredList[len-index].incident && filteredList[len-index].incident.toLowerCase().includes(userInput.toLowerCase())) {
      return item;
    }
    // uncomment this for debug
    // else {
    //   console.log(index)
    //   console.log(filteredList[len-index].incident)
    //   console.log("No reports found")
    // }
  }

  // console.log(date);
  // console.log(filteredList);

  async function fetchData(uid, incidentId, dateAndTime) {
    if (user.uid != undefined && user.uid != null && incidentId != null) {
      try {

        let myObject = {};

        myObject['Date & Time'] = dateAndTime;

        let result = await incidentReportRepoContext.getRedFlag(uid, incidentId);
        if (result != undefined) {
          result = result["redFlagPass"];
        }
        myObject['redflag'] = result;

        let result1 = await incidentReportRepoContext.getReaction(user.uid, incidentId);
        result1 = result1["reactionPass"];
        myObject['Reaction Test'] = result1;

        result1 = await incidentReportRepoContext.getVerbalTest(user.uid, incidentId);
        result1 = result1["verbalPass"];
        myObject['Verbal Test'] = result1;

        result1 = await incidentReportRepoContext.getBalance(user.uid, incidentId);
        result1 = result1["balancePass1"];
        myObject['Balance Test 1'] = result1;

        result1 = await incidentReportRepoContext.getBalance(user.uid, incidentId);
        result1 = result1["balancePass2"];
        myObject['Balance Test 2'] = result1;

        result1 = await incidentReportRepoContext.getHop(user.uid, incidentId);
        result1 = result1["hopPass"];
        myObject['Hop Test'] = result1;

        result1 = await incidentReportRepoContext.getMemory(user.uid, incidentId);
        result1 = result1["memoryPass1"];
        myObject['Memory Test 1'] = result1;

        result1 = await incidentReportRepoContext.getMemory(user.uid, incidentId);
        result1 = result1["memoryPass2"];
        myObject['Memory Test 2'] = result1;

        result1 = await incidentReportRepoContext.getPCSS(user.uid, incidentId);
        result1 = result1["pcssPass"];
        myObject['PCSS Test'] = result1;

        for (const key in myObject) {
          if (myObject[key] === 0) {
            myObject[key] = "Fail";
          } else if (myObject[key] === 1) {
            myObject[key] = "Pass";
          }
        }

        myArray.push(myObject);

        myArray = myArray.filter((obj) => obj['Date & Time'] !== null);

        

        // Print the results to the terminal for debugging
        // console.log('All Results:', myArray);
        setIndivResults(myArray);

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error as needed
      }
    }
  };

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
    let z = 0; // report key

    for (let i = filteredList.length - 1; i >= 0; i--) {
      //console.log(reportResults[i]);
      const dateAndTime = filteredList[i].datetime;

      // ---------- Report details ----------
      // update patient name (either username or user input)
      let patient_fname
      let patient_lname
      if (filteredList[i].incident == null || filteredList[i].incident == undefined) {
        if (user.uid == 0 && user.username == 'Guest') {
          patient_fname = 'unknown';
          patient_lname = ''
        } else {
          patient_fname = user.fname;
          patient_lname = user.sname;
        }
      } else {
        patient_fname = StringUtils.split(filteredList[i].incident)[0];
        patient_lname = StringUtils.split(filteredList[i].incident)[1];
      }
      if (patient_fname === 'unknown'){
        fullname = 'Guest User'
      }
      else{
        fullname = patient_fname + " " + patient_lname;
      }

      if (filteredList[i].finished == 1) { // completed
        usersButtons.push(
          <TouchableOpacity key={z} style={styles.formcontainer}
            onPress={() => navigation.navigate('Individual Prelim Report', { uid: user.uid, iid: filteredList[i].iid })}
          >
            <Text>
              <Text style={styles.reporttext}>Report #{filteredList[i].iid}    </Text>
              <Text style={styles.datetext}>Completed {dateAndTime} </Text>
            </Text>
            <Text style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>
          </TouchableOpacity>
        );

        fetchData(user.uid, filteredList[i].iid, dateAndTime);
      }
      else {
        usersButtons.push(
          <TouchableOpacity key={z} style={styles.formcontainer}
            onPress={() => navigation.navigate('Individual Prelim Report', { uid: user.uid, iid: filteredList[i].iid })}
          >
            <Text>
              <Text style={styles.reporttext}>Report #{filteredList[i].iid}    </Text>
              <Text style={styles.datetext}>Incomplete </Text>
            </Text>
            <Text style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>
          </TouchableOpacity>
        );
      }

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
          Preliminary Reports
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
          onPress={() => { createCSV(indivResults) }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createPDF(indivResults) }}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

}

export default AllPrelimReports;