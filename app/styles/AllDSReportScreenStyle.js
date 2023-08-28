import { StyleSheet, Dimensions } from "react-native";

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
      fontSize: Dimensions.get('window').width/18,
      fontWeight: '800',
      textAlign: 'center',
      textAlignVertical: 'center',
     
    },
    reporttext: {
      color: '#003A67',
      fontSize: Dimensions.get('window').width/20,
      fontWeight: '600',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginTop: (Dimensions.get('window').height)/40,
    },
    bottomButton: {
      width: Dimensions.get('window').width/1.5,
      height: Dimensions.get('window').width/10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginTop: (Dimensions.get('window').height)/30,
      marginBottom: (Dimensions.get('window').height)/20,
    },
    titlecontainer: {
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
      backgroundColor: '#C1E4FF',
      marginTop: (Dimensions.get('window').height)/500,
    },
    reportContainer: {
      flex: 1,
      alignItems: 'center',
      width: Dimensions.get('window').width/1.2,
      borderRadius: 20,
      backgroundColor: '#fff',
      marginTop: (Dimensions.get('window').height)/50,
    },
  });