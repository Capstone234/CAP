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
import styles from '../../../styles/VOMSTestsStyles/Row3VOR/VOR1Style';

import preventBackAction from '../../../components/preventBackAction';

function VOR1(props) {

  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
      <ScrollView>
        <View style={uiStyle.contentContainerCentered}>
          <Text style={uiStyle.titleText}>Vestibular Ocular Reflex</Text>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a fixed circle in the center of
            the screen.
            {'\n'}
            {'\n'}
            Ask them to hold the phone in front of them and rotate their head
            left and right 10 times while keeping their eyes on the circle.
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VOR 2');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VOR1;
