import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row3VOR/VOR4Style';

import preventBackAction from '../../../components/preventBackAction';

function VOR4(props) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
      <ScrollView>
        <View style={uiStyle.contentContainerCentered}>
          <Text style={uiStyle.titleText}>
            Vestibular Ocular Reflex (Vertical)
          </Text>
          <Text style={uiStyle.stackedText}>
            Ask them to hold the phone in front of them.
            {'\n'}
            {'\n'}
            Then, rotate their head up and down 10 times while keeping their
            eyes on the circle.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VOR 5');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VOR4;
