import { StyleSheet, Dimensions } from 'react-native';

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff0000';
export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
    top: 50,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
  bottomButton: {
		width: Dimensions.get('window').width/1.3,
    	height: Dimensions.get('window').width/7.5,
		borderRadius: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: (Dimensions.get('window').height)/2.5,
		marginTop: (Dimensions.get('window').height)/20,
		alignSelf: 'center'
	},
  image: {
    width: Dimensions.get('window').width/0.99,
    height: Dimensions.get('window').height/1.12,
    resizeMode: 'cover',
  }
});