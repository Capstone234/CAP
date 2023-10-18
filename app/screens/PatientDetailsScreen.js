import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  UserContext,
  UserRepoContext,
  IncidentIdContext,
  IncidentReportRepoContext,
} from '../components/GlobalContextProvider';
import StringUtils from '../model/database/StringUtils';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/CreateProfileScreenStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/**
 * The screen will ask user to fill in patient details
 */
function PatientDetailsScreen({ navigation }) {
  // Context variables
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);

  const [user, setUser] = useContext(UserContext);
  const userRepoContext = useContext(UserRepoContext);
  const [firstNameOfUser, onChangeFirstName] = useState('');
  const [lastNameOfUser, onChangeLastName] = useState('');
  const [ageOfUser, onChangeAge] = useState('');
  const [weightOfUser, onChangeWeight] = useState('');
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // add patient details into database for Incident table
  const updatePatient = (firstName, lastName, age, weight) => {
    if (incidentReportRepoContext !== null) {
      const patientInfoRaw = [firstName, lastName, age, weight];
      const patientInfo = StringUtils.join(patientInfoRaw);
      console.log(patientInfo);
      incidentReportRepoContext.updateIncidentPatient(user.uid, incidentId, patientInfo);
    } else {
      console.log('null reportRepo');
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      resetScrollToCoords={{x: 0, y: 0}}
      enableResetScrollToCoords={true}
      enableOnAndroid={true}
      scrollEnabled={false}
    >
      <SafeAreaView style={uiStyle.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.text}>
            Enter the Patient Details:
          </Text>
          <SafeAreaView style={styles.inputAreaContainer}>
            <TextInput
              maxLength={25}
              style={styles.input}
              onChangeText={onChangeFirstName}
              value={firstNameOfUser}
              placeholder="First Name"
              returnKeyType="done"
            />
            <TextInput
              maxLength={25}
              style={styles.input}
              onChangeText={onChangeLastName}
              value={lastNameOfUser}
              placeholder="Last Name"
              returnKeyType="done"
            />
            <TextInput
              testID='age' accessible={true} accessibilityLabel={'age'} label='age'
              maxLength={3}
              style={styles.input}
              onChangeText={onChangeAge}
              value={ageOfUser}
              placeholder="Age"
              keyboardType="number-pad"
              returnKeyType="done"
            />
            <TextInput
              testID='weight' accessible={true} accessibilityLabel={'weight'} label='weight'
              maxLength={3}
              style={styles.input}
              onChangeText={onChangeWeight}
              value={weightOfUser}
              placeholder="Weight in kg"
              keyboardType="numeric"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.bottomButton, styles.shadowProp]}
              onPress={() => {
                // Checking that none of the text fields are empty
                if (firstNameOfUser == '') {
                  alert('Please enter first name.')
                }else if (lastNameOfUser == '') {
                  alert('Please enter last name.')
                } else if (ageOfUser == '') {
                  alert('Please enter age.')
                } else if (weightOfUser == '') {
                  alert('Please enter weight.')
                } else {
                  updatePatient(
                    firstNameOfUser,
                    lastNameOfUser,
                    ageOfUser,
                    weightOfUser,
                  );
                  navigation.navigate('Test List');
                }
              }}
            >
              <Text style={uiStyle.buttonLabel}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomButton, styles.shadowProp]}
              onPress={() => navigation.navigate('Test List')}
            >
              <Text style={uiStyle.buttonLabel}>Back</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
export default PatientDetailsScreen;