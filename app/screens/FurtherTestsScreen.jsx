import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import uiStyle from '../components/uiStyle.jsx';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */
function FurtherTests({ navigation }) {
  return (
    <View style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Further Tests</Text>
      <ScrollView>
        <Text style={uiStyle.stackedText}>
          There are 5 more tests that will determine the likelihood of the
          affected person having a concussion
          {'\n'}
          {'\n'}
          The tests consists of two memory tests, at the start and again at the
          end, a reaction test, a balance test and VOMS.
        </Text>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Memory Test 1')}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Start!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

export default FurtherTests;
