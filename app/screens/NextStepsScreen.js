import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground
} from 'react-native';

import uiStyle from '../styles/uiStyle';
import styles from '../styles/NextStepsScreenStyle';

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

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Mechanism Of Injury Check')}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default NextStepsScreen;
