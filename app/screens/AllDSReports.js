import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  View,
  ImageBackground,
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
import styles from '../styles/AllDSReportScreenStyle';


function AllDSReports({ navigation }) {

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
    console.log(reportResults);
    exportMapAsPdf(reportResults, results);
  }

  const createCSV = async (results) => {
    exportMapAsCsv("Basic Report", results);
  }

  let usersButtons = [];
  if (user.uid != undefined && user.uid != null && incidentId != undefined) {
    incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
      setReportResults(values);
    });
  }
  
  // console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    let z = 0; // report key
   
    for (let i = 0; i < reportResults.length; i++) {
      const dateAndTime = reportResults[i].dateTime;
      // let time;
      // if (dateAndTime[1] != null) {
      //   time = '' + dateAndTime[1].slice(0, 5);
      // }
      // const date = '' + dateAndTime[0];

      // ---------- Report details ----------
      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Individual DS Report', { key: i})}
          
        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportResults[i].sid} </Text>
            <Text style={styles.datetext}>Completed {dateAndTime} </Text>
          </Text>
          <Text style={styles.scoretext}>{reportResults[i].symptomsPass} /132</Text>
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

  return (
    
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.headerText}>
          Daily Symptom Reports
        </Text>
        <Text style={styles.text}>
          Hi {user.fname},
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
          onPress={() => { console.log("from here" , reportResults); createPDF( reportResults)}}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );


}


export default AllDSReports;



