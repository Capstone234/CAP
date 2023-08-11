import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import MyCheckbox from '../MyCheckbox';
import checkboxStyle from '../checkboxStyle';

/**
 *
 * @param {(string) => void} props.updateOption
 * @param {string[]} props.options
 * @return {JSX.Element}
 * @constructor
 */
export default function DisplayOptions(props) {
  const optionElements = props.options.map((opt) => {
    return (
      <View key={opt} style={styles.checkboxContainer}>
        <MyCheckbox onUpdate={() => props.updateOption(opt)} />
        <Text style={styles.checkboxLabel}>{opt}</Text>
      </View>
    );
  });
  return <View style={styles.allCheckboxContainer}>{optionElements}</View>;
}

const styles = StyleSheet.create({
  allCheckboxContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 1,
  },
  checkboxLabel: checkboxStyle.checkboxLabel,
});
