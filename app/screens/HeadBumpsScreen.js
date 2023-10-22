import * as React from 'react';
import { View, FlatList, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../styles/uiStyle';
import styles from '../styles/HeadBumpsScreenStyle';

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

export default HeadBumpsScreen;