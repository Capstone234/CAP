import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function VOR1(props) {
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

const styles = StyleSheet.create({
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/3,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default VOR1;
