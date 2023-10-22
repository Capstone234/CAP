import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S3Response3Style';
import Slider from '@react-native-community/slider';
import { useContext } from 'react';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../../components/GlobalContextProvider';

import preventBackAction from '../../../components/preventBackAction';

function S3Response3({ navigation }) {
  preventBackAction();
  
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  const [sliderOneValue, setSliderOneValue] = React.useState(0);
  const [sliderTwoValue, setSliderTwoValue] = React.useState(0);
  const [sliderThreeValue, setSliderThreeValue] = React.useState(0);
  const [sliderFourValue, setSliderFourValue] = React.useState(0);

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
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          incidentReportRepoContext
            .addVOMSSymptoms(
              user.uid,
              incidentId,
              'SacHorizontal',
              sliderOneValue,
              sliderTwoValue,
              sliderThreeValue,
              sliderFourValue,
            )
            .then((data) => {
              incidentReportRepoContext.getVOMS(user.uid, incidentId, 'SacHorizontal')
                                .then((data)=> console.log(data));
            })
            navigation.navigate('VOMS Saccades 4');
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

export default S3Response3;
