import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/ReactionTestsStyles/RTOneStyle';

function A_Wptas1({ navigation }) {

  return (

    <View style={uiStyle.container} testID="A_Wptas1_screen">
        <ImageBackground style={styles.image}
            source = {require('../../../assets/b3.png')}>
        <ScrollView>
            <SafeAreaView style={uiStyle.container}>
                <Text style={uiStyle.titleText}>A-WPTAS Test</Text>
                <Text style={uiStyle.stackedText}>
                  Before proceeding, it is important to ensure that they are oriented to what is happening around them.
                  {'\n'} {'\n'}
                  On the next screen will be 5 questions. Ask the person to answer and tick the box if they give the appropriate response.
                  {'\n'} {'\n'}
                  Pay attention to their answers. Are they confused, unsure, not responding appropriately, unable to respond
                  or responding incomprehensibly? After they answer the questions it will be up to you to report the
                  manner of their response.
                </Text>
            </SafeAreaView>
              <TouchableOpacity
                onPress={() => navigation.navigate('A-WPTAS 2')}
                style={[styles.bottomButton, uiStyle.shadowProp]}
              >
                <Text style={uiStyle.buttonLabel}>I understand</Text>
              </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
      </View>


  );
}

export default A_Wptas1;
