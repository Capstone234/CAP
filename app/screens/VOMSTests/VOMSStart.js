import * as React from 'react';
import { Text, SafeAreaView, TouchableOpacity, ScrollView, View, ImageBackground} from 'react-native';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VOMSTestsStyles/VOMSStartStyle';

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

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Continue Tests',{screen: 'VOMS Initial Symptoms'})}
            style={[styles.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VOMSStart;
