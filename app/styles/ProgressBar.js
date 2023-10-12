import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.progressBar}>
      <View style={{ width: `${percentage}%`, ...styles.progressBarFill }} />
      <Text style={styles.progressBarText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 25,
    position: 'relative', // Added to make the Text component absolute
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007bff', // Blue color for the fill
    borderRadius: 5,
  },
  progressBarText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    lineHeight: 20, // Center the text vertically within the ProgressBar
    color: '#fff', // Text color
  },
});

export default ProgressBar;
