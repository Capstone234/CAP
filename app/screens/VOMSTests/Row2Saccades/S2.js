import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S2Style';

function S2({ navigation }) {
  setTimeout(() => {
    navigation.navigate('VOMS Saccades 3 Response 3');
  }, 10000);

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.circleContainerTop}>
        <View style={uiStyle.vomsCircle} />
      </View>
      <View style={styles.circleContainerBot}>
        <View style={uiStyle.vomsCircle} />
      </View>
    </SafeAreaView>
  );
}

export default S2;
