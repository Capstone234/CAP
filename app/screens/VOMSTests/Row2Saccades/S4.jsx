import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function S4({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <Text style={uiStyle.text}>
          Please hold the phone vertical at eye level, an arms length away.
          {'\n'} {'\n'}
          Ask the affected person to keep their head still and alternate looking
          at the top and bottom dot 10 times as quickly as possible.
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('VOMS Saccades 5')}
          style={uiStyle.bottomButton}
        >
          <Text style={uiStyle.buttonLabel}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default S4;
