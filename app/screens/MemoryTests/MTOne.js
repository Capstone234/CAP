import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground
} from 'react-native';

import uiStyle from '../../components/uiStyle';

/**
 * The screen will be performed memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function MTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <Text style={uiStyle.titleText}>Memory Test</Text>
        <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
        <ScrollView>
          <Text style={uiStyle.stackedText}>
          
            Welcome to the first memory test.{'\n'}
            {'\n'}
            The affected person will be presented with three images to remember.
            {'\n'}
            {'\n'}
            They will be tested on these images once now and then again at the end
            other assessments. {'\n'}
            {'\n'}
            Please pass the phone to the affected person. {'\n'}
              {'\n'}
          </Text>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate('Memory Test 2')}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text style={uiStyle.buttonLabel}>Start!</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
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
      marginBottom: (Dimensions.get('window').height)/4.5,
      marginTop: (Dimensions.get('window').height)/300,
      alignSelf: 'center',
    },
    image: {
      width: Dimensions.get('window').width/0.99,
      height: Dimensions.get('window').height/1.25,
      resizeMode: 'cover',
    }
});

export default MTOne;
