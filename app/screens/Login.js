import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  Alert,
  View,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  UserContext,
  UserRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/LoginScreenStyle';
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function LoginScreen({ navigation }){
  const [users, setUsers] = useState([]);
  const userRepoContext = useContext(UserRepoContext);
  const [, setUser] = useContext(UserContext);
  const mounted = useRef(false);
  const [usernameValue, onChangeUsername] = useState('');
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
      // Everytime there is a new userRepoContext we
      // get users from it.
      if (userRepoContext !== null) {
        userRepoContext.getAllUsers().then((pts) => {
          if (mounted.current) {
            console.log(pts);
            setUsers(pts);
          }
        });
      } else {
        console.log('null patientRepo');
      }
    }
  }, [focussed]);

  //this function checks if a user exists on the db, and if it does then we
  //set them as the current user.
  const checkSetUser = (usernameInput, passwordInput)=> {
    if (userRepoContext !== null) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username == usernameInput &&
            users[i].password == passwordInput)
        {
          setUser(users[i]);
          return true;
        }
      }
      return false;
    }
  }

  //this function sends an alter if you put the wrong credentials
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

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      resetScrollToCoords={{x: 0, y: 0}}
      enableResetScrollToCoords={true}
      enableOnAndroid={true}
      scrollEnabled={false}
    >
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
              testID='username' accessible={true} accessibilityLabel={'username'} label='username'
              style={styles.input}
              onChangeText={onChangeUsername}
              value={usernameValue}
              placeholder="Username"
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
                if (usernameValue == '') {
                  alert('Please enter username.');
                } else {
                  if (checkSetUser(
                        usernameValue,
                        passwordValue
                  )) {
                    Alert.alert('Successfully logged in');
                    navigation.navigate('Home Page');
                  } else {
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
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;