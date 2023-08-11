import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import uiStyle from '../../../components/uiStyle';

function VOR2(props) {
  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.circleContainer}>
        <View style={uiStyle.vomsCircle} />
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('VOMS VOR 3 Response 5');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    ...uiStyle.contentContainer,
    justifyContent: 'center',
  },
});

export default VOR2;
