import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "white",
	},

	letter: {
		fontSize: 20,
		fontWeight: "bold" 
	},

	checkboxLabel: {
		marginLeft: 8,
		fontWeight: '500',
		fontSize: 14,
		flex: 1,
		flexWrap: 'wrap',
	},

	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 1,
		padding: 5,
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
	  }
});