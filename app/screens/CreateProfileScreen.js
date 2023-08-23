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
/**
 * The screen will ask user to fill in details so their result can be saved in
 * their account.
 */
function CreateProfileScreen({ navigation }) {
  // Context variables
  const [reportId] = useContext(ReportIdContext);
  const accountRepoContext = useContext(AccountRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  const [firstNameOfUser, onChangeFirstName] = useState('');
  const [lastNameOfUser, onChangeLastName] = useState('');
  const [ageOfUser, onChangeAge] = useState('');
  const [weightOfUser, onChangeWeight] = useState('');
  const [password, onChangePassword] = useState('');

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const onCreateAccount = (firstName, lastName, age, weight, password) => {
    if (accountRepoContext !== null) {
      accountRepoContext.createAccount(firstName, lastName, age, weight, password).then(
        (accountId) => {
          incidentRepoContext
            .updateReport(accountId, reportId)
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
      <View style={styles.titlecontainer}>
      <Text style={styles.text}>
        Enter your details and the results will be saved in your profile
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
        <TextInput
          maxLength={15}
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password (maximum 15 characters)"
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.bottomButton, styles.shadowProp]}
          onPress={() => {

            // Checking that none of the text fields are empty          
            if (firstNameOfUser == ''){
              alert('Please enter first name.');
            } else if (lastNameOfUser == ''){
              alert('Please enter last name.')
            } else if (ageOfUser == ''){
              alert('Please enter age.')
            } else if (weightOfUser == ''){
              alert('Please enter weight.')
            } else if (password == ''){
              alert('Please enter password.')
            } else if (password.length <5){
              alert('Please enter more than 5 characters for the password.')
            }
            else {
              onCreateAccount(
                firstNameOfUser,
                lastNameOfUser,
                ageOfUser,
                weightOfUser,
                password,
              );
              navigation.navigate('Home Page');
            }
          }}
        >
          <Text style={uiStyle.buttonLabel}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, styles.shadowProp]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={uiStyle.buttonLabel}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputAreaContainer: {
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
    backgroundColor: '#FFFFFF',
  },
  titlecontainer: {
    width: Dimensions.get('window').width/1.2,
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
    marginBottom: (Dimensions.get('window').height)/500,
    marginTop: (Dimensions.get('window').height)/15,
  },
  text: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/25,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottomButton: {
    width: Dimensions.get('window').width/2.5,
    height: Dimensions.get('window').width/10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: (Dimensions.get('window').height)/800,
    marginTop: (Dimensions.get('window').height)/40,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default CreateProfileScreen;
