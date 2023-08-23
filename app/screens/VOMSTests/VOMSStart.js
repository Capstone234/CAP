import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ImageBackground, StyleSheet} from 'react-native';

import uiStyle from '../../components/uiStyle';

function VOMSStart({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.titleText}>VOMS Instructions</Text>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          The affected person will now be doing a series of tests that track
          their eye movements.
        </Text>
      </ScrollView>
      <TouchableOpacity   
        onPress={() => navigation.navigate('Continue Tests',{screen: 'VOMS Initial Symptoms'})}
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
    marginBottom: (Dimensions.get('window').height)/2,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.25,
    resizeMode: 'cover',
  }
});

export default VOMSStart;
