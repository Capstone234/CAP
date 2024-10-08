import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/DoctorChecklistStyles/CognitiveChecklistStyle';
import { useNavigation } from '@react-navigation/native';

const CognitiveChecklist = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(Array(4).fill(false));

  const toggleSelection = (index) => {
    const updatedSelection = [...selected];
    updatedSelection[index] = !updatedSelection[index];
    setSelected(updatedSelection);
  };

  const resetSelections = () => {
    setSelected(Array(4).fill(false));
  };

  const handleConfirm = () => {
    const cognitiveSelectedCount = selected.filter(Boolean).length;
    const selectedSymptomsCognitive = symptoms.filter((_, index) => selected[index]);
    console.log('Cognitive Confirmed', cognitiveSelectedCount);
    console.log('Selected Cognitive Symptoms:', selectedSymptomsCognitive);

    navigation.navigate('Continue Tests', {
        screen: 'Doctor Part',
        params: { cognitiveSelectedCount, selectedSymptomsCognitive }});
  };

  const handleCancel = () => {
    console.log('Cognitive Cancelled');
    resetSelections();
  };

  const symptoms = [
    "Feeling mentally foggy",
    "Problems concentrating",
    "Problems remembering",
    "Feeling slowed down",
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="back-button" style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#003A67" />
      </TouchableOpacity>

      <Text testID="title" style={styles.title}>Cognitive(thinking)</Text>

      {symptoms.map((symptom, index) => (
        <View key={index} style={styles.symptomRow}>
          <Text style={styles.symptomText}>{symptom}</Text>
          <TouchableOpacity onPress={() => toggleSelection(index)}>
            <Ionicons
              name={selected[index] ? "radio-button-on" : "radio-button-off"}
              size={24}
              color={selected[index] ? "#003A67" : "#003A67"}
            />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity testID="confirm-button" style={styles.actionButton} onPress={handleConfirm}>
          <Ionicons name="checkmark-circle" size={70} color="green" />
        </TouchableOpacity>

        <TouchableOpacity testID="cancel-button" style={styles.actionButton} onPress={handleCancel}>
          <Ionicons name="close-circle" size={70} color="red" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity testID="reset-button" style={styles.resetButton} onPress={resetSelections}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CognitiveChecklist;
