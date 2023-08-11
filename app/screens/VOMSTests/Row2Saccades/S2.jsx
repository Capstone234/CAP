import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import uiStyle from '../../../components/uiStyle';

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

const styles = StyleSheet.create({
  circleContainerTop: {
    ...uiStyle.contentContainer,
    justifyContent: 'flex-start',
  },
  circleContainerBot: {
    ...uiStyle.contentContainer,
    justifyContent: 'flex-end',
  },
});

export default S2;
