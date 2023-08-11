import * as React from 'react';
import {
  CheckBox,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';
// import CheckBox from 'react-native-community/checkbox';
import { useState } from 'react';

/**
 * The screen will ask user for details about concussion in checklist form.
 */
function CheckListQuestionScreen({ navigation }) {
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false);
  const [toggleCheckBox5, setToggleCheckBox5] = useState(false);
  const [toggleCheckBox6, setToggleCheckBox6] = useState(false);
  const [toggleCheckBox7, setToggleCheckBox7] = useState(false);
  const [toggleCheckBox8, setToggleCheckBox8] = useState(false);
  const [toggleCheckBox9, setToggleCheckBox9] = useState(false);
  const [toggleCheckBox10, setToggleCheckBox10] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Does the affected person have any of the following symptoms? Please
        select all that apply.
      </Text>
      <Text> </Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox1}
          onValueChange={(newValue) => setToggleCheckBox1(newValue)}
        />
        <Text> Neck pain or tenderness</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox2}
          onValueChange={(newValue) => setToggleCheckBox2(newValue)}
        />
        <Text> Double vision</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox3}
          onValueChange={(newValue) => setToggleCheckBox3(newValue)}
        />
        <Text> Weakness or tingling/burning in the arms or legs</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox4}
          onValueChange={(newValue) => setToggleCheckBox4(newValue)}
        />
        <Text> Severe or increasing headache</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox5}
          onValueChange={(newValue) => setToggleCheckBox5(newValue)}
        />
        <Text> Seizures or convulsions</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox6}
          onValueChange={(newValue) => setToggleCheckBox6(newValue)}
        />
        <Text> Loss of consciousness</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox7}
          onValueChange={(newValue) => setToggleCheckBox7(newValue)}
        />
        <Text> Deteriorating conscious state</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox8}
          onValueChange={(newValue) => setToggleCheckBox8(newValue)}
        />
        <Text> Vomiting</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox9}
          onValueChange={(newValue) => setToggleCheckBox9(newValue)}
        />
        <Text> Increasing restlessness</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox10}
          onValueChange={(newValue) => setToggleCheckBox10(newValue)}
        />
        <Text> Agitation or combativeness</Text>
      </View>
      <Text>
        Do you have the first symptom(testing)?: {toggleCheckBox1 ? '✅' : '❌'}
      </Text>
      <Text>
        Do you have the second symptom(testing)?:{' '}
        {toggleCheckBox2 ? '✅' : '❌'}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Injury Sus (IR5)')}
      >
        <Text style={styles.label}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'red',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default CheckListQuestionScreen;
