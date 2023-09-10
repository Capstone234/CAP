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
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllDSReportScreenStyle';


function AllDSReports({ navigation }) {

  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const [sortType, setSortType] = useState('ASC');

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
  //   const reports = incidentRepoContext.getPrelimReports(account.account_id);
  let reports = [];
  preliminaryReportRepoContext.getDSLFromPatient(account.account_id).then((values) => {
    //console.log(values);
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  useEffect(() => {
    const sortReports = option => {
      // Do Not Modify State Directly!
      const sorted = [...reportResults];
      if (option === 'ASC') {
        sorted.sort((a, b) => {
          const dateA = new Date(`${a.date_of_test.split('T')[0]} ${a.date_of_test.split('T')[1]}`).valueOf();
          const dateB = new Date(`${b.date_of_test.split('T')[0]} ${b.date_of_test.split('T')[1]}`).valueOf();
          return dateA - dateB; // sort by newest
        });
        console.log(sorted);
      }
      else {
        sorted.sort((a, b) => {
          const dateA = new Date(`${a.date_of_test.split('T')[0]} ${a.date_of_test.split('T')[1]}`).valueOf();
          const dateB = new Date(`${b.date_of_test.split('T')[0]} ${b.date_of_test.split('T')[1]}`).valueOf();
          return dateB - dateA; // sort by oldest
        });
        console.log(sorted);
      }
      return setReportResults(sorted);
    };

    sortReports(sortType);
  }, [sortType]);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {
    let z = 0; // report key

    for (let i = 0; i < reportResults.length; i++) {
      const dateAndTime = reportResults[i].date_of_test.split('T');
      let time;
      if (dateAndTime[1] != null) {
        time = '' + dateAndTime[1].slice(0, 5);
      }
      const date = '' + dateAndTime[0];

      // ---------- Report details ----------
      usersButtons.push(
        <TouchableOpacity key={z} style={styles.formcontainer}
          onPress={() => navigation.navigate('Individual DS Report', { key: i })}

        >
          <Text>
            <Text style={styles.reporttext}>Report #{reportResults[i].log_id} </Text>
            <Text style={styles.datetext}>Completed {date} {time} </Text>
          </Text>
          <Text style={styles.scoretext}>{reportResults[i].dsl_result} /132</Text>
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
          Hi {account.first_name},
        </Text>
      </View>

      <TouchableOpacity style={styles.pdfButton}
        onPress={() => setSortType((prevState) => prevState === "ASC" ? "DESC" : "ASC") }>
        <Text style={styles.subtext}>Sort</Text>
      </TouchableOpacity>

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


export default AllDSReports;



