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
import styles from '../styles/AllDSReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';


function AllDSReports({ navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [date, setDate] = useState(new Date());

  // ----------------------------------------
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
  if (user.uid != undefined && user.uid != null && incidentId != undefined) {
    incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
      setReportResults(values);
    });
  }

  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.dateTime);
    return isSameMonth(colDate, date);
  });

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
   let z = 0; // report key 

    for (let i = 0; i < filteredList.length; i++) {
      const dateAndTime = filteredList[i].dateTime;
      let reportID = filteredList[i].sid;

      if (filteredList[i].sid == null) {
        reportID = 0; // i.e., do not have an ongoing incident
      }

      // ---------- Report details ----------
      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Individual DS Report', { key: i, date: date})}
        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportID}    </Text>
            <Text style={styles.datetext}>Completed {dateAndTime} </Text>
          </Text>
          <Text style={styles.scoretext}>{reportResults[i].symptomsPass} /132 </Text>
          <Text style={styles.datetext}>Patient: {} </Text>
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


export default AllDSReports;



