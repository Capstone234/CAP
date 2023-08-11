import * as React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';

import { useContext, useState } from 'react';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';

import uiStyle from '../components/uiStyle.jsx';

/**
 * Asks user if there was a clear head injury
 * Response; Yes, Maybe/Unsure, No.
 */
function MechanismOfInjuryCheck({ navigation }) {
  // Context variables
  const [patient, setPatient] = useContext(PatientContext);
  const [reportId, setReportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);

  const handleCreateSResponse = (res) => {
    const desc = 'Mechanism of injury response';
    incidentRepoContext.setSingleResponse(reportId, desc, res).then(() => {
      incidentRepoContext
        .getSingleResponses(reportId)
        .then((sr) => setResponses(JSON.stringify(sr)));
    });
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.text}>
        Was there a clear impact to the body or head?
      </Text>
      <SafeAreaView style={uiStyle.textContainer}>
        <View style={styles.sameRow}>
          <Pressable
            style={styles.buttonYes}
            onPress={() => {
              handleCreateSResponse('YES');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>YES</Text>
          </Pressable>

          <Pressable
            style={styles.buttonNo}
            onPress={() => {
              handleCreateSResponse('NO');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>NO</Text>
          </Pressable>
        </View>
        <View style={styles.sameRow}>
          <Pressable
            style={styles.buttonMaybe}
            onPress={() => {
              handleCreateSResponse('MAYBE');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>MAYBE/UNSURE</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonYes: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 125,
    backgroundColor: '#83cd49',
    margin: 10,
  },
  buttonNo: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 125,
    backgroundColor: '#ff7366',
    margin: 10,
  },
  buttonMaybe: {
    width: 125,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 125,
    backgroundColor: '#f6993a',
    margin: 10,
  },
  label: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  container: {
    flex: 1,
  },

  sameRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  text: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: 'black',
    padding: 20,
  },
});

export default MechanismOfInjuryCheck;
