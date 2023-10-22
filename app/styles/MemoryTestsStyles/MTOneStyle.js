import {
  StyleSheet,
  Dimensions
} from 'react-native';

export default StyleSheet.create({
    bottomButton: {
      elevation: 3,
      width: Dimensions.get('window').width/1.3,
      height: Dimensions.get('window').width/7.5,
      padding: 10,
      borderRadius: 30,
      backgroundColor: '#003A67',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: (Dimensions.get('window').height)/4.5,
      marginTop: (Dimensions.get('window').height)/300,
      alignSelf: 'center',
    },
    image: {
      width: Dimensions.get('window').width/0.99,
      height: Dimensions.get('window').height/1.12,
      resizeMode: 'cover',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: Dimensions.get('window').width/20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
});
