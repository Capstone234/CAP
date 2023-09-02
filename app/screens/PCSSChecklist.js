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

import uiStyle from '../components/uiStyle';
import Slider from '@react-native-community/slider';
import { useContext, useState} from 'react';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';



function PCSSChecklist({ navigation }) {

  const [sliderOneValue, setSliderOneValue] = useState(0);
  const [sliderTwoValue, setSliderTwoValue] = useState(0);
  const [sliderThreeValue, setSliderThreeValue] = useState(0);
  const [sliderFourValue, setSliderFourValue] = useState(0);
  const [sliderFiveValue, setSliderFiveValue] = useState(0);
  const [sliderSixValue, setSliderSixValue] = useState(0);
  const [sliderSevenValue, setSliderSevenValue] = useState(0);
  const [sliderEightValue, setSliderEightValue] = useState(0);
  const [sliderNineValue, setSliderNineValue] = useState(0);
  const [sliderTenValue, setSliderTenValue] = useState(0);
  const [sliderElevenValue, setSliderElevenValue] = useState(0);
  const [sliderTwelveValue, setSliderTwelveValue] = useState(0);
  const [sliderThirteenValue, setSliderThirteenValue] = useState(0);
  const [sliderFourteenValue, setSliderFourteenValue] = useState(0);
  const [sliderFifteenValue, setSliderFifteenValue] = useState(0);
  const [sliderSixteenValue,setSliderSixteenValue] = useState(0);
  const [sliderSeventeenValue, setSliderSeventeenValue] = useState(0);
  const [sliderEighteenValue, setSliderEighteenValue] = useState(0);
  const [sliderNineteenValue, setSliderNineteenValue] = useState(0);
  const [sliderTwentyValue, setSliderTwentyValue] = useState(0);
  const [sliderTwentyOneValue, setSliderTwentyOneValue] = useState(0);
  const [sliderTwentyTwoValue, setSliderTwentyTwoValue] = useState(0);
  const [sliderTwentyThreeValue, setSliderTwentyThreeValue] = useState(0);



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={uiStyle.text}>
          Does the affected person have any of these symptoms?
        </Text>
        <View style={[uiStyle.contentContainer]}>
          <View style={styles.sliders}>
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Headache:</Text>
              <Text style={[styles.text]}>{sliderOneValue}</Text>
            </View>
            <Slider testID='headache' accessible={true} accessibilityLabel={'headache'} label='headache'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderOneValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nausea: </Text>
              <Text style={[styles.text]}>{sliderTwoValue}</Text>
            </View>
            <Slider testID='nausea' accessible={true} accessibilityLabel={'nausea'} label='nausea'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwoValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Vomiting:</Text>
              <Text style={[styles.text]}>{sliderThreeValue}</Text>
            </View>
            <Slider testID='vomiting' accessible={true} accessibilityLabel={'vomiting'} label='vomiting'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderThreeValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Balance problems:</Text>
              <Text style={[uiStyle.text]}>{sliderFourValue}</Text>
            </View>
            <Slider testID='balance' accessible={true} accessibilityLabel={'balance'} label='balance'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFourValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Dizziness:</Text>
              <Text style={[styles.text]}>{sliderFiveValue}</Text>
            </View>
            <Slider testID='dizziness' accessible={true} accessibilityLabel={'dizziness'} label='dizziness'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFiveValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Fatigue/Low energy:</Text>
              <Text style={[uiStyle.text]}>{sliderSixValue}</Text>
            </View>
            <Slider testID='fatigue' accessible={true} accessibilityLabel={'fatigue'} label='fatigue'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSixValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sensitivity to light:</Text>
              <Text style={[uiStyle.text]}>{sliderSevenValue}</Text>
            </View>
            <Slider testID='light' accessible={true} accessibilityLabel={'light'} label='light'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSevenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sensitivity to noise:</Text>
              <Text style={[uiStyle.text]}>{sliderEightValue}</Text>
            </View>
            <Slider testID='noise' accessible={true} accessibilityLabel={'noise'} label='noise'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderEightValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Numbness/Tingling:</Text>
              <Text style={[uiStyle.text]}>{sliderNineValue}</Text>
            </View>
            <Slider testID='numb' accessible={true} accessibilityLabel={'numb'} label='numb'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderNineValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Feeling mentally foggy:</Text>
              <Text style={[uiStyle.text]}>{sliderTenValue}</Text>
            </View>
            <Slider testID='foggy' accessible={true} accessibilityLabel={'foggy'} label='foggy'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Feeling slowed down:</Text>
              <Text style={[uiStyle.text]}>{sliderElevenValue}</Text>
            </View>
            <Slider testID='slowed' accessible={true} accessibilityLabel={'slowed'} label='slowed'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderElevenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Difficulty concentrating:</Text>
              <Text style={[uiStyle.text]}>{sliderTwelveValue}</Text>
            </View>
            <Slider testID='concentrating' accessible={true} accessibilityLabel={'concentrating'} label='concentrating'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwelveValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Difficulty remembering:</Text>
              <Text style={[uiStyle.text]}>{sliderThirteenValue}</Text>
            </View>
            <Slider testID='remembering' accessible={true} accessibilityLabel={'remembering'} label='remembering'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderThirteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Drowsiness:</Text>
              <Text style={[uiStyle.text]}>{sliderFourteenValue}</Text>
            </View>
            <Slider testID='drowsiness' accessible={true} accessibilityLabel={'drowsiness'} label='drowsiness'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFourteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sleeping less than usual:</Text>
              <Text style={[uiStyle.text]}>{sliderFifteenValue}</Text>
            </View>
            <Slider testID='sleep_less' accessible={true} accessibilityLabel={'sleep_less'} label='sleep_less'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFifteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sleeping more than ususal:</Text>
              <Text style={[uiStyle.text]}>{sliderSixteenValue}</Text>
            </View>
            <Slider testID='sleep_more' accessible={true} accessibilityLabel={'sleep_more'} label='sleep_more'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSixteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Trouble falling asleep:</Text>
              <Text style={[uiStyle.text]}>{sliderSeventeenValue}</Text>
            </View>
            <Slider testID='sleeping' accessible={true} accessibilityLabel={'sleeping'} label='sleeping'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSeventeenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Irritability:</Text>
              <Text style={[uiStyle.text]}>{sliderEighteenValue}</Text>
            </View>
            <Slider testID='irritability' accessible={true} accessibilityLabel={'irritability'} label='irritability'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderEighteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sadness:</Text>
              <Text style={[uiStyle.text]}>{sliderNineteenValue}</Text>
            </View>
            <Slider testID='sadness' accessible={true} accessibilityLabel={'sadness'} label='sadness'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderNineteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nervousness:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyValue}</Text>
            </View>
            <Slider testID='nervousness' accessible={true} accessibilityLabel={'nervousness'} label='nervousness'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Feeling more emotional:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyOneValue}</Text>
            </View>
            <Slider testID='emotional' accessible={true} accessibilityLabel={'emotional'} label='emotional'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyOneValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Blurry/Double Vision:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyTwoValue}</Text>
            </View>
            <Slider testID='blurry' accessible={true} accessibilityLabel={'blurry'} label='blurry'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyTwoValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Pain other than headache:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyThreeValue}</Text>
            </View>
            <Slider testID='pain' accessible={true} accessibilityLabel={'pain'} label='pain'
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyThreeValue(val)}
            />
            
          </View>
        </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            var totalSliderValue = sliderOneValue + sliderTwoValue + sliderThreeValue+sliderFourValue+sliderFiveValue+sliderSixValue+
              sliderSevenValue+sliderEightValue+sliderNineValue+sliderTenValue+sliderElevenValue+
              sliderTwelveValue + sliderThirteenValue+sliderFourteenValue+sliderFifteenValue+sliderSixteenValue+
              sliderSeventeenValue+sliderEighteenValue+sliderNineteenValue+sliderTwentyValue;
            navigation.navigate('Incident Report Result', {sliderResult: totalSliderValue});
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
       
    </SafeAreaView>
  );
}

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
