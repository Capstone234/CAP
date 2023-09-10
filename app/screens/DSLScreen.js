import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert
} from 'react-native';

import uiStyle from '../styles/uiStyle';
import Slider from '@react-native-community/slider';
import styles from '../styles/DSLScreenStyle';
import { useContext, useState, useEffect} from 'react';
import {
  PreliminaryReportRepoContext,
  DSLIdContext,
  AccountContext
} from '../components/GlobalContextProvider';
import PCSSChecklistScreenStyle from '../styles/PCSSChecklistScreenStyle';


function DSLScreen({ navigation }) {
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [dslId, setDSLId] = useContext(DSLIdContext);
  const [account] = useContext(AccountContext);

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
  });

  const handleSliderChange = (option, value) => {
    // Update the slider value
    setSliderValues({ ...sliderValues, [option]: value });

    // Update the touch position for the Text element
    const marginLeft = value * 50; // Adjust this factor as needed
    setTouchPositions({ ...touchPositions, [option]: marginLeft });
  };

  const resetSliderValues = () => {
    const resetValues = {};
    for (const option of optionSliders) {
      resetValues[option.key] = 0;
    }
    setSliderValues(resetValues);
  };

  const resetTouchPositions = () => {
    const resetPositions = {};
    for (const option of optionSliders) {
      resetPositions[option.key] = 0;
    }
    setTouchPositions(resetPositions);
  };

  // Create refs for sliders components
  const sliderRefs = {};

  // Function to reset the sliders and text positions to 0
  const resetSlidersAndText = () => {
    for (const option of optionSliders) {
      // Reset the slider value to 0
      resetSliderValues();
      sliderRefs[option.key].setNativeProps({ value: 0 });
      resetTouchPositions();
    }
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
  ];
  
  const createAlert = () =>
  Alert.alert(
    'Alert',
    'Need to login to do the test.',
    [
      {
        text: 'Save to a profile',
        onPress: () => navigation.navigate('Login'),
      },
      
    ],
  );

  useEffect(() => {
    if(account.account_id == null && account.first_name == 'John'){
      createAlert();
    }
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
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
                    ref={(ref) => (sliderRefs[option.key] = ref)} // Attach the ref to the Slider component
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

        <TouchableOpacity
          onPress={() => {

            const totalSliderValue = Object.values(sliderValues).reduce(
              (acc, currentValue) => acc + currentValue,
              0
            );
            
            let currentDate = new Date();
            currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toJSON().slice(0,19);
    
            preliminaryReportRepoContext.createDSL(account.account_id, currentDate, sliderValues['headache'], sliderValues['nausea'], sliderValues['vomiting'], sliderValues['balance'], sliderValues['dizziness'], sliderValues['fatique'], sliderValues['light'], sliderValues['noise'],sliderValues['numb'],
            sliderValues['foggy'], sliderValues['slowed'], sliderValues['concentrating'], sliderValues['remembering'], sliderValues['drowsiness'], sliderValues['sleep_less'],sliderValues['sleep_more'],
            sliderValues['sleeping'],sliderValues['irritability'],sliderValues['sadness'],sliderValues['nervousness'], totalSliderValue).then((data)=>setDSLId(data));

            resetSlidersAndText();
            
            navigation.navigate('Continue Tests', { screen: 'DSL Complete'});

          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DSLScreen;