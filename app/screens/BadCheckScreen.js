import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext,
  UserRepoContext
} from '../components/GlobalContextProvider';
import * as Linking from "expo-linking"
import { useContext, useState, useRef, useEffect } from 'react';

import uiStyle from '../styles/uiStyle';
import { Link } from 'native-base';
import styles from '../styles/BadCheckScreenStyle';

import preventBackAction from '../components/preventBackAction';

/**
 * Shows result for check if patient have any selected non-well symptoms.
 */
function BadCheckScreen({ navigation }) {

  preventBackAction();
  
  const [users, setUsers] = useState([]);
  const userRepoContext = useContext(UserRepoContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const mounted = useRef(false);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [user] = useContext(UserContext);

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
    if (userRepoContext !== null) {
        userRepoContext.getAllUsers().then((pts) => {
        if (mounted.current) {
          setUsers(pts);
        }
      });
    } else {
      console.log('null userRepo');
    }
  }, [userRepoContext]);


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
          navigation.navigate('Home Page')}
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



export default BadCheckScreen;
