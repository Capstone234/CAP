import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

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

const styles = StyleSheet.create({
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/3.5,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.27,
    resizeMode: 'cover',
  }
});
export default NPC1;
