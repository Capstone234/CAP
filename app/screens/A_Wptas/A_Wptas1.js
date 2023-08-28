import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import styles from '../../styles/A_WptasStyles/A_Wptas1Style';


function A_Wptas1({ navigation }) {

  return (

    <View style={styles.screen} testID="A_Wptas1_screen">
        <View style={styles.containerText}>
          <ImageBackground style={styles.image}
              source = {require('../../../assets/b1.png')}>
            <Text style={styles.text}>
              Before proceeding, it is important to ensure that they are oriented to what is happening around them.
              {'\n'} {'\n'}
              On the next screen will be 5 questions. Ask the person to answer and tick the box if they give the appropriate response.
              {'\n'} {'\n'}
              Pay attention to their answers. Are they confused, unsure, not responding appropriately, unable to respond
              or responding incomprehensibly? After they answer the questions it will be up to you to report the
              manner of their response.
            </Text>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Voms Start')}
                onPress={() => navigation.navigate('A-WPTAS 2')}
                style={[styles.bottomButton, styles.shadowProp]}
              >
                <Text style={styles.buttonLabel}>I understand</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
      </View>


  );
}

export default A_Wptas1;
