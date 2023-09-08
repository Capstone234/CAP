import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import uiStyle from '../styles/uiStyle';
import Slider from '@react-native-community/slider';
import { useContext, useState} from 'react';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';

import PCSSChecklistScreenStyle from '../styles/PCSSChecklistScreenStyle';

function PCSSChecklist({ navigation }) {
  const [sliderValues, setSliderValues] = useState({
    headache: 0,
    nausea: 0,
    vomiting: 0,
    balance: 0,
    dizziness: 0,
    fatigue: 0,
    light: 0,
    noise: 0,
    numb: 0,
    foggy: 0,
    slowed: 0,
    concentrating: 0,
    remembering: 0,
    drowsiness: 0,
    sleep_less: 0,
    sleep_more: 0,
    sleeping: 0,
    irritability: 0,
    sadness: 0,
    nervousness: 0,
    emotional: 0,
    blurry: 0,
  });

  const [touchPositions, setTouchPositions] = useState({
    headache: 0,
    nausea: 0,
    vomiting: 0,
    balance: 0,
    dizziness: 0,
    fatigue: 0,
    light: 0,
    noise: 0,
    numb: 0,
    foggy: 0,
    slowed: 0,
    concentrating: 0,
    remembering: 0,
    drowsiness: 0,
    sleep_less: 0,
    sleep_more: 0,
    sleeping: 0,
    irritability: 0,
    sadness: 0,
    nervousness: 0,
    emotional: 0,
    blurry: 0,
  });

  const handleSliderChange = (option, value) => {
    // Update the slider value
    setSliderValues({ ...sliderValues, [option]: value });

    // Update the touch position for the Text element
    const marginLeft = value * 50; // Adjust this factor as needed
    setTouchPositions({ ...touchPositions, [option]: marginLeft });
  };

  const optionSliders = [
    { label: 'Headache', key: 'headache' },
    { label: 'Nausea', key: 'nausea' },
    { label: 'Vomiting', key: 'vomiting' },
    { label: 'Balance problems', key: 'balance' },
    { label: 'Dizziness', key: 'dizziness' },
    { label: 'Fatigue/Low energy', key: 'fatigue' },
    { label: 'Sensitivity to light', key: 'light' },
    { label: 'Sensitivity to noise', key: 'noise' },
    { label: 'Numbness/Tingling', key: 'numb' },
    { label: 'Feeling mentally foggy', key: 'foggy' },
    { label: 'Feeling slowed down', key: 'slowed' },
    { label: 'Difficulty concentrating', key: 'concentrating' },
    { label: 'Difficulty remembering', key: 'remembering' },
    { label: 'Drowsiness', key: 'drowsiness' },
    { label: 'Sleeping less than usual', key: 'sleep_less' },
    { label: 'Sleeping more than usual', key: 'sleep_more' },
    { label: 'Trouble falling asleep', key: 'sleeping' },
    { label: 'Irritability', key: 'irritability' },
    { label: 'Sadness', key: 'sadness' },
    { label: 'Nervousness', key: 'nervousness' },
    { label: 'Feeling more emotional', key: 'emotional' },
    { label: 'Blurry/Double Vision', key: 'blurry' },
  ];

  return (
    <SafeAreaView style={PCSSChecklistScreenStyle.container}>
      <ScrollView>
        <Text style={uiStyle.text}>
          Does the affected person have any of these symptoms?
        </Text>

        <View style={uiStyle.contentContainer}>
            <View style={PCSSChecklistScreenStyle.sliders}>
              {optionSliders.map((option) => (
                <View key={option.key}>
                  <View style={PCSSChecklistScreenStyle.sliderOne}>
                    <Text style={[PCSSChecklistScreenStyle.text]}>{option.label}:</Text>
                  </View>
                  <Slider
                    testID={option.key}
                    accessible={true}
                    accessibilityLabel={option.key}
                    label={option.label}
                    minimumValue={0}
                    maximumValue={6}
                    step={1}
                    onValueChange={(val) => handleSliderChange(option.key, val)}
                  />
                  <Text style={{ marginLeft: touchPositions[option.key] }}>
                    {sliderValues[option.key]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
      </ScrollView>
        <TouchableOpacity
          onPress={() => {
            const totalSliderValue = Object.values(sliderValues).reduce(
              (acc, currentValue) => acc + currentValue,
              0
            );
            navigation.navigate('Incident Report Result', {
              sliderResult: totalSliderValue,
            });
          }}
          style={PCSSChecklistScreenStyle.bottomButton}
        >
          <Text style={PCSSChecklistScreenStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PCSSChecklist;
