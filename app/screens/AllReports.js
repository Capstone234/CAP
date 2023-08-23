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


function AllReports({ navigation }){
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
    return(
      <SafeAreaView style={uiStyle.container}>
       <View style={styles.imagecontainer}>
        <ImageBackground source = {require('../../assets/logo.png')} style={styles.image}></ImageBackground>
      </View>
      <View style={styles.titlecontainer}>
      <Text style={styles.text}>
        Which reports would you like to access?
      </Text>
      <SafeAreaView style={styles.inputAreaContainer}>
        
        <TouchableOpacity
          style={[styles.bottomButton, styles.shadowProp]}
          onPress={() => {
              if(account.account_id == null && account.first_name== 'John'){
                  createAlert();
              }
              else{
                navigation.navigate('Continue Tests', {screen: 'Prelim Report'}); 
              }
                
          }}
        >
        <Text style={uiStyle.buttonLabel}>Preliminary Test Reports</Text>
        </TouchableOpacity>
        {<TouchableOpacity
          style={[styles.bottomButton,  styles.shadowProp]}

          onPress={() => {
            if(account.account_id == null && account.first_name== 'John'){
                createAlert();
            }
            else{
              navigation.navigate('Continue Tests', {screen: 'DS Report'}); 
            }
            }}
            >
          <Text style={uiStyle.buttonLabel}>Daily Symptom Reports</Text>
        </TouchableOpacity> }
      </SafeAreaView>
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputAreaContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/4,
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height),
      marginTop: (Dimensions.get('window').height)/45,
    },
    input: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: (Dimensions.get('window').height)/80,
      marginTop: (Dimensions.get('window').height)/80, 
      borderRadius: 20,
      padding:  Dimensions.get('window').width/50,
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
      marginBottom: (Dimensions.get('window').height)/200,
      marginTop: (Dimensions.get('window').height)/20,
    },
    image: {
      width: Dimensions.get('window').width/2.8,
      height: Dimensions.get('window').width/2.8,
      marginBottom: (Dimensions.get('window').height)/70,
      marginTop: (Dimensions.get('window').height)/15,
      resizeMode: 'cover',
      alignItems: 'center',
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
  });


export default AllReports;