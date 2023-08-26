import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  IncidentReportRepoContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/SelectProfileScreenStyle';
/**
 * The screen will ask user to choose an existing profile to save the result to
 * their account.
 */
function SelectProfileScreen({ navigation }) {
  // Context variables
  const [patients, setPatients] = useState([]);
  const [reportId, setReportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const parsePatients = (pts) => {
    const patientsArray = [];
    if (pts !== undefined) {
      pts.forEach((element) => {
        patientsArray.push(element.first_name);
        patientsArray.push(element.last_name);
        patientsArray.push(element.patient_id);
      });
    }
    return patientsArray;
  };

  const handleUpdateReportExistingPatient = (pid) => {
    incidentRepoContext.updateReport(pid, reportId).then(
      (rowsAffected) => console.log(rowsAffected),
      (err) => console.log(err),
    );
  };

  useEffect(() => {
    // Everytime there is a new patientRepoContext we
    // get patients from it.
    if (patientRepoContext !== null) {
      patientRepoContext.getAllPatients().then((pts) => {
        if (mounted.current) {
          setPatients(parsePatients(pts));
        }
      });
    } else {
      console.log('null patientRepo');
    }
  }, [patientRepoContext]);

  let usersButtons = [];
  if (patients.length > 0) {
    for (let i = 0; i < patients.length; i += 3) {
      const username = patients[i] + ' ' + patients[i + 1];
      const pid = patients[i + 2];
      usersButtons.push(
        <TouchableOpacity
          key={i}
          style={styles.selectUserButton}
          onPress={() => {
            handleUpdateReportExistingPatient(pid);
            navigation.navigate('Home');
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
  }
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>
          You can select to save to existing profile
        </Text>
        {usersButtons}
        <Text>
          You will be able to view your result of your check or report anytime
          your profile
        </Text>
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

export default SelectProfileScreen;
