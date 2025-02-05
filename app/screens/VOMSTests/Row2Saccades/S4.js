import * as React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row2Saccades/S4Style';

import preventBackAction from '../../../components/preventBackAction';

function S4({ navigation }) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
        <ScrollView>
          <Text style={styles.text}>
            Please hold the phone vertical at eye level, an arms length away.
            {'\n'}{'\n'}
            Ask the affected person to keep their head still and alternate looking
            at the top and bottom dot 10 times as quickly as possible.
          </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VOMS Saccades 5')}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}


export default S4;
