import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/VerbalTestsStyles/VTStyle';

function VTZero({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
    <View style={uiStyle.container} testID="VTZero_screen">
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>

        <Text style={styles.titleText}>Verbal Test</Text>

        <ScrollView>
            <Text style={styles.stackedText}>
              Before proceeding, it is important to ensure that they are oriented to what is happening around them.
              {'\n'} {'\n'}
              There will be 5 questions provided for them to answer.
              The next page lists the behaviours that you should look out for when they answer the questions.
              {'\n'} {'\n'}
              After they answer the questions it will be up to you to report the
              manner of their response.
            </Text>
        </ScrollView>
        <TouchableOpacity
            onPress={() => navigation.navigate('Verbal Test 1')}
            style={[styles.bottomButton, uiStyle.shadowProp, { marginBottom: 150 }]}
          >
            <Text style={uiStyle.buttonLabel}>Continue</Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
      </SafeAreaView>
  );
}

export default VTZero;
