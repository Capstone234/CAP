import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row1SmoothPursuits/SP4Style';

import preventBackAction from '../../../components/preventBackAction';

function SP4({ navigation }) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
      <View style={uiStyle.container}>
        <Text style={styles.text}>
          Please hold the phone vertical at eye level, an arms length away.
          {'\n'} {'\n'}
          Ask the affected person to follow the circle while keeping their head
          still again.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('VOMS Smooth Pursuits 5')}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}


export default SP4;
