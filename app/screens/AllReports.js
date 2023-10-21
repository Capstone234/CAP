import * as React from 'react';
import {
  Text,
  SafeAreaView,
  Alert,
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
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllReportScreenStyle';


function AllReports({ navigation }){
  // const patientRepoContext = useContext(PatientRepoContext);
  // const accountRepoContext = useContext(AccountRepoContext);
  // const incidentRepoContext = useContext(IncidentReportRepoContext);
  // const [, setPatient] = useContext(PatientContext);
  // const [account] = useContext(AccountContext);
  // const [reportId] = useContext(ReportIdContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const mounted = useRef(false);


  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

//   useEffect(() => {
//     // Everytime there is a new patientRepoContext we
//     // get patients from it.
//     if (accountRepoContext !== null) {
//         accountRepoContext.getAllAccounts().then((pts) => {
//         if (mounted.current) {
//           setAccounts(pts);
//         }
//       });
//     } else {
//       console.log('null patientRepo');
//     }
//   }, [accountRepoContext]);


  const createAlert = () =>
  Alert.alert(
    'Alert',
    'Need to Login to see reports',
    [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'),
      },
    ],
  );

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.imagecontainer}>
        <ImageBackground source = {require('../../assets/logo.png')} style={styles.image}>
        </ImageBackground>
      </View>
      <View style={styles.titlecontainer}>
        <Text style={styles.text}>
          Which reports would you like to access?
        </Text>

        <SafeAreaView style={styles.inputAreaContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, styles.shadowProp]}
            onPress={() => {
                navigation.navigate('Continue Tests', {screen: 'Prelim Report'});
            }}
          >
            <Text
              style={uiStyle.buttonLabel}
              maxFontSizeMultiplier={1}
            >
              Preliminary Test Reports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bottomButton,  styles.shadowProp]}
            onPress={() => {
              navigation.navigate('Continue Tests', {screen: 'DS Report'});
            }}
          >
            <Text
              style={uiStyle.buttonLabel}
              maxFontSizeMultiplier={1}
            >
              Daily Symptom Reports
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

export default AllReports;