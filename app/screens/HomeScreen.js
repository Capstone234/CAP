import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Alert,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import uiStyle from '../components/uiStyle';
import { useContext } from 'react';
import {
  IncidentReportRepoContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';

const RootStack = createNativeStackNavigator();

/**
 * Starting screen that handles navigation to main app flows.
 *
 * @param navigation used to move to the other screens
 */
function HomeScreen({ navigation }) {
  const createAlert = () =>
    Alert.alert(
      'Alert',
      'We strongly recommend you have someone else do the concussion check for you',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => navigation.navigate('Continue Tests', { screen: 'Red flags checklist' } ),
        },
      ],
    );

  return (
    
    <View style={styles.screen}>
     <View style={styles.container}>
        <ImageBackground source = {require('../../assets/logo.png')} style={styles.image}>
         <View style={styles.containerText}>
            <Text style={styles.titleText}>Concussion Check</Text> 
            
            <ImageBackground source = {require('../../assets/b2.png')} style={styles.imageBackground}>
            <View style={[styles.containerButton, styles.shadowProp]}>
              <TouchableOpacity onPress={createAlert} style={styles.startCheckButton}>
                <Text style={styles.buttonLabel}>Begin Check</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Continue Tests', {screen: 'All Reports'}) } style={[styles.viewHistoryButton, styles.shadowProp]}>
                <Text style={styles.buttonLabel}>View Reports</Text>
              </TouchableOpacity>
              </View>      
             </ImageBackground>       
                
          </View>
         </ImageBackground>
        </View>
      </View>
    
  );
}

// https://reactnative.dev/docs/colors
const title = '#fff';
const text = '#fff';
const background = '#349BEB';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
  },
  startCheckButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: (Dimensions.get('window').height)/100,
    marginTop: (Dimensions.get('window').height)/25,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  viewHistoryButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#ffff',
    marginTop: (Dimensions.get('window').height)/40,
  },
  buttonLabel: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/20,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  containerText: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/20,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    marginTop: (Dimensions.get('window').height)/5
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
  },
  containerButton: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/4,
    alignItems: 'center',
    marginTop: -(Dimensions.get('window').height)/3
  },
  image: {
    width: Dimensions.get('window').width/2.8,
    height: Dimensions.get('window').width/2.8,
    marginBottom: (Dimensions.get('window').height)/1,
    marginTop: (Dimensions.get('window').height)/15,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imageBackground: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/7,
    alignItems: 'center',
    margin: Dimensions.get('window').height/2.3
  },
});

export default HomeScreen;
