import * as React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';

import { useContext } from 'react';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTCompleteStyle';
import ProgressBar from '../../styles/ProgressBar';

function BTComplete({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image} 
          source = {require('../../../assets/b3.png')}>
        <ProgressBar percentage={50} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={uiStyle.titleText}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Balance Test Complete
          </Text>
        </View>

        <ScrollView>
          <Text style={uiStyle.stackedText}>
            You have successfully completed the first balance test. Press next
            to continue to the second balance test.
          </Text>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Balance Test 4');
            }}
            style={[uiStyle.bottomButton, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabel}>Next</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete;
