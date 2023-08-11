import * as React from 'react';

import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

/**
 *
 * @param {() => void} props.onUpdate called when checkbox is pressed
 * @return {JSX.Element}
 * @constructor
 */
const MyCheckbox = (props) => {
  const [checked, onChange] = useState(false);
  function onCheckmarkPress() {
    onChange(!checked);
    props.onUpdate();
  }

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => {
        onCheckmarkPress();
      }}
    >
      {checked && <Ionicons name="checkmark" size={24} color="black" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: '#C4C4C4',
  },
});

export default MyCheckbox;
