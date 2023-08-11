import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default DocumentsScreen;
