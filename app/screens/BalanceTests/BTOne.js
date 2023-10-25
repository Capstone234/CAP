import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useContext } from 'react';

import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTOneStyle';
import ProgressBar from '../../styles/ProgressBar';

function BTOne({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={20} />

        <View style={{ alignItems: 'center' }}>
          <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Balance Test</Text>
        </View>

        <View style={uiStyle.infoTextContainer}>
            <ScrollView style={uiStyle.stackedTextBox}>
                <Text style={uiStyle.stackedText}>
                  This section consists of 2 tests with 2 recordings. Read the
                  instructions carefully before starting each test.
                  {'\n'}{'\n'}
                  Push 'Next' to navigate to the recording page, and hold the phone to
                  your chest while recording.
                  {'\n'}{'\n'}
                  The vibration indicates that the recording has finished.
                </Text>
            </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity testID='button' accessible={true} accessibilityLabel={'button'} label='button'
            onPress={() => {
              navigation.navigate('Balance Test 2');
            }}
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

export default BTOne;
