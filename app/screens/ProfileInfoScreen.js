import * as React from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/ProfileInfoScreenStyle';
import { exportMapAsCsv } from '../model/exportAsCsv';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * The screen will ask user to choose an existing profile to save the result to
 * their account.
 */
function ProfileInfoScreen({ navigation }) {
  // Context variables
  const [reportId, setReportId] = useContext(ReportIdContext);
  const [reports, setReports] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [patient] = useContext(PatientContext);
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

  const parsePatient = (pt) => {
    const patientArray = [];
    if (pt !== undefined) {
      patientArray.push('First Name: ' + pt.first_name);
      patientArray.push('Last Name: ' + pt.last_name);
      patientArray.push('Age: ' + pt.age);
      patientArray.push('Weight: ' + pt.weight);
    }
    return patientArray;
  };

  const parseReports = (rps) => {
    const reportsArray = [];
    if (rps !== undefined) {
      rps.forEach((element) => {
        reportsArray.push(element.report_id);
      });
    }
    return reportsArray;
  };

  useEffect(() => {
    if (incidentRepoContext !== null) {
      incidentRepoContext.getReports(patient.patient_id).then(
        (rps) => {
          if (mounted.current) {
            setReports(parseReports(rps));
          }
        },
        (err) => console.log('ProfileInfoScreen getReport:', err),
      );
    } else {
      console.log('null incidentReportRepo');
    }
    setPatientDetails(parsePatient(patient));
  }, [patient, patientRepoContext, incidentRepoContext]);

  let patientDetailsText = [];
  if (patientDetails.length > 3) {
    patientDetailsText.push(
      <Text key={0} style={styles.text}>
        {patientDetails[0]}
        {'\n'} {'\n'}
        {patientDetails[1]}
        {'\n'} {'\n'}
        {patientDetails[2]}
        {'\n'} {'\n'}
        {patientDetails[3]}
      </Text>,
    );
  }

  let reportsButtons = [];
  if (reports.length > 0) {
    for (let i = 0; i < reports.length; i++) {
      reportsButtons.push(
        <TouchableOpacity
          key={i + 1}
          style={styles.selectUserButton}
          onPress={() => {
            setReportId(reports[i]);
            navigation.navigate('Report Screen');
          }}
        >
          <Text style={uiStyle.buttonLabel}>REPORT {i + 1}</Text>
        </TouchableOpacity>,
      );
    }
  } else {
    reportsButtons.push(
      <Text key={-1} style={styles.text}>
        There is no existing report.
      </Text>,
    );
  }

  const handleExport = useCallback(() => {
    const fileName = `${patient.first_name}Details`;
    const map = new Map(Object.entries(patient));

    exportMapAsCsv(
      fileName,
      map,
      new Map(),
      new Map(),
      'Share profile csv file',
    ).catch(alert);
  }, [patient]);

  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>User Profile</Text>
        {patientDetailsText}
        <TouchableOpacity
          style={{ alignSelf: 'flex-end' }}
          onPress={handleExport}
        >
          <MaterialCommunityIcons
            name="share-variant"
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <Text>You can select reports to view</Text>
        {reportsButtons}
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
export default ProfileInfoScreen;
