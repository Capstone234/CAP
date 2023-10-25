import * as React from 'react';
import { Text, TouchableOpacity, ScrollView, View, ImageBackground, ProgressBarAndroid} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from '../../styles/ProgressBar';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VOMSTestsStyles/VOMSStartStyle';

function VOMSStart({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={41} />
        <View style={{ alignItems: 'center' }}>
        <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>VOMS Instructions</Text>
        </View>
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
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <Text style={[uiStyle.buttonLabelWhite, { flex: 1 }]}>Next</Text>
            <Ionicons name="arrow-forward-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default VOMSStart;
