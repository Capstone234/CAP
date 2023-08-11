import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function VOR4(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <View style={uiStyle.contentContainerCentered}>
          <Text style={uiStyle.titleText}>
            Vestibular Ocular Reflex (Vertical)
          </Text>
          <Text style={uiStyle.stackedText}>
            Ask them to hold the phone in front of them.
            {'\n'}
            {'\n'}
            Then, rotate their head up and down 10 times while keeping their
            eyes on the circle.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VOR 5');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default VOR4;
