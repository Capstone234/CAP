import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
    inputAreaContainer: {
      flex: 1,
      alignItems: 'center',
    },
    input: {
      height: 40,
      width: 300,
      margin: 12,
      borderRadius: 50,
      padding: 10,
      backgroundColor: '#D3D3D3',
    },
    text: {
      color: '#003A67',
      fontSize: Dimensions.get('window').width/25,
      fontWeight: '800',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    bottomButton: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginBottom: (Dimensions.get('window').height)/30,
      marginTop: (Dimensions.get('window').height)/1.5,
    },
    titlecontainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height/28,
      alignItems: 'center',
      backgroundColor: '#9AD3FF',
      marginBottom: (Dimensions.get('window').height)/300,
      marginTop: (Dimensions.get('window').height)/20,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    pdfButton: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginTop: (Dimensions.get('window').height)/500,
    }
  });