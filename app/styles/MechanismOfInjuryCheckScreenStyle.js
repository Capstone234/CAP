import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonYes: {
      width: 125,
      height: 125,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 125,
      backgroundColor: '#83cd49',
      margin: 10,
    },
    buttonNo: {
      width: 125,
      height: 125,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 125,
      backgroundColor: '#ff7366',
      margin: 10,
    },
    buttonMaybe: {
      width: 125,
      height: 125,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 125,
      backgroundColor: '#f6993a',
      margin: 10,
    },
    label: {
      fontSize: 20,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
    container: {
      flex: 1,
    },
  
    sameRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
  
    text: {
      fontSize: 30,
      lineHeight: 30,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: 'black',
      padding: 20,
    },
  });