import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S5Style';

function S5({ navigation }) {
  setTimeout(() => {
    navigation.navigate('VOMS Saccades 6 Response 4');
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

export default S5;
