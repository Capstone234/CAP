import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/DoctorReviewStyle';

const DoctorReview = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    doctorName = '',
    physicalSelectedSymptoms = [],
    cognitiveSelectedSymptoms = [],
    emotionalSelectedSymptoms = [],
    sleepSelectedSymptoms = [],
    signature = '',
  } = route.params || {};

  const renderSymptomsWithBullets = (symptoms) => {
    return symptoms.map((symptom, index) => (
      <Text key={index} style={styles.bulletPoint}>
        • {symptom}
      </Text>
    ));
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Review</Text>

      <Text style={styles.centeredText}>Doctor's Name: {doctorName}</Text>

      <Text style={styles.categoryTitle}>Physical Symptoms:</Text>
      <View style={styles.symptomBox}>
        {physicalSelectedSymptoms.length > 0 ? (
          renderSymptomsWithBullets(physicalSelectedSymptoms)
        ) : (
          <Text style={styles.noSymptomText}>No symptoms</Text>
        )}
      </View>

      <Text style={styles.categoryTitle}>Cognitive (thinking) Symptoms:</Text>
      <View style={styles.symptomBox}>
        {cognitiveSelectedSymptoms.length > 0 ? (
          renderSymptomsWithBullets(cognitiveSelectedSymptoms)
        ) : (
          <Text style={styles.noSymptomText}>No symptoms</Text>
        )}
      </View>

      <Text style={styles.categoryTitle}>Emotional Symptoms:</Text>
      <View style={styles.symptomBox}>
        {emotionalSelectedSymptoms.length > 0 ? (
          renderSymptomsWithBullets(emotionalSelectedSymptoms)
        ) : (
          <Text style={styles.noSymptomText}>No symptoms</Text>
        )}
      </View>

      <Text style={styles.categoryTitle}>Sleep Symptoms:</Text>
      <View style={styles.symptomBox}>
        {sleepSelectedSymptoms.length > 0 ? (
          renderSymptomsWithBullets(sleepSelectedSymptoms)
        ) : (
          <Text style={styles.noSymptomText}>No symptoms</Text>
        )}
      </View>

      <Text style={styles.categoryTitle}>Doctor's Signature:</Text>
      {signature ? (
        <View style={styles.signatureContainer}>
          <Image
            source={{ uri: signature }}
            style={styles.signatureImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <Text style={styles.noSymptomText}>No signature provided</Text>
      )}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DoctorReview;
