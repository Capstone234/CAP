import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/DoctorInformationStyles/DoctorSignStyle';

const DoctorSign = () => {
  const signRef = useRef();
  const navigation = useNavigation();
  const route = useRoute();

  const {
    doctorName = '',
    physicalSelectedSymptoms = [],
    cognitiveSelectedSymptoms = [],
    emotionalSelectedSymptoms = [],
    sleepSelectedSymptoms = [],
  } = route.params || {};

  const handleSave = (signature) => {
    console.log("Signature saved");

    navigation.navigate('Continue Tests', {
      screen: 'Doctor Review',
      params: {
        doctorName,
        physicalSelectedSymptoms,
        cognitiveSelectedSymptoms,
        emotionalSelectedSymptoms,
        sleepSelectedSymptoms,
        signature
      }
    });
  };

  const handleClear = () => {
    signRef.current.clearSignature();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor's Signature</Text>

      <View style={styles.signatureContainer}>
        <Signature
          ref={signRef}
          onOK={handleSave}
          onEmpty={() => console.log("Signature cleared")}
          descriptionText="Sign above"
          clearText="Clear"
          confirmText="Save"
          webStyle={`.m-signature-pad--footer {display: none;}`}
          style={styles.signatureCanvas}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => signRef.current.readSignature()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View>
        <Text>Doctor's Name: {doctorName}</Text>
        <Text>Physical Symptoms: {physicalSelectedSymptoms.join(', ')}</Text>
        <Text>Cognitive Symptoms: {cognitiveSelectedSymptoms.join(', ')}</Text>
        <Text>Emotional Symptoms: {emotionalSelectedSymptoms.join(', ')}</Text>
        <Text>Sleep Symptoms: {sleepSelectedSymptoms.join(', ')}</Text>
      </View>
    </View>
  );
};

export default DoctorSign;
