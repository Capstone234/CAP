import * as React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/ROW5VMS/VMS3Style';
import Slider from '@react-native-community/slider';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../../components/GlobalContextProvider';
import { useContext } from 'react';

function VMS3({ navigation }) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() => navigation.navigate('VOMS VMS 1')}
          title="< REDO Test"
        />
      ),
    });
  }, [navigation]);

  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  const [sliderOneValue, setSliderOneValue] = React.useState(0);
  const [sliderTwoValue, setSliderTwoValue] = React.useState(0);
  const [sliderThreeValue, setSliderThreeValue] = React.useState(0);
  const [sliderFourValue, setSliderFourValue] = React.useState(0);

  return (
    <SafeAreaView style={uiStyle.container}>
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
              minimumValue={0}
              maximumValue={10}
              step={1}
              onValueChange={(val) => setSliderOneValue(val)}
            />
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Nausea: </Text>
              <Text style={[uiStyle.text]}>{sliderTwoValue}</Text>
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
        <TouchableOpacity
        onPress={() => {
          incidentReportRepoContext
            .addVOMSSymptoms(
              user.uid,
              incidentId,
              'VMS',
              sliderOneValue,
              sliderTwoValue,
              sliderThreeValue,
              sliderFourValue,
            )
            .then((data) => {
              incidentReportRepoContext.getVOMS(user.uid, incidentId, 'VMS')
                                .then((data)=> console.log(data));
            })
            incidentReportRepoContext.incrementTestStage(incidentId);
            navigation.navigate('Hop Test 1');
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default VMS3;
