import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useContext } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/DSLCompleteScreenStyle';

function DSLComplete({ navigation }) {

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
          source = {require('../../assets/b3.png')}>
        <ScrollView>
          <View style={uiStyle.container}>
            <Text
              style={uiStyle.titleText}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Daily Symptom Log Complete
            </Text>
            <Text style={uiStyle.stackedText}>
              You have successfully submitted your Daily Sympton Checkist,
              please refer to action plan for further steps.
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home Page');
          }}
          style={[styles.bottomButton, uiStyle.shadowProp]}
        >
          <Text
            style={uiStyle.buttonLabel}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Return to Home
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default DSLComplete;
