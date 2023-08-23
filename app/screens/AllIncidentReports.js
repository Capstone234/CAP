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
  AccountRepoContext
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../components/uiStyle';


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
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={uiStyle.buttonLabel}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputAreaContainer: {
      flex: 1,
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderRadius: 50,
      padding: 10,
      backgroundColor: '#D3D3D3',
    },
    text: {
      color: '#003A67',
      fontSize: Dimensions.get('window').width/25,
      fontWeight: '800',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    bottomButton: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginBottom: (Dimensions.get('window').height)/30,
      marginTop: (Dimensions.get('window').height)/1.5,
    },
    titlecontainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/28,
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height)/300,
      marginTop: (Dimensions.get('window').height)/20,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    pdfButton: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginTop: (Dimensions.get('window').height)/500,
    }
  });


export default AllIncidentReports;