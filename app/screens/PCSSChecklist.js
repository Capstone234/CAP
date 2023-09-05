import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

// import uiStyle from '../components/uiStyle';
import Slider from '@react-native-community/slider';
import { useContext, useState} from 'react';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';



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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={uiStyle.text}>
          Does the affected person have any of these symptoms?
        </Text>

        <View style={uiStyle.contentContainer}>
            <View style={styles.sliders}>
              {optionSliders.map((option) => (
                <View key={option.key}>
                  <View style={styles.sliderOne}>
                    <Text style={[styles.text]}>{option.label}:</Text>
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
          style={styles.bottomButton}
        >
          <Text style={styles.buttonLabel}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const uiStyle = StyleSheet.create({
  text: {
    // text for tests
     // text for long instructions
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/20,
    lineHeight: Dimensions.get('window').width/15,
    letterSpacing: 0.3,
    marginHorizontal: Dimensions.get('window').width/10,
    marginVertical: Dimensions.get('window').width/15,
    textAlign: 'center',
  },// Container for main contents of a screen excluding bottom navigation button
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#9AD3FF'
  },
  sliders: {
    width: '80%',
  },

  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/20,
    marginHorizontal: Dimensions.get('window').width/500,
    marginVertical: Dimensions.get('window').width/15,
    textAlign: 'left',
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height)/20,
    alignSelf: 'center',
  }
});

export default PCSSChecklist;
