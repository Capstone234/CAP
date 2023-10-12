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
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIncidentReportScreenStyle';


function AllIncidentReports({ navigation }){
  const patientRepoContext = useContext(PatientRepoContext);
  const accountRepoContext = useContext(AccountRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
 

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  let usersButtons = [];
  const reports = incidentRepoContext.getReports(account.account_id);
  console.log('yes');
  console.log(reports);
  if (reports > 0) {
    console.log('yes');
    for (let i = 0; i < reports.length; i++) {
      const correctReport = incidentRepoContext.getMultiResponses(reports[i]);
      const singleReport = incidentRepoContext.getSingleResponses(reports[i]);
      if(correctReport != null){
        const description = correctReport.description;
        usersButtons.push(
          <Text key={i} style={uiStyle.buttonLabel}>Report {reports[i].report_id}{description}</Text>
        );
      }
      if(singleReport != null){
        const description = singleReport.description;
        usersButtons.push(
          <Text key={i} style={uiStyle.buttonLabel}>Report {reports[i].report_id}{description}</Text>
        );
      }
    }
    }
    else{
        <Text key={0} style={uiStyle.buttonLabel}>No such reports.</Text>
    }


    return(
        <SafeAreaView style={uiStyle.container}>
         <View style={styles.titlecontainer}>
        <Text style={styles.text}>
          All Incident Reports for {account.first_name}
        </Text>
        <ScrollView>{usersButtons}</ScrollView>
        <TouchableOpacity
          style={[styles.bottomButton, styles.shadowProp]}
          onPress={() => navigation.navigate('Home Page')}
        >
          <Text style={uiStyle.buttonLabel}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
}


export default AllIncidentReports;