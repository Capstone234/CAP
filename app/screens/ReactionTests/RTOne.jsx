import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import uiStyle from '../../components/uiStyle.jsx';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function RTOne({ navigation }) {
  return (
    <View style={uiStyle.container}>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          Welcome to the reaction test.
          {'\n'}
          {'\n'}
          On the next screen, the affected individual will see a red start
          button. Press anywhere to begin the test.
          {'\n'}
          {'\n'}
          They will be presented with a blue circle that will turn yellow after
          a period of time. They should tap it the moment it turns yellow.
          {'\n'} {'\n'}
          The test will run three times.
          {'\n'} {'\n'}
          Pass the phone to the affected person.
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('Reaction Test 2')}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#ff0000',
  },

  startCheckText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default RTOne;
