import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row3VOR/VOR2Style';

function VOR2(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.circleContainer}>
        <View style={uiStyle.vomsCircle} />
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VOR 3 Response 5');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VOR2;
