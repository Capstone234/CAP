import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    headingText: {
      color: '#003A67',
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').width/15,
      letterSpacing: 0.3,
      marginHorizontal: Dimensions.get('window').width/10,
      marginVertical: Dimensions.get('window').width/20,
      textAlign: 'center',
    },
    subheadingText: {
      color: '#003A67',
      fontWeight: 'bold',
      fontSize: Dimensions.get('window').width/25,
      letterSpacing: 0.3,
      marginHorizontal: Dimensions.get('window').width/50,
      marginVertical: Dimensions.get('window').width/250,
      textAlign: 'center',
    },
    bottomButton: {
      width: Dimensions.get('window').width/1.3,
      height: Dimensions.get('window').width/7.5,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: (Dimensions.get('window').height)/25,
      alignSelf: 'center',
    }
  });