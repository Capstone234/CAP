import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  ImageBackground
} from 'react-native';

import { useContext } from 'react';

import { MedicalReportRepoContext, PrelimReportIdContext } from '../../components/GlobalContextProvider';
import uiStyle from '../../components/uiStyle';

function BTOne({ navigation }) {
  const medicalReportRepoContext = useContext(MedicalReportRepoContext);
  const [prelimReportId] = React.useContext(PrelimReportIdContext);
  return (
    <SafeAreaView style={uiStyle.container}>
       <ImageBackground style={styles.image} 
        source = {require('../../../assets/b3.png')}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Balance Test</Text>
          <Text style={uiStyle.stackedText}>
            This section consists of 2 tests with 2 recordings. Read the
            instructions carefully before starting each test.{'\n'}
            {'\n'}
            Push 'Next' to navigate to the recording page, and hold the phone to
            your chest while recording.{'\n'}
            {'\n'}
            The vibration indicates that the recording has finished.
          </Text>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity testID='button' accessible={true} accessibilityLabel={'button'} label='button'
        onPress={() => {
          navigation.navigate('Balance Test 2');
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
    marginBottom: (Dimensions.get('window').height)/4,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});

export default BTOne;
