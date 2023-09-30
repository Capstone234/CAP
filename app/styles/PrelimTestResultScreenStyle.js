import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    bottomButton: {
      elevation: 1,
      width: Dimensions.get('window').width/1.3,
      height: Dimensions.get('window').width/12,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: (Dimensions.get('window').height)/25,
      alignSelf: 'center',
    },
    buttonLabel: {
      // Buttom buttons in all tests
      color: '#003A67',
      fontSize: Dimensions.get('window').width/30,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    }
  });