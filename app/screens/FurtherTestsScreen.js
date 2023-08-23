import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useContext, useState } from 'react';

import uiStyle from '../components/uiStyle';
import {
  PreliminaryReportRepoContext,
  PrelimReportIdContext,
} from '../components/GlobalContextProvider';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function FurtherTests({ navigation }) {
  const [prelimReportId, setPrelimReportId] = useContext(PrelimReportIdContext);
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);

  return (
    <View style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Preliminary Tests</Text>
      <ImageBackground style={styles.image} 
        source = {require('../../assets/b3.png')}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          There are 5 more tests that will determine the likelihood of the
          affected person having a concussion
          {'\n'}
          {'\n'}
          The tests consists of two memory tests, at the start and again at the
          end, a reaction test and a balance test.
          {'\n'}
          {'\n'}
          Press Start to begin the tests.
        </Text>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          let currentDate = new Date();
          currentDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000).toJSON().slice(0,19);
          
          preliminaryReportRepoContext.createReport(null,currentDate, -10, -10,-10, -10, -10, -10).then((reportId) => {
            setPrelimReportId(reportId);
            preliminaryReportRepoContext
              .getCurrentReportInformation(reportId)
              .then((data) => console.log(data))
                
            
          });  
          navigation.navigate('Continue Tests', {screen: 'Memory Test 1'})
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
      >
        <Text style={uiStyle.buttonLabel}>Start!</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    // Buttom buttons for preliminary tests open page
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
    height: Dimensions.get('window').height/1.25,
    resizeMode: 'cover',
  }
});

export default FurtherTests;
