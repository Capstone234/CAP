import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/DoctorChecklistStyles/EmotionalChecklistStyle';
import { useNavigation } from '@react-navigation/native';

const EmotionalChecklist = () => {
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
    const emotionalSelectedCount = selected.filter(Boolean).length;
    const selectedSymptomsEmotional = symptoms.filter((_, index) => selected[index]);

    console.log('Emotional Confirmed:', emotionalSelectedCount);
    console.log('Selected Emotional Symptoms:', selectedSymptomsEmotional);

    navigation.navigate('Continue Tests', {
      screen: 'Doctor Part',
      params: { emotionalSelectedCount, selectedSymptomsEmotional },
    });
  };

  const handleCancel = () => {
    console.log('Emotional Cancelled');
    resetSelections();
  };

  const symptoms = [
    "Irritability",
    "Sadness",
    "Feeling more emotional than usual",
    "Nervousness",
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="back-button" style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#003A67" />
      </TouchableOpacity>

      <Text testID="title" style={styles.title}>Emotional</Text>

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

export default EmotionalChecklist;
