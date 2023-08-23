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
  AccountRepoContext,
  PrelimReportIdContext,
  PreliminaryReportRepoContext
  
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../components/uiStyle';
import { useIsFocused } from "@react-navigation/native";

// function checkPatient(firstNameValue, lastNameValue){
//     const [reportId] = useContext(ReportIdContext);
//   const patientRepoContext = useContext(PatientRepoContext);
//   const incidentRepoContext = useContext(IncidentReportRepoContext);
//   const [, setPatient] = useContext(PatientContext);
//     if (patientRepoContext !== null) {
//         var patients = patientRepoContext.getAllPatients();
//         for(var patient in patients){
//             if(patient.firstName == firstNameValue && patient.lastName == lastNameValue){
//                 setPatient(patient);
//                 return true;
//             }
//         }
//         return false;
//     }
// }
function LoginScreen({ navigation }){
  const [accounts, setAccounts] = useState([]);
  const patientRepoContext = useContext(PatientRepoContext);
  const accountRepoContext = useContext(AccountRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [, setAccount] = useContext(AccountContext);
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [prelimReportId] = useContext(PrelimReportIdContext);
  const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [firstNameOfUser, onChangeFirstName] = useState('');
  const [lastNameOfUser, onChangeLastName] = useState('');
  const [passwordValue, onChangePassword] = useState('');
  const focussed = useIsFocused();

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (focussed) {
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
  }
    
  }, [focussed]);

  const checkAccount = (firstNameValue, lastNameValue, passwordValue)=> {
    if (accountRepoContext !== null) {
        
        for(let i = 0; i< accounts.length; i++){
            if(accounts[i].first_name == firstNameValue && accounts[i].last_name == lastNameValue && accounts[i].password == passwordValue){
                setAccount(accounts[i]);
                if(reportId != null){
                    incidentRepoContext.updateReport(accounts[i].account_id, reportId);
                }
                if(prelimReportId != 0){
                    incidentRepoContext.updatePrelimReport(accounts[i].account_id, prelimReportId);
                }
                return true;
            }
        }
        return false;
    }
}
    const createAlert = () =>
    Alert.alert(
      'Alert',
      'Incorrect Login',
      [
        { 
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
    return(
      <SafeAreaView style={uiStyle.container}>
      <View style={styles.imagecontainer}>
        <ImageBackground source = {require('../../assets/logo.png')} style={styles.image}></ImageBackground>
      </View>
      <View style={styles.titlecontainer}>
      <Text style={styles.text}>
        Enter your first name and last name to login
      </Text>
      <SafeAreaView style={styles.inputAreaContainer}>
        <TextInput
          testID='first_name' accessible={true} accessibilityLabel={'first_name'} label='first_name'
          style={styles.input}
          onChangeText={onChangeFirstName}
          value={firstNameOfUser}
          placeholder="First Name"
          returnKeyType="done"
        />
        <TextInput
          testID='last_name' accessible={true} accessibilityLabel={'last_name'} label='last_name'
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastNameOfUser}
          placeholder="Last Name"
          returnKeyType="done"
        />
        <TextInput
          testID='password' accessible={true} accessibilityLabel={'password'} label='password'
          style={styles.input}
          onChangeText={onChangePassword}
          value={passwordValue}
          secureTextEntry={true}
          placeholder="Password"
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
            } else {
              if(checkAccount(
                firstNameOfUser,
                lastNameOfUser,
                passwordValue
              )){
                Alert.alert('Successfully logged in');
                  navigation.navigate('Home Page');
              }else{
                  createAlert();
              };
            }
          }}
        >
          <Text style={uiStyle.buttonLabel}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bottomButton, styles.shadowProp]}
          onPress={() => navigation.navigate('Continue Tests', {screen: 'Create Profile'})}
        >
          <Text style={uiStyle.buttonLabel}>Sign Up</Text>
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
    titlecontainer: {
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height)/500,
      marginTop: (Dimensions.get('window').height)/15,
    },
    imagecontainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/5,
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height)/500,
      marginTop: (Dimensions.get('window').height)/800,
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
    image: {
      width: Dimensions.get('window').width/2.8,
      height: Dimensions.get('window').width/2.8,
      marginBottom: (Dimensions.get('window').height)/1,
      marginTop: (Dimensions.get('window').height)/15,
      resizeMode: 'cover',
      alignItems: 'center',
    },
  });


export default LoginScreen;