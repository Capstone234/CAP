import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/ActionPlanScreenNewStyle';

const ActionPlanScreenNew = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../../assets/b3.png')}>
        <View style={styles.titleTextBox}>
          <Text style={styles.titleText}>Concussion Action Plan</Text>
        </View>

        <View style={styles.stackedTextBox}>
          <Text testID = 'plan-text' style={styles.stackedText}>
            {'\n'}The plan is designed to guide you through the
            Concussion Action Plan (CAP),
            helping you monitor and manage concussion recovery.
            {'\n'}{'\n'}
            You will be able to track symptoms, receive tailored advice,
            and follow step-by-step guidance through different recovery stages.
          </Text>
        </View>

        <View style={styles.bottomContainer}>
         <View style={styles.startBox}>
           <TouchableOpacity
            testID = 'start-button'
            style={styles.button}
            onPress={() => navigation.navigate('Continue Tests',{screen: 'CAPSelectPage'})}
           >
             <Text style={styles.buttonLabel}>Start</Text>
           </TouchableOpacity>
         </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ActionPlanScreenNew;






