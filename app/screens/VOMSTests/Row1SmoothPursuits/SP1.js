import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ImageBackground, StyleSheet} from 'react-native';

import uiStyle from '../../../components/uiStyle';

function SP1({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Smooth Pursuits</Text>
      <ImageBackground style={styles.image} 
          source = {require('../../../../assets/b3.png')}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          The affected person will be shown a circle slowly moving from left to
          right. Ask them to keep their head still and follow the circle.
          {'\n'} {'\n'}
          Please allow them to sit down and hold the phone landscape at eye
          level, an arms length away.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('VOMS Smooth Pursuits 2')}
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

export default SP1;
