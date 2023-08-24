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
                onPress={() => navigation.navigate('Home Page')}
                style={[styles.bottomButton, styles.shadowProp]}
              >
                <Text style={styles.buttonLabel}>I understand</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
      </View>


  );
}


// Change the detailed styles of the disclaimer page
// Note: the general background color of this page is defined in the uiStyle
// Elements defined in the following:
// 1. "I understand" button
// 2. Text position
// 3. Text color

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9AD3FF',

  },
  text: {
    lineHeight: Dimensions.get('window').width/20,
    letterSpacing: Dimensions.get('window').width/600,
    marginHorizontal: Dimensions.get('window').width/15,
    marginVertical: Dimensions.get('window').height/11,
    color: '#fff',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/25,
    textAlign: 'center',
  },

  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7,
    padding: 10,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/1,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },

  buttonLabel: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/20,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  containerText: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  containerBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.2,
    resizeMode: 'cover',
  },

});

export default A_Wptas1;
