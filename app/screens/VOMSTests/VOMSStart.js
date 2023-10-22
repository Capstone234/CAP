import * as React from 'react';
import { Text, TouchableOpacity, ScrollView, View, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VOMSTestsStyles/VOMSStartStyle';

function VOMSStart({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>VOMS Instructions</Text>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
        <View style={uiStyle.infoTextContainer}>
        <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            The affected person will now be doing a series of tests that track
            their eye movements.
          </Text>
        </ScrollView>
        </View>

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
