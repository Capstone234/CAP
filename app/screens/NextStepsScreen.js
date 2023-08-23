import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';

import uiStyle from '../components/uiStyle';

function NextStepsScreen({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Information</Text>
      <ImageBackground style={styles.image} 
          source = {require('../../assets/b3.png')}> 
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          At this stage, the affected individual presents no symptoms
          necessitating hospitalisation.
          {'\n'} {'\n'}
          However, if they do develop any of the previous symptoms, immediately
          call for an ambulance or take them to hospital.
          {'\n'} {'\n'}
          The next tests will help further assess the severity of injury.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Mechanism Of Injury Check')}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Start</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/4,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.27,
    resizeMode: 'cover',
  }
});

export default NextStepsScreen;
