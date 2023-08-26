import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    scroll: { flex: 1, alignItems: 'center' },
    bottomButton: {
      width: Dimensions.get('window').width/1.3,
      height: Dimensions.get('window').width/7.5,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: (Dimensions.get('window').height)/5,
      marginTop: (Dimensions.get('window').height)/300,
      alignSelf: 'center',
    },
    text: {
      fontSize: 18,
      lineHeight: 30,
      letterSpacing: 0.25,
      marginHorizontal: 20,
      marginVertical: 20,
    },
    container: {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
  });