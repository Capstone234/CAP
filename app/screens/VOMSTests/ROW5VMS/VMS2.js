import * as React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import uiStyle from '../../../components/uiStyle';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

function VMS2({ navigation }) {
  const [sound, setSound] = React.useState();
  // middle, right, middle, left x 5 repetitions
  const [repetition, setRepetition] = React.useState(21);
  const [intervalId, setIntervalId] = React.useState(null);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../../assets/beep.mp3'),
      );
      setSound(sound);
      await sound.playAsync();
      setRepetition(repetition - 1);
    }

    if (repetition < 0) {
      return;
    }

    const id = setInterval(function () {
      playSound().then();
      console.log(repetition);
    }, 1200);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [repetition]);

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.circleContainer}>
        <View style={uiStyle.vomsCircle} />
      </View>
      <TouchableOpacity
        onPress={() => {
          window.clearInterval(intervalId);
          navigation.navigate('VOMS VMS 3 Response 8');
        }}
        style={[styles.bottomButton, uiStyle.shadowProp]}
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
  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/20,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  }
});

export default VMS2;
