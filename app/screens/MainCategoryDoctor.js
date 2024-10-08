import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/MainCategoryDoctorStyle';

const MainCategoryDoctor = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedSymptomsPhysical, setSelectedSymptomsPhysical] = useState([]);
  const [selectedSymptomsCognitive, setSelectedSymptomsCognitive] = useState([]);
  const [selectedSymptomsEmotional, setSelectedSymptomsEmotional] = useState([]);
  const [selectedSymptomsSleep, setSelectedSymptomsSleep] = useState([]);

  const [physicalCount, setPhysicalCount] = useState(0);
  const [physicalButtonColor, setPhysicalButtonColor] = useState('#fff');
  const [isPhysicalSubmitted, setIsPhysicalSubmitted] = useState(false);

  const [cognitiveCount, setCognitiveCount] = useState(0);
  const [cognitiveButtonColor, setCognitiveButtonColor] = useState('#fff');
  const [isCognitiveSubmitted, setIsCognitiveSubmitted] = useState(false);

  const [emotionalCount, setEmotionalCount] = useState(0);
  const [emotionalButtonColor, setEmotionalButtonColor] = useState('#fff');
  const [isEmotionalSubmitted, setIsEmotionalSubmitted] = useState(false);

  const [sleepCount, setSleepCount] = useState(0);
  const [sleepButtonColor, setSleepButtonColor] = useState('#fff');
  const [isSleepSubmitted, setIsSleepSubmitted] = useState(false);

  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params?.physicalSelectedCount !== undefined) {
      setPhysicalCount(route.params.physicalSelectedCount);
      setSelectedSymptomsPhysical(route.params.selectedSymptomsPhysical || []);
      setPhysicalButtonColor('#00ff00');
      setIsPhysicalSubmitted(true);

      scaleValue.setValue(0);
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [route.params?.physicalSelectedCount]);

  useEffect(() => {
    if (route.params?.cognitiveSelectedCount !== undefined) {
      setCognitiveCount(route.params.cognitiveSelectedCount);
      setSelectedSymptomsCognitive(route.params.selectedSymptomsCognitive || []);
      setCognitiveButtonColor('#00ff00');
      setIsCognitiveSubmitted(true);

      scaleValue.setValue(0);
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [route.params?.cognitiveSelectedCount]);

  useEffect(() => {
    if (route.params?.emotionalSelectedCount !== undefined) {
      setEmotionalCount(route.params.emotionalSelectedCount);
      setSelectedSymptomsEmotional(route.params.selectedSymptomsEmotional || []);
      setEmotionalButtonColor('#00ff00');
      setIsEmotionalSubmitted(true);

      scaleValue.setValue(0);
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [route.params?.emotionalSelectedCount]);

  useEffect(() => {
    if (route.params?.sleepSelectedCount !== undefined) {
      setSleepCount(route.params.sleepSelectedCount);
      setSelectedSymptomsSleep(route.params.selectedSymptomsSleep || []);
      setSleepButtonColor('#00ff00');
      setIsSleepSubmitted(true);

      scaleValue.setValue(0);
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }
  }, [route.params?.sleepSelectedCount]);

  const allCategoriesSubmitted = isPhysicalSubmitted && isCognitiveSubmitted && isEmotionalSubmitted && isSleepSubmitted;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="physical-button"
        style={[styles.button, { backgroundColor: physicalButtonColor }]}
        onPress={() => navigation.navigate('Continue Tests', { screen: 'Physical Checklist', category: 'Physical' })}
      >
        <Text style={styles.buttonText}>Physical</Text>
        {isPhysicalSubmitted && (
          <Animated.View style={[styles.badge, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.badgeText}>{physicalCount}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        testID="cognitive-button"
        style={[styles.button, { backgroundColor: cognitiveButtonColor }]}
        onPress={() => navigation.navigate('Continue Tests', { screen: 'Cognitive Checklist', category: 'Cognitive' })}
      >
        <Text style={styles.buttonText}>Cognitive (thinking)</Text>
        {isCognitiveSubmitted && (
          <Animated.View style={[styles.badge, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.badgeText}>{cognitiveCount}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        testID="emotional-button"
        style={[styles.button, { backgroundColor: emotionalButtonColor }]}
        onPress={() => navigation.navigate('Continue Tests', { screen: 'Emotional Checklist', category: 'Emotional' })}
      >
        <Text style={styles.buttonText}>Emotional</Text>
        {isEmotionalSubmitted && (
          <Animated.View style={[styles.badge, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.badgeText}>{emotionalCount}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        testID="sleep-button"
        style={[styles.button, { backgroundColor: sleepButtonColor }]}
        onPress={() => navigation.navigate('Continue Tests', { screen: 'Sleep Checklist', category: 'Sleep' })}
      >
        <Text style={styles.buttonText}>Sleep</Text>
        {isSleepSubmitted && (
          <Animated.View style={[styles.badge, { transform: [{ scale: scaleValue }] }]}>
            <Text style={styles.badgeText}>{sleepCount}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        testID="next-button"
        style={[styles.nextButton, { backgroundColor: allCategoriesSubmitted ? '#003A67' : '#696969' }]}
        onPress={allCategoriesSubmitted ? () => navigation.navigate('Continue Tests', {
          screen: 'Doctor Name',
          params: {
            physicalSelectedSymptoms: selectedSymptomsPhysical,
            cognitiveSelectedSymptoms: selectedSymptomsCognitive,
            emotionalSelectedSymptoms: selectedSymptomsEmotional,
            sleepSelectedSymptoms: selectedSymptomsSleep
          }
        }) : () => {}}
        disabled={!allCategoriesSubmitted}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainCategoryDoctor;