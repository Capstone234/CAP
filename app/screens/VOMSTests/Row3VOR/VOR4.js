import * as React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

import uiStyle from '../../../styles/uiStyle';
import styles from '../../../styles/VOMSTestsStyles/Row3VOR/VOR4Style';

import preventBackAction from '../../../components/preventBackAction';

function VOR4(props) {
  preventBackAction();
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text
        style={[uiStyle.titleText, uiStyle.titleTextBox]}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Vestibular Ocular Reflex (Vertical)
      </Text>
      <ImageBackground style={styles.image}
          source = {require('../../../../assets/b3.png')}>
       <View style={uiStyle.infoTextContainer}>
         <ScrollView style={uiStyle.stackedTextBox}>
          <View style={uiStyle.contentContainerCentered}>
            <Text style={uiStyle.stackedText}>
              Ask them to hold the phone in front of them.
              {'\n'}{'\n'}
              Then, rotate their head up and down 10 times while keeping their
              eyes on the circle.
            </Text>
          </View>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('VOMS VOR 5');
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

export default VOR4;
