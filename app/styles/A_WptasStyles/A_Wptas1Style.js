import {
  StyleSheet,
  Dimensions
} from 'react-native';

// Change the detailed styles of the disclaimer page
// Note: the general background color of this page is defined in the uiStyle
// Elements defined in the following:
// 1. "I understand" button
// 2. Text position
// 3. Text color

export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#9AD3FF',

  },
  text: {
    lineHeight: Dimensions.get('window').width/20,
    letterSpacing: Dimensions.get('window').width/600,
    marginHorizontal: Dimensions.get('window').width/15,
    marginVertical: Dimensions.get('window').height/11,
    color: '#fff',
    fontWeight: '700',
    fontSize: Dimensions.get('window').width/25,
    textAlign: 'center',
  },

  bottomButton: {
    width: Dimensions.get('window').width/1.3,
    height: Dimensions.get('window').width/7,
    padding: 10,
    borderRadius: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: (Dimensions.get('window').height)/1,
    marginTop: (Dimensions.get('window').height)/300,
    alignSelf: 'center',
  },

  buttonLabel: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/20,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  containerText: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  containerBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.2,
    resizeMode: 'cover',
  },

});