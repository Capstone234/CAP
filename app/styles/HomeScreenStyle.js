import { StyleSheet, Dimensions } from 'react-native';

const title = '#fff';
const text = '#fff';
const background = '#349BEB';
export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
  },
  startCheckButton: {
    elevation: 7,
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#fff',
    marginBottom: (Dimensions.get('window').height)/100,
    marginTop: (Dimensions.get('window').height)/25,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 35,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  viewHistoryButton: {
    elevation: 7,
    width: Dimensions.get('window').width/1.8,
    height: Dimensions.get('window').width/7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ffff',
    marginTop: (Dimensions.get('window').height)/40,
  },
  buttonLabel: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/19,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  containerText: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/20,
    alignItems: 'center',
    backgroundColor: '#349BEB',
    marginTop: (Dimensions.get('window').height)/5
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: '#349BEB',
  },
  containerButton: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/4,
    alignItems: 'center',
    marginTop: -(Dimensions.get('window').height)/3
  },
  image: {
    width: Dimensions.get('window').width/2.8,
    height: Dimensions.get('window').width/2.8,
    marginBottom: (Dimensions.get('window').height)/1,
    marginTop: (Dimensions.get('window').height)/15,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  imageBackground: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/7,
    alignItems: 'center',
    margin: Dimensions.get('window').height/2.3
  },
});
