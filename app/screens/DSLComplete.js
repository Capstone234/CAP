import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  ImageBackground
} from 'react-native';


import { MedicalReportRepoContext, PrelimReportIdContext, PreliminaryReportRepoContext, DSLIdContext} from '../components/GlobalContextProvider';

import { useContext } from 'react';
import uiStyle from '../components/uiStyle';

function DSLComplete({ navigation }) {
  preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [dslId, setDSLId] = useContext(DSLIdContext);
  
  
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
          source = {require('../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Daily Symptom Log Complete</Text>
          <Text style={uiStyle.stackedText}>
            You have successfully submitted your Daily Sympton Checkist, 
            please refer to action plan for further steps. 
            
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          preliminaryReportRepoContext.getDSL(dslId).then((data)=>console.log(data));
          navigation.navigate('Home Page');
          
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Return to Home</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff0000';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
    top: 50,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
  bottomButton: {
		width: Dimensions.get('window').width/1.3,
    	height: Dimensions.get('window').width/7.5,
		borderRadius: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: (Dimensions.get('window').height)/2.5,
		marginTop: (Dimensions.get('window').height)/20,
		alignSelf: 'center'
	},
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default DSLComplete;
