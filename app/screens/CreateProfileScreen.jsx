import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
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
 * The screen will ask user to fill in details so their result can be saved in
 * their account.
 */
function CreateProfileScreen({ navigation }) {
  // Context variables
  const [reportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  const [firstNameOfUser, onChangeFirstName] = useState('');
  const [lastNameOfUser, onChangeLastName] = useState('');
  const [ageOfUser, onChangeAge] = useState('');
  const [weightOfUser, onChangeWeight] = useState('');

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const onCreatePatient = (firstName, lastName, age, weight) => {
    if (patientRepoContext !== null) {
      patientRepoContext.createPatient(firstName, lastName, age, weight).then(
        (patientId) => {
          incidentRepoContext
            .updateReport(patientId, reportId)
            .catch(console.log);
        },
        (err) => console.log('Error: ' + err),
      );
    } else {
      console.log('null patientRepo');
    }
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={styles.text}>
        Enter your details and the results will be saved in your profile
      </Text>
      <SafeAreaView style={styles.inputAreaContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFirstName}
          value={firstNameOfUser}
          placeholder="First Name"
          returnKeyType="done"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastNameOfUser}
          placeholder="Last Name"
          returnKeyType="done"
        />
        <TextInput
          maxLength={3}
          style={styles.input}
          onChangeText={onChangeAge}
          value={ageOfUser}
          placeholder="Age"
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <TextInput
          maxLength={3}
          style={styles.input}
          onChangeText={onChangeWeight}
          value={weightOfUser}
          placeholder="Weight in kg"
          keyboardType="numeric"
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            onCreatePatient(
              firstNameOfUser,
              lastNameOfUser,
              ageOfUser,
              weightOfUser,
            );
            navigation.navigate('Home');
          }}
        >
          <Text style={uiStyle.buttonLabel}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={uiStyle.buttonLabel}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  bottomButton: {
    marginLeft: 10,
    marginRight: 10,
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

export default CreateProfileScreen;
