import * as React from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ProgressBarAndroid
} from "react-native";
import Slider from '@react-native-community/slider';

import {
  IncidentReportRepoContext,
  IncidentIdContext,
} from '../../components/GlobalContextProvider';
import { useContext } from "react";

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/HopTestsStyles/HTForm2Style';
import ProgressBar from '../../styles/ProgressBar';

import preventBackAction from '../../components/preventBackAction';

function HTForm2({ route, navigation }) {

  preventBackAction();
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);

  const hopTestRoute = route.params;
  var hopTestPreFormResult = Object.values(hopTestRoute)[0]
  var hopTestCountResult = Object.values(hopTestRoute)[1]

  const [sliderOneValue, setSliderOneValue] = React.useState(0);
  const [sliderTwoValue, setSliderTwoValue] = React.useState(0);
  const [sliderThreeValue, setSliderThreeValue] = React.useState(0);
  const [sliderFourValue, setSliderFourValue] = React.useState(0);
  const [sliderFiveValue, setSliderFiveValue] = React.useState(0);
  const [sliderSixValue, setSliderSixValue] = React.useState(0);
  const [sliderSevenValue, setSliderSevenValue] = React.useState(0);
  const [sliderEightValue, setSliderEightValue] = React.useState(0);
  const [sliderNineValue, setSliderNineValue] = React.useState(0);
  const [sliderTenValue, setSliderTenValue] = React.useState(0);
  const [sliderElevenValue, setSliderElevenValue] = React.useState(0);
  const [sliderTwelveValue, setSliderTwelveValue] = React.useState(0);
  const [sliderThirteenValue, setSliderThirteenValue] = React.useState(0);
  const [sliderFourteenValue, setSliderFourteenValue] = React.useState(0);
  const [sliderFifteenValue, setSliderFifteenValue] = React.useState(0);
  const [sliderSixteenValue, setSliderSixteenValue] = React.useState(0);
  const [sliderSeventeenValue, setSliderSeventeenValue] = React.useState(0);
  const [sliderEighteenValue, setSliderEighteenValue] = React.useState(0);
  const [sliderNineteenValue, setSliderNineteenValue] = React.useState(0);
  const [sliderTwentyValue, setSliderTwentyValue] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
    <ProgressBar percentage={83} />
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>


          <Text style={uiStyle.titleText}>Hop Test Post-Test Form</Text>
          <Text style={uiStyle.text}>
            Do you have any of these symptoms?
          </Text>
        </SafeAreaView>

        <SafeAreaView style={[uiStyle.container]}>
          <SafeAreaView style={styles.sliders}>
          <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Headache:</Text>
              <Text style={[uiStyle.text]}>{sliderOneValue}</Text>
            </View>
            <Slider
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
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderNineteenValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nervousness:</Text>
              <Text style={[uiStyle.text]}>{sliderTwentyValue}</Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={6}
              step={1}
              onValueChange={(val) => setSliderTwentyValue(val)}
            />
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          var totalScore = sliderOneValue + sliderTwoValue + sliderThreeValue + sliderFourValue + sliderFiveValue + sliderSixValue
            + sliderSevenValue + sliderEightValue + sliderNineValue + sliderTenValue + sliderElevenValue + sliderTwelveValue
            + sliderThirteenValue + sliderFourteenValue + sliderFifteenValue + sliderSixteenValue + sliderSeventeenValue
            + sliderEighteenValue + sliderNineteenValue + sliderTwentyValue
          // console.log(totalScore)
          // incidentRepoContext
          //   .addVOMSSymptoms(
          //     reportId,
          //     'Smooth Pursuits Horizontal',
          //     sliderOneValue,
          //     sliderTwoValue,
          //     sliderThreeValue,
          //     sliderFourValue,
          //   )
          //   .catch(console.log);

          navigation.navigate("Hop Test Complete", {hopTestPreForm:hopTestPreFormResult, hopTestCount:hopTestCountResult, hopTestPostForm:totalScore});
        }}
        style={[uiStyle.bottomButton, uiStyle.shadowProp]}
      >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}


export default HTForm2;
