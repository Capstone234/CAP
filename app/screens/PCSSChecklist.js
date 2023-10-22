import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PCSSChecklistScreenStyleheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../styles/uiStyle';
import Slider from '@react-native-community/slider';
import { useContext, useState} from 'react';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext,
} from '../components/GlobalContextProvider';
import * as Linking from "expo-linking";
import PCSSChecklistScreenStyle from '../styles/PCSSChecklistScreenStyle';

import preventBackAction from '../components/preventBackAction';

//Results are stored into the PCSS table.
function PCSSChecklist({ navigation }) {
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);

  preventBackAction();

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

  

  const handleSliderChange = (option, value) => {
    // Update the slider value
    setSliderValues({ ...sliderValues, [option]: value });

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

  async function handleSubmitPress() {
    var pass = 1;
    let sum = 0;
    for (const key in sliderValues) {
      sum += sliderValues[key];
    }

    if( sum > 35){
      pass = 0;
    }
    
    try {
      await incidentReportRepoContext.setPCSS(user.uid, incidentId, sliderValues.headache,
        sliderValues.nausea,
        sliderValues.vomiting, sliderValues.balance, sliderValues.dizziness, sliderValues.fatigue, sliderValues.light, 
        sliderValues.noise, sliderValues.numb, sliderValues.foggy, sliderValues.slowed, sliderValues.concentrating, 
        sliderValues.remembering, sliderValues.drowsiness, sliderValues.sleep_less, sliderValues.sleep_more, 
        sliderValues.sleeping, sliderValues.irritability, sliderValues.sadness, sliderValues.nervousness, 
        sliderValues.emotional, sliderValues.blurry, pass);
    } catch (error) {
          console.error('Error while setting PCSS test:', error);
    }
    // let c = await incidentReportRepoContext.getPCSS(user.uid, incidentId);
    // console.log('Saved', c);
  }
  return (
    <SafeAreaView style={PCSSChecklistScreenStyle.container}>
      <Text
        style={uiStyle.text}
        adjustsFontSizeToFit={true}
        numberOfLines={2}
      >
        Does the affected person have any of these symptoms?
      </Text>

      <ScrollView>
        <View style={uiStyle.contentContainer}>
            <View style={PCSSChecklistScreenStyle.sliders}>
              {optionSliders.map((option) => (
                <View key={option.key}>
                  <View style={PCSSChecklistScreenStyle.sliderOne}>
                    <Text style={[PCSSChecklistScreenStyle.text]}>{option.label}:       {sliderValues[option.key]}</Text>
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
                  
                </View>
              ))}
            </View>
          </View>
      </ScrollView>
        <TouchableOpacity
          onPress={() => {
            handleSubmitPress();

            let sum = 0;
            for (const key in sliderValues) {
              sum += sliderValues[key];
            }

          // Log the sum (ref.)
          // console.log('Sum of slider values:', sum);

            if( sum > 35){
              navigation.navigate('Check Result');
            }else{
              const totalSliderValue = Object.values(sliderValues).reduce(
                (acc, currentValue) => acc + currentValue,
                0
              );
              incidentReportRepoContext.incrementTestStage(incidentId)
              navigation.navigate('Incident Report Result', {
                sliderResult: totalSliderValue,
              });

            }


          }}
          style={[PCSSChecklistScreenStyle.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PCSSChecklist;
