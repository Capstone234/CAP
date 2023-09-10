// ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${percentage}%`, ...styles.progressBarFill }} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 25
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007bff', // Blue color for the fill
    borderRadius: 5,
  },
  progressBarTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressBar;
