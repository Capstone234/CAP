import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/DoctorInformationStyles/DoctorNameStyle';

const DoctorName = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const {
    physicalSelectedSymptoms = [],
    cognitiveSelectedSymptoms = [],
    emotionalSelectedSymptoms = [],
    sleepSelectedSymptoms = [],
  } = route.params || {};

  const handleNext = () => {
    if (name.trim()) {
      navigation.navigate('Continue Tests', {
        screen: 'Doctor Sign',
        params: {
          doctorName: name,
          physicalSelectedSymptoms,
          cognitiveSelectedSymptoms,
          emotionalSelectedSymptoms,
          sleepSelectedSymptoms
        }
      });
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.titleText}>Doctor's Name</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View>
        <Text>Physical Symptoms: {physicalSelectedSymptoms.join(', ')}</Text>
        <Text>Cognitive Symptoms: {cognitiveSelectedSymptoms.join(', ')}</Text>
        <Text>Emotional Symptoms: {emotionalSelectedSymptoms.join(', ')}</Text>
        <Text>Sleep Symptoms: {sleepSelectedSymptoms.join(', ')}</Text>
      </View>
    </View>
  );
};

export default DoctorName;
