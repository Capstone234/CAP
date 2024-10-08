import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/DoctorChecklistStyles/PhysicalChecklistStyle';
import { useNavigation } from '@react-navigation/native';

const PhysicalChecklist = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(Array(10).fill(false));

  const toggleSelection = (index) => {
    const updatedSelection = [...selected];
    updatedSelection[index] = !updatedSelection[index];
    setSelected(updatedSelection);
  };

  const resetSelections = () => {
    setSelected(Array(10).fill(false));
  };

  const handleConfirm = () => {
    const physicalSelectedCount = selected.filter(Boolean).length;
    const selectedSymptomsPhysical = symptoms.filter((_, index) => selected[index]);
    console.log('Physical Confirmed', physicalSelectedCount);
    console.log('Selected Physical Symptoms:', selectedSymptomsPhysical);

    navigation.navigate('Continue Tests', {
        screen: 'Doctor Part',
        params: { physicalSelectedCount, selectedSymptomsPhysical }});
  };

  const handleCancel = () => {
    console.log('Physical Cancelled');
    resetSelections();
  };

  const symptoms = [
    "Headache/s",
    "Nausea",
    "Sensitivity to light",
    "Sensitivity to noise",
    "Fatigue",
    "Vomiting",
    "Numbness / tingling",
    "Visual problems",
    "Dizziness",
    "Balance problems",
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity testID="back-button" style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#003A67" />
      </TouchableOpacity>

      <Text testID="title" style={styles.title}>Physical</Text>

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

export default PhysicalChecklist;

































