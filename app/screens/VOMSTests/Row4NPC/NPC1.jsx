import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function NPC1(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.contentContainerCentered}>
        <Text style={uiStyle.titleText}>Near Point of Convergence</Text>
        <ScrollView>
          <Text style={uiStyle.stackedText}>
            The affected person will be shown a fixed circle in the center of
            the screen.
            {'\n'}
            {'\n'}
            Ask them to hold the phone 30cm from their face. Then bring the
            phone closer until they see double.
            {'\n'}
            {'\n'}
            Measure the distance.
          </Text>
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS NPC 2');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default NPC1;
