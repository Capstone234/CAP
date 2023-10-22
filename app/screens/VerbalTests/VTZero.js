import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VerbalTestsStyles/VTStyle';

import preventBackAction from '../../components/preventBackAction';

function VTZero({ navigation }) {

  preventBackAction();

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container} testID="VTZero_screen">
        <Text style={[uiStyle.titleText, uiStyle.titleTextBox]}>Verbal Test</Text>
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>
          <View style={uiStyle.infoTextContainer}>
          <ScrollView style={uiStyle.stackedTextBox}>
              <Text style={styles.stackedText}>
                Before proceeding, it is important to ensure that they are oriented to what is happening around them.
                {'\n'}{'\n'}
                There will be 5 questions provided for them to answer.
                The next page lists the behaviours that you should look out for when they answer the questions.
                {'\n'}{'\n'}
                After they answer the questions it will be up to you to report the
                manner of their response.
              </Text>
          </ScrollView>
          </View>

          <View style={uiStyle.bottomContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Verbal Test 1')}
                style={[styles.bottomButton, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
              >
                <Text style={[styles.buttonLabel, { flex: 1 }]}>Continue</Text>
                <Ionicons name="arrow-forward-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default VTZero;
