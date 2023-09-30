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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/3,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  },
  text: {
    color: '#003A67',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/20,
    lineHeight: Dimensions.get('window').width/15,
    letterSpacing: 0.3,
    marginHorizontal: Dimensions.get('window').width/10,
    marginVertical: Dimensions.get('window').width/15,
    marginTop: (Dimensions.get('window').height)/5,
    textAlign: 'center',
  },
});
