import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "#9AD3FF",
	},

	letter: {
		fontSize: 20,
		fontWeight: "bold",
		color: '#D09A0E'
	},

	bottomButton: {
		width: Dimensions.get('window').width/1.3,
    	height: Dimensions.get('window').width/7.5,
		borderRadius: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: (Dimensions.get('window').height)/10,
		marginTop: (Dimensions.get('window').height)/20,
		alignSelf: 'center'
	},

	text: {
		color: '#003A67',
		fontWeight: '700',
		fontSize: Dimensions.get('window').width/30,
		lineHeight: Dimensions.get('window').width/20,
		letterSpacing: 0.3,
		marginHorizontal: Dimensions.get('window').width/50,
		marginVertical: Dimensions.get('window').width/30,
	},

	description: {
		color: '#003A67',
		fontWeight: '700',
		fontSize: Dimensions.get('window').width/30,
		lineHeight: Dimensions.get('window').width/20,
		letterSpacing: 0.3,
		marginHorizontal: Dimensions.get('window').width/200,
		marginVertical: Dimensions.get('window').width/100,
	},

});