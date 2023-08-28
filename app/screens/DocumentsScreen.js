import * as React from 'react';
import {Text, SafeAreaView } from 'react-native';
import styles from '../styles/DocumentScreenStyle';

/**
 * Displays all available documents.
 *
 * Documents may be selected to be viewed individually.
 */
function DocumentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Documents Screen</Text>
    </SafeAreaView>
  );
}

export default DocumentsScreen;
