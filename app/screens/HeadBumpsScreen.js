import * as React from 'react';
import { View, SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import uiStyle from '../components/uiStyle';

function HeadBumpsScreen ({navigation}) {
	return(
		<SafeAreaView style={uiStyle.container}>
			<View style={styles.container}>
			<Text style={[styles.text, {marginBottom: 40}]}>Over the next few days, symptoms may worsen or other symptoms may appear. 
				Watch out for HEAD BUMPS (symptoms listed below). If they occur, seek urgent medical attention.
			</Text>
				<FlatList
					scrollEnabled={false}
					data={[
						{letter: '	H', description: 'Headache, seizure, unconscious.'},
						{letter: '	E', description: 'Eye problems (blurred/double vision).'},
						{letter: '	A', description: 'Abnormal behaviour change.'},
						{letter: '	D', description: 'Dizziness, persistent vomiting.'},
						]}
					renderItem={({item}) => <Text key={item.letter} style={styles.description}><Text style={styles.letter}>{item.letter}</Text> - {item.description}</Text>}
					keyExtractor={(item) => item.letter}
				/>
				<FlatList
					scrollEnabled={false}
					data={[
						{letter: '	B', description: 'Balance dysfunction with weakness or \n               numbness in legs/arms.'},
						{letter: '	U', description: 'Unsteady on feet, slurred speech.'},
						{letter: '	M', description: 'Memory impaired, confused, disoriented.'},
						{letter: '	P', description: 'Poor concentration, drowsy, sleep.'},
						{letter: '	S', description: 'Something\'s not right \n               (concerned about child).'},
						]}
					renderItem={({item}) => <Text key={item.letter} style={styles.description}><Text style={styles.letter}>{item.letter}</Text> - {item.description}</Text>}
					keyExtractor={(item) => item.letter}
				/>
				<TouchableOpacity style={[styles.bottomButton, uiStyle.shadowProp]} onPress={() => navigation.navigate("Concussion Action Plan")}>
					<Text style={uiStyle.buttonLabel}>Back</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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

export default HeadBumpsScreen;