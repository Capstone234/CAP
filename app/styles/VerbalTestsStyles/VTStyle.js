import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const background = '#9AD3FF';

export default StyleSheet.create({
  titleText: {
    // Title text
    color: '#003A67',
    fontSize: Dimensions.get('window').width/13,
    marginTop: Dimensions.get('window').width/8,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  bottomButton: {
    elevation: 3,
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7.5,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/4,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  },
  listText: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: background,
      color: '#003A67',
      fontWeight: '600',
      fontSize: Dimensions.get('window').width/25,
      lineHeight: Dimensions.get('window').width/15,
      letterSpacing: 0.3,
  },
  stackedText: {
      // text for long instructions but requiring less whitespace
      color: '#003A67',
      fontWeight: '600',
      fontSize: Dimensions.get('window').width/25,
      lineHeight: Dimensions.get('window').width/15,
      letterSpacing: 0.3,
      marginHorizontal: Dimensions.get('window').width/15,
      marginVertical: Dimensions.get('window').width/16,
      textAlign: 'center',
    },
});