import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';

import uiStyle from '../components/uiStyle';
import Slider from '@react-native-community/slider';
import { useContext, useState, useEffect} from 'react';
import {
  PreliminaryReportRepoContext,
  DSLIdContext,
  AccountContext
} from '../components/GlobalContextProvider';

function DSLScreen({ navigation }) {
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [dslId, setDSLId] = useContext(DSLIdContext);
  const [account] = useContext(AccountContext);

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
  const [sliderNineteenValue, setSliderNinteenValue] = useState(0);
  const [sliderTwentyValue, setSliderTwentyValue] = useState(0);
  
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
        <View style={[uiStyle.contentContainer]}>
          <View style={styles.sliders}>
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Headache:</Text>
              <Text style={[uiStyle.text]}>{sliderOneValue}</Text>
            </View>
            <Slider
              ref={r => this.slider1 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderOneValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nausea: </Text>
              <Text style={[uiStyle.text]}>{sliderTwoValue}</Text>
            </View>
            <Slider
              ref={r => this.slider2 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwoValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Dizziness:</Text>
              <Text style={[uiStyle.text]}>{sliderThreeValue}</Text>
            </View>
            <Slider
              ref={r => this.slider3 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderThreeValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Vomiting:</Text>
              <Text style={[uiStyle.text]}>{sliderFourValue}</Text>
            </View>
            <Slider
              ref={r => this.slider4 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFourValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Balance Problem:</Text>
              <Text style={[uiStyle.text]}>{sliderFiveValue}</Text>
            </View>
            <Slider
              ref={r => this.slider5 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFiveValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Blurry or Double Vision:</Text>
              <Text style={[uiStyle.text]}>{sliderSixValue}</Text>
            </View>
            <Slider
              ref={r => this.slider6 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSixValue(val)}

            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sensitivity to light:</Text>
              <Text style={[uiStyle.text]}>{sliderSevenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider7 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSevenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sensitivity to noise:</Text>
              <Text style={[uiStyle.text]}>{sliderEightValue}</Text>
            </View>
            <Slider
              ref={r => this.slider8 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderEightValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Balance Problems:</Text>
              <Text style={[uiStyle.text]}>{sliderNineValue}</Text>
            </View>
            <Slider
            ref={r => this.slider9 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderNineValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Pain other than headache:</Text>
              <Text style={[uiStyle.text]}>{sliderTenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider10 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Feeling Slowed Down:</Text>
              <Text style={[uiStyle.text]}>{sliderElevenValue}</Text>
            </View>
            <Slider
             ref={r => this.slider11 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderElevenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Difficulty Concentrating:</Text>
              <Text style={[uiStyle.text]}>{sliderTwelveValue}</Text>
            </View>
            <Slider
              ref={r => this.slider12 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwelveValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Difficulty Remembering:</Text>
              <Text style={[uiStyle.text]}>{sliderThirteenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider13 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderThirteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Trouble falling asleep:</Text>
              <Text style={[uiStyle.text]}>{sliderFourteenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider14 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFourteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Fatigue or low energy:</Text>
              <Text style={[uiStyle.text]}>{sliderFifteenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider15 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderFifteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Drowsiness:</Text>
              <Text style={[uiStyle.text]}>{sliderSixteenValue}</Text>
            </View>
            <Slider
            ref={r => this.slider16 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSixteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Feeling more emotional:</Text>
              <Text style={[uiStyle.text]}>{sliderSeventeenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider17 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderSeventeenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Irritability:</Text>
              <Text style={[uiStyle.text]}>{sliderEighteenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider18 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderEighteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Sadness:</Text>
              <Text style={[uiStyle.text]}>{sliderNineteenValue}</Text>
            </View>
            <Slider
              ref={r => this.slider19 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderNinteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nervousness:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyValue}</Text>
            </View>
            <Slider
              ref={r => this.slider20 = r}
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyValue(val)}
            />
            
            
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            var totalSliderValue = sliderOneValue + sliderTwoValue + sliderThreeValue+sliderFourValue+sliderFiveValue+sliderSixValue+
              sliderSevenValue+sliderEightValue+sliderNineValue+sliderTenValue+sliderElevenValue+
              sliderTwelveValue + sliderThirteenValue+sliderFourteenValue+sliderFifteenValue+sliderSixteenValue+
              sliderSeventeenValue+sliderEighteenValue+sliderNineteenValue+sliderTwentyValue;
            
            let currentDate = new Date();
            currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toJSON().slice(0,19);
            preliminaryReportRepoContext.createDSL(account.account_id, currentDate, sliderOneValue, sliderTwoValue, sliderThreeValue, sliderFourValue, sliderFiveValue, sliderSixValue, sliderSevenValue,sliderEightValue,sliderNineValue,sliderTenValue,sliderElevenValue,
                sliderTwelveValue, sliderThirteenValue, sliderFourteenValue, sliderFifteenValue,sliderSixteenValue,
                sliderSeventeenValue,sliderEighteenValue,sliderNineteenValue,sliderTwentyValue, totalSliderValue).then((data)=>setDSLId(data));
              
            setSliderOneValue(0);
            setSliderTwoValue(0);
            setSliderThreeValue(0);
            setSliderFourValue(0);
            setSliderFiveValue(0);
            setSliderSixValue(0);
            setSliderSevenValue(0);
            setSliderEightValue(0);
            setSliderNineValue(0);
            setSliderTenValue(0);
            setSliderElevenValue(0);
            setSliderTwelveValue(0);
            setSliderThirteenValue(0);
            setSliderFourteenValue(0);
            setSliderFifteenValue(0);
            setSliderSixteenValue(0);
            setSliderSeventeenValue(0);
            setSliderEighteenValue(0);
            setSliderNinteenValue(0);
            setSliderTwentyValue(0);
            this.slider1.setNativeProps({value:0});
            this.slider2.setNativeProps({value:0});
            this.slider3.setNativeProps({value:0});
            this.slider4.setNativeProps({value:0});
            this.slider5.setNativeProps({value:0});
            this.slider6.setNativeProps({value:0});
            this.slider7.setNativeProps({value:0});
            this.slider8.setNativeProps({value:0});
            this.slider9.setNativeProps({value:0});
            this.slider10.setNativeProps({value:0});
            this.slider11.setNativeProps({value:0});
            this.slider12.setNativeProps({value:0});
            this.slider13.setNativeProps({value:0});
            this.slider14.setNativeProps({value:0});
            this.slider15.setNativeProps({value:0});
            this.slider16.setNativeProps({value:0});
            this.slider17.setNativeProps({value:0});
            this.slider18.setNativeProps({value:0});
            this.slider19.setNativeProps({value:0});
            this.slider20.setNativeProps({value:0});


            // Add necessary stuff for user @mariam :)
            
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
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height)/20,
    marginBottom: (Dimensions.get('window').height)/50,
    alignSelf: 'center',
  }
});

export default DSLScreen;
