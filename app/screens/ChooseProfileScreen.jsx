import * as React from 'react';
import {
  StyleSheet,
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
import uiStyle from '../components/uiStyle';
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
        There is no existing profile can be selected.
      </Text>,
    );
  }
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>Which profile you want to choose?</Text>
        {usersButtons}

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={uiStyle.buttonLabel}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  selectUserButton: {
    marginLeft: 10,
    width: 300,
    height: 70,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#FB582F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButton: {
    marginLeft: 5,
    width: 300,
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 100,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectProfileScreen;
