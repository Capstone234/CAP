import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row4NPC/NPC1Style';

function NPC1(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Near Point of Convergence</Text>
        <ImageBackground style={styles.image} 
          source = {require('../../../../assets/b3.png')}>
        <ScrollView>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a fixed circle in the center of
            the screen.
            {'\n'}
            {'\n'}
            Ask them to hold the phone 30cm from their face. Then bring the
            phone closer until they see double.
            {'\n'}
            {'\n'}
            Measure the distance.
          </Text>
        </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS NPC 2');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}
export default NPC1;
