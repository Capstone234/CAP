import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    inputAreaContainer: {
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height),
      marginTop: (Dimensions.get('window').height)/45,
    },
    input: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginBottom: (Dimensions.get('window').height)/80,
      marginTop: (Dimensions.get('window').height)/80, 
      borderRadius: 20,
      padding:  Dimensions.get('window').width/50,
      backgroundColor: '#FFFFFF',
    },
    titlecontainer: {
      width: Dimensions.get('window').width/1.2,
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height)/500,
      marginTop: (Dimensions.get('window').height)/50,
    },
    text: {
      color: '#003A67',
      fontSize: Dimensions.get('window').width/25,
      fontWeight: '800',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    bottomButton: {
      elevation: 3,
      width: Dimensions.get('window').width/2.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: '#fff',
      marginBottom: (Dimensions.get('window').height)/800,
      marginTop: (Dimensions.get('window').height)/40,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
  });