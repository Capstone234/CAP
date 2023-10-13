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
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/CreateProfileScreenStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

/**
 * The screen will ask user to fill in details so their result can be saved in
 * their account.
 */
function CreateProfileScreen({ navigation }) {
  // Context variables
  const userRepoContext = useContext(UserRepoContext);

  const [usernameOfUser, onChangeUsername] = useState('');
  const [firstNameOfUser, onChangeFirstName] = useState('');
  const [lastNameOfUser, onChangeLastName] = useState('');
  const [ageOfUser, onChangeAge] = useState('');
  const [weightOfUser, onChangeWeight] = useState('');
  const [emailOfUser, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const onCreateUser = (username, firstName, lastName, age, weight, email, password) => {
    if (userRepoContext !== null) {
      //commented some of this out because it is all about assigning an account
      //id which we are handling with auto increment, and then assigning a incident
      //report id which we will handle later.
      userRepoContext.createUser(username, firstName, lastName, age, weight, email, password)//.then(
      //   (accountId) => {
      //     incidentRepoContext
      //       .updateReport(accountId, reportId)
      //       .catch(console.log);
      //   },
      //   (err) => console.log('Error: ' + err),
      // );
    } else {
      console.log('null patientRepo');
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
          <Text
            style={styles.text}
            maxFontSizeMultiplier={1}
          >
            Enter your details and the results will be saved in your profile
          </Text>
          <SafeAreaView style={styles.inputAreaContainer}>
            <TextInput
              maxLength={25}
              style={styles.input}
              onChangeText={onChangeUsername}
              value={usernameOfUser}
              placeholder="Username"
              returnKeyType="done"
            />
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
              maxLength={25}
              style={styles.input}
              onChangeText={onChangeEmail}
              value={emailOfUser}
              placeholder="Email Address"
              returnKeyType="done"
            />
            <TextInput
              maxLength={15}
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              placeholder="Password (maximum 50 characters)"
              returnKeyType="done"
              maxFontSizeMultiplier={1}
            />
            <TouchableOpacity
              style={[styles.bottomButton, styles.shadowProp]}
              onPress={() => {
                // Checking that none of the text fields are empty
                if (usernameOfUser == '') {
                  alert('Please enter username.');
                } else if (firstNameOfUser == '') {
                  alert('Please enter first name.')
                }else if (lastNameOfUser == '') {
                  alert('Please enter last name.')
                } else if (ageOfUser == '') {
                  alert('Please enter age.')
                } else if (weightOfUser == '') {
                  alert('Please enter weight.')
                } else if (emailOfUser == '') {
                  alert('Please enter email.')
                } else if (password == '') {
                  alert('Please enter password.')
                } else if (password.length <5) {
                  alert('Please enter more than 5 characters for the password.')
                } else {
                  onCreateUser(
                    usernameOfUser,
                    firstNameOfUser,
                    lastNameOfUser,
                    ageOfUser,
                    weightOfUser,
                    emailOfUser,
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
    </KeyboardAwareScrollView>
  );
}

export default CreateProfileScreen;
