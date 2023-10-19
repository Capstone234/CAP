import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  LogBox
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MonthPicker from '../components/MonthPicker';
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
import styles from '../styles/AllPrelimReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';


function AllPrelimReports({ navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [date, setDate] = useState(new Date());

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
    console.log(">>", results);
    exportMapAsPdf("Preliminary Report", results);
  }

  const createCSV = async (results) => {
    console.log(">", results);
    exportMapAsCsv("Preliminary Report", results);
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

  // console.log(reportResults);

  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.datetime);
    return isSameMonth(colDate, date);
  });

  // console.log(date);
  // console.log(filteredList);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
    let z = 0; // report key

    for (let i = 0; i < filteredList.length; i++) {
      //console.log(reportResults[i]);
      const dateAndTime = filteredList[i].datetime;

      // ---------- Report details ----------
      if (filteredList[i].finished == 1) { // completed
        usersButtons.push(
          <TouchableOpacity key={z} style={styles.formcontainer}
            onPress={() => navigation.navigate('Individual Prelim Report', { uid: user.uid, iid: incidentId})}
          >
            <Text>
              <Text style={styles.reporttext}>Report #{filteredList[i].iid}    </Text>
              <Text style={styles.datetext}>Completed {dateAndTime} </Text>
            </Text>
            <Text style={styles.datetext}>Patient: { } </Text>
          </TouchableOpacity>
        );
      }
      else {
        usersButtons.push(
          <TouchableOpacity key={z} style={styles.formcontainer}
            onPress={() => navigation.navigate('Individual Prelim Report', { uid: user.uid, iid: incidentId})}
          >
            <Text>
              <Text style={styles.reporttext}>Report #{filteredList[i].iid}    </Text>
              <Text style={styles.datetext}>Incomplete </Text>
            </Text>
            <Text style={styles.datetext}>Patient: { } </Text>
          </TouchableOpacity>
        );
      }

      z += 2;
    }
  }
  else {
    usersButtons.push(
      <Text key={1} style={uiStyle.buttonLabel}>No such reports.</Text>
    );
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.headerText}>
          Preliminary Reports
        </Text>
        <Text style={styles.text}>
          Hi {user.fname},
        </Text>
      </View>

      <View style={styles.reportContainer} >
        <FlatList
          data={usersButtons}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <MonthPicker date={date} onChange={(newDate) => setDate(newDate)} />}
          renderItem={({ item }) => item}
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


export default AllPrelimReports;




















