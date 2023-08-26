import { StyleSheet } from 'react-native';


export default StyleSheet.create({
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
      testID: 'checkBoxContainer',
    },
    checkbox: {
      alignSelf: 'center',
      testID: 'checkBox',
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
      testID: 'container',
    },
  });