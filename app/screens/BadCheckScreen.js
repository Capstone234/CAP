import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  ImageBackground
} from 'react-native';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext
} from '../components/GlobalContextProvider';
import * as Linking from "expo-linking"
import { useContext, useState, useRef, useEffect } from 'react';

import uiStyle from '../components/uiStyle';
import { Link } from 'native-base';
/**
 * Shows result for check if patient have any selected non-well symptoms.
 */
function BadCheckScreen({ navigation }) {
  const [accounts, setAccounts] = useState([]);
  const accountRepoContext = useContext(AccountRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const mounted = useRef(false);
  const [reportId] = useContext(ReportIdContext);
  const [account] = useContext(AccountContext);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Everytime there is a new patientRepoContext we
    // get patients from it.
    if (accountRepoContext !== null) {
        accountRepoContext.getAllAccounts().then((pts) => {
        if (mounted.current) {
          setAccounts(pts);
        }
      });
    } else {
      console.log('null patientRepo');
    }
  }, [accountRepoContext]);


  const createAlert = () =>
  Alert.alert(
    'Alert',
    'Save To Profile',
    [
      {
        text: 'Save to new profile',
        onPress: () => navigation.navigate('Login'),
      },
      {
        text: 'Save to logged profile',
        onPress: () => {
          
          incidentRepoContext.updateReport(account.account_id, reportId);
          navigation.navigate('Home')}
        ,
      },
    ],
  );

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
        source = {require('../../assets/b3.png')}>
      <Text style={uiStyle.stackedText}>
        The injured individual is showing severe symptoms and should seek medical attention immediately.
      </Text>    
      <TouchableOpacity onPress={()=>{
        console.log("Call 000 button was pressed (BadCheckScreen.js)");
        Linking.openURL("tel:000");
      }} style={uiStyle.startCheckButton}>
              <Text style={uiStyle.startCheckText}>Call 000</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{

        navigation.navigate('Home Page')
      }} style={styles.bottomButton}>
                <Text style={uiStyle.buttonLabel}>Return Home</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  callSymbol: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 100,
    width: 200,
    height: 200,
    position: 'relative',
    marginBottom: 150,
  },
  text: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.3,
    marginHorizontal: 50,
    marginVertical: 50,
    fontWeight: 'bold',
    position: 'relative',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height)/10,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default BadCheckScreen;
