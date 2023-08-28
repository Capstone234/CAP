import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    callSymbol: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff0000',
      borderRadius: 100,
      width: 200,
      height: 200,
      position: 'relative',
      marginBottom: 150,
    },
    text: {
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: 0.3,
      marginHorizontal: 50,
      marginVertical: 50,
      fontWeight: 'bold',
      position: 'relative',
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
    },
    bottomButton: {
      width: Dimensions.get('window').width/1.3,
      height: Dimensions.get('window').width/7.5,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: (Dimensions.get('window').height)/10,
      alignSelf: 'center',
    },
    image: {
      width: Dimensions.get('window').width/0.99,
      height: Dimensions.get('window').height/1.12,
      resizeMode: 'cover',
    }
  });