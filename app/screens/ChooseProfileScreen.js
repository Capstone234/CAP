import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/ChooseProfileScreenStyle';
/**
 * The screen will ask user to choose an existing profile to save the result to
 * their account.
 */
function SelectProfileScreen({ navigation }) {
  // Context variables
  const [patients, setPatients] = useState([]);
  const [, setPatient] = useContext(PatientContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const mounted = useRef(false);

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
    if (patientRepoContext !== null) {
      patientRepoContext.getAllPatients().then((pts) => {
        if (mounted.current) {
          setPatients(pts);
        }
      });
    } else {
      console.log('null patientRepo');
    }
  }, [patientRepoContext]);

  let usersButtons = [];
  if (patients.length > 0) {
    for (let i = 0; i < patients.length; i++) {
      const username = patients[i].first_name + ' ' + patients[i].last_name;
      usersButtons.push(
        <TouchableOpacity
          key={i}
          style={styles.selectUserButton}
          onPress={() => {
            setPatient(patients[i]);
            navigation.navigate('Profile Info');
          }}
        >
          <Text style={uiStyle.buttonLabel}>{username}</Text>
        </TouchableOpacity>,
      );
    }
  } else {
    usersButtons.push(
      <Text key={-1} style={styles.text}>
        There is no existing profile to be selected.
      </Text>,
    );
    usersButtons.push(
      <TouchableOpacity
      key={1}
        onPress={() => {
          navigation.navigate('Create Profile');
        }}
        style={styles.selectUserButton}
      >
        <Text style={uiStyle.buttonLabel}>Create a Profile</Text>
      </TouchableOpacity>
    )

  }
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>Which profile you want to choose?</Text>
        {usersButtons}

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Home Page')}
        >
          <Text style={uiStyle.buttonLabel}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SelectProfileScreen;
