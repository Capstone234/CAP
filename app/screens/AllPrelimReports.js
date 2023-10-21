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
import styles from '../styles/AllPrelimReportScreenStyle';


function AllPrelimReports({ navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
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
  incidentReportRepoContext.getIncidents(user.uid).then((values) => {
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
      const dateAndTime = new Date();
      let time;
      if (dateAndTime[1] != null) {
        time = dateAndTime[1].slice(0, 5);
      }
      const date = dateAndTime[0];

      // ---------- Report details ----------
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
    }
  }

  else {
    usersButtons.push(
      <Text key={1} style={uiStyle.buttonLabel}>No such reports.</Text>
    );
  }

  const findName = () => {
    if (user.uid == 0 && user.username == 'Guest') {
        return "Guest";
    } else {
        return user.fname;
    }
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
          Hi { findName() },
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




















