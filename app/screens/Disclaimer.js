import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  View,
  Alert,
  ImageBackground,
  Dimensions
} from 'react-native';
import styles from '../styles/DisclaimerStyle';


function Disclaimer({ navigation }) {
  return (
    <SafeAreaView style={styles.screen} testID="disclaimer_screen">
      <View style={styles.containerText}>
        <ImageBackground style={styles.image}
            source = {require('../../assets/b1.png')}>
          <Text style={styles.text}>
            This App does not represent a substitute for expert medical attention.
            {'\n'} {'\n'}
            You must not rely on the information on this App as an alternative to
            medical advice from your doctor or other professional healthcare
            provider.
            {'\n'} {'\n'}
            We strongly recommend that you consult your own physician or another
            available health professional regarding any diagnosis, findings,
            interpretation or course of treatment.
          </Text>

          <TouchableOpacity
            // onPress={() => navigation.navigate('Voms Start')}
            onPress={() => navigation.navigate('Home Page')}
            style={[styles.bottomButton, styles.shadowProp]}
          >
            <Text style={styles.buttonLabel}>I understand</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default Disclaimer;
