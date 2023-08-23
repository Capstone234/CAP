import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';

import uiStyle from '../../components/uiStyle';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTFiveIntro({ navigation }) {
  return (
    
    <View style={uiStyle.container}>
      <ImageBackground style={styles.image} 
        source = {require('../../../assets/b3.png')}>
      <View style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Second Memory Test</Text>
        <Text style={uiStyle.stackedText}>
          On the following page the same checklist will be presented
          with the selections for the images presented in the beginning.
          {'\n'} 
          {'\n'} 
          Please pass the phone to the supervisor to enter the images the 
          injured individual remembers.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Memory Test 5')}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
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
    marginBottom: (Dimensions.get('window').height)/2.6,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default MTFiveIntro;
