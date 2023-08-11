import * as React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';
import Slider from '@react-native-community/slider';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../../../components/GlobalContextProvider';
import { useContext } from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NPC3({ navigation }) {
  const [reportId] = useContext(ReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  const [sliderOneValue, setSliderOneValue] = React.useState(0);

  return (
    <SafeAreaView style={uiStyle.container}>
      <SafeAreaView style={uiStyle.container}>
        <Text style={uiStyle.text}>
          Please select the distance measured when the affected individual saw
          double.
        </Text>
        <View style={[uiStyle.contentContainer]}>
          <View style={styles.sliders}>
            <View style={styles.sliderOne}>
              <Text style={uiStyle.text}>Distance: {sliderOneValue} cm</Text>
            </View>
            <Slider
              minimumValue={1}
              maximumValue={30}
              step={1}
              onValueChange={(val) => setSliderOneValue(val)}
            />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            incidentRepoContext
              .addVOMSNPCDistance(reportId, sliderOneValue)
              .catch(console.log);
            navigation.navigate('VOMS NPC 4 Response 7');
          }}
          style={uiStyle.bottomButton}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sliders: {
    width: '80%',
  },

  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default NPC3;
