import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VOMSTestsStyles/VOMSInitialSymptomsStyle';
import Slider from '@react-native-community/slider';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../components/GlobalContextProvider';
import { useContext } from 'react';

function VOMSInitialSymptoms({ navigation }) {
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  const [sliderOneValue, setSliderOneValue] = React.useState(0);
  const [sliderTwoValue, setSliderTwoValue] = React.useState(0);
  const [sliderThreeValue, setSliderThreeValue] = React.useState(0);
  const [sliderFourValue, setSliderFourValue] = React.useState(0);

  async function fetchVOMS(uid, iid, stage) {
    try {
      const voms = await incidentReportRepoContext.getVOMS(uid, iid, stage);
      console.log(voms);
    } catch (error) {
      console.error('Error fetching voms report:', error);
    }
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text
        style={uiStyle.text}
        adjustsFontSizeToFit={true}
        numberOfLines={2}
      >
        Does the affected person have any of these symptoms?
      </Text>

      <ScrollView>
        <View style={uiStyle.contentContainer}>
          <View style={styles.sliders}>
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Headache:</Text>
              <Text style={[uiStyle.text, { alignContent: 'flex-end' }]}>
                {sliderOneValue}
              </Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(val) => setSliderOneValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nausea: </Text>
              <Text style={[uiStyle.text, { alignContent: 'flex-end' }]}>
                {sliderTwoValue}
              </Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(val) => setSliderTwoValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Dizziness:</Text>
              <Text style={[uiStyle.text]}>{sliderThreeValue}</Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(val) => setSliderThreeValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Fogginess:</Text>
              <Text style={[uiStyle.text]}>{sliderFourValue}</Text>
            </View>
            <Slider
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(val) => setSliderFourValue(val)}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          incidentReportRepoContext
            .addVOMSSymptoms(
              user.uid,
              incidentId,
              "Initial",
              sliderOneValue,
              sliderTwoValue,
              sliderThreeValue,
              sliderFourValue,
            )
            fetchVOMS(user.uid, incidentId, "Initial")
            navigation.navigate('VOMS Smooth Pursuits 1');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VOMSInitialSymptoms;
