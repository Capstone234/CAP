import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from "@expo/vector-icons";
import uiStyle from '../styles/uiStyle';
import styles from '../styles/NextStepsScreenStyle';

import preventBackAction from '../components/preventBackAction';

function NextStepsScreen({ navigation }) {

  preventBackAction();

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Information</Text>
        <ImageBackground style={styles.image}
            source = {require('../../assets/b3.png')}>
           <View style={uiStyle.infoTextContainer}>
              <ScrollView style={uiStyle.stackedTextBox}>
                <Text style={uiStyle.stackedText}>
                  At this stage, the affected individual presents no symptoms
                  necessitating hospitalization.
                  {'\n'}{'\n'}
                  However, if they do develop any of the previous symptoms, immediately
                  call for an ambulance or take them to the hospital.
                  {'\n'}{'\n'}
                  The next tests will help further assess the severity of the injury.
                </Text>
              </ScrollView>
            </View>

          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Mechanism Of Injury Check')}
              style={[styles.bottomButton, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
            >
              <Text style={[styles.buttonLabel, { flex: 1 }]}>Start</Text>
              <Ionicons name="arrow-forward-circle-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default NextStepsScreen;
