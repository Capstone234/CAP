import * as React from 'react';
import { Text, TouchableOpacity, ScrollView, View, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row1SmoothPursuits/SP1Style';

import preventBackAction from '../../../components/preventBackAction';

function SP1({ navigation }) {
  preventBackAction();

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Smooth Pursuits</Text>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
        <ScrollView>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a circle slowly moving from left to
            right. Ask them to keep their head still and follow the circle.
            {'\n'}{'\n'}
            Please allow them to sit down and hold the phone landscape at eye
            level, an arms length away.
          </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VOMS Smooth Pursuits 2')}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default SP1;
