import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row4NPC/NPC3Style';
import Slider from '@react-native-community/slider';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../../components/GlobalContextProvider';
import { useContext } from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NPC3({ navigation }) {
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  const [sliderOneValue, setSliderOneValue] = React.useState(0);

  return (
    <SafeAreaView style={uiStyle.container}>
      <SafeAreaView style={styles.container}>
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
            incidentReportRepoContext
              .addVOMSNPCDistance(user.uid, incidentId, sliderOneValue)
              .catch(console.log);
            navigation.navigate('VOMS NPC 4 Response 7');
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default NPC3;
