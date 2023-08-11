import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import uiStyle from '../components/uiStyle';
/**
 * Shows result for check if patient have any selected non-well symptoms.
 */
function BadCheckScreen({ navigation }) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.text}>
        The injured individual requries immediate hospitalisation. Please take
        them to hospital or call 000.
      </Text>
      <View style={uiStyle.startCheckButton}>
        <Text style={uiStyle.startCheckText}>Call 000</Text>
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Create Profile')}
      >
        <Text style={uiStyle.buttonLabel}>Save to new profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Select Profile')}
      >
        <Text style={uiStyle.buttonLabel}>Save to existing profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  callSymbol: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 100,
    width: 200,
    height: 200,
    position: 'relative',
    marginBottom: 150,
  },
  text: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.3,
    marginHorizontal: 50,
    marginVertical: 50,
    fontWeight: 'bold',
    position: 'relative',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomButton: {
    marginLeft: 10,
    width: 300,
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 100,
    backgroundColor: '#FB582F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BadCheckScreen;
