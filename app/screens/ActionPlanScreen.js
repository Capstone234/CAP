import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Text,
	Alert,
	SafeAreaView,
	ScrollView,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions
  } from 'react-native';
import ExpandableTab from '../components/ExpandableTab';
import Badge from '../components/Badge';
import { PreliminaryReportRepoContext, AccountContext } from '../components/GlobalContextProvider';

import uiStyle from '../components/uiStyle';
import MyCheckbox from '../components/MyCheckbox';

function ActionPlanScreen({ navigation }) {
	
	const createAlert = () =>
		Alert.alert(
		'Alert',
		'Over the next few days, symptoms may worsen or other symptoms may appear. Watch out for HEAD BUMPS. If they occur, seek urgent medical attention',
		[
			{
			text: 'View Action Plan',
			onPress: () => console.log('Cancel Pressed'),
			},
			{
			text: 'Check Symptoms',
			onPress: () => navigation.navigate('Continue Tests', {screen: "HEAD BUMPS"}),
			},
		],
    );

	const zones = {
		red: {
			color: "red",
			name: "Red"
		},
		orange: {
			color: "orange",
			name: "Orange"
		},
		yellow: {
			color: "#F0C54C",
			name: "Yellow"
		},
		green: {
			color: "green",
			name: "Green"
		}
	}
	const [activeZone, setActiveZone] = useState(zones.red);
	const [isSymptomTolerant, setIsSymptomTolerant] = useState(null);
	const [isSymptomFree24Hours, setIsSymptomFree24Hours] = useState(null);
	const [injuryDate, setInjuryDate] = useState(new Date());
	const [account] = useContext(AccountContext);
	const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);


	// if the account changes, reload the injury date
	useEffect(() => {
		preliminaryReportRepoContext.getLatestReportDate(account.account_id).then((data)=>{
			if(account.account_id == null){
				return
			}
			setInjuryDate(new Date(data.date_of_test));
		}).catch(e => {setInjuryDate(new Date())});
	}, [account]);

	// whenever the data for injury date, doctor clearance or other symptom based information changes, update the zone.
	useEffect(() => {
		// calculate how long it was since the injury
		var today = new Date();
		var difference = today.getTime() - injuryDate.getTime();
		var daysSinceInjury =  Math.floor(difference / (1000 * 3600 * 24));

		// zone logic
		if(daysSinceInjury <= 2){
			setActiveZone(zones.red);
		}else{
			setActiveZone(zones.orange);
		}
		
		if(isSymptomTolerant){
			setActiveZone(zones.yellow);
		}

		if(isSymptomFree24Hours){
			setActiveZone(zones.green);
		}
	}, [isSymptomFree24Hours, isSymptomTolerant, injuryDate])

	useEffect(async () => {
		if(isSymptomFree24Hours == null || isSymptomFree24Hours == null){
			return;
		}
		await AsyncStorage.setItem('actionplan.isSymptomFree24Hours', isSymptomFree24Hours.toString());
		await AsyncStorage.setItem('actionplan.isSymptomTolerant', isSymptomTolerant.toString());
	}, [isSymptomFree24Hours, isSymptomTolerant]);

	useEffect(async () => {
		const isSymptomFree24HoursString = await AsyncStorage.getItem('actionplan.isSymptomFree24Hours');
		const isSymptomTolerantString = await AsyncStorage.getItem("actionplan.isSymptomTolerant");
		setIsSymptomTolerant((isSymptomTolerantString === "true"));
		setIsSymptomFree24Hours((isSymptomFree24HoursString === "true"));
	}, []);

	useEffect(() => {
		createAlert();
	}, []);

	return (
		<SafeAreaView style={uiStyle.container}>
			<ScrollView>
				<Text style={[uiStyle.text, {textAlign: "center", marginBottom: 5}]}>Concussion Action Plan</Text>
				<Badge color={activeZone.color}>{activeZone.name} ZONE</Badge>
				<Text style={[{textAlign: "center", padding: 10, fontWeight: "bold", color: "#003A67"}]}>Have your child complete the following zone and stepwise program. Aim to keep activity within the rating of perceived exertion (RPE) or heart rate guide (if your child has a heart rate monitoring device).{"\n\n"} Seek urgent medical attention if your child's symptoms worsen or if other symptoms appear. {'\n'}</Text>
				<ExpandableTab title="Red    Zone" subtitle="Days 1 and 2 following injury" color={activeZone.name == zones.red.name ? activeZone.color : "lightgrey"} footer="After 2 days of acute rest, you may move on to the next zone." header="RPE - Nothing at all, very very light. Heart rate < 120 bpm">
					<Text style={{fontWeight:"bold"}}>Rest your child from any physical or cognitive activity.{"\n\n\n"}</Text>
					<Text style={{fontWeight:"bold"}}>Supportive Care:{"\n\n"}</Text>
					<Text>
						- Encourage good sleep patterns. Rest your child with no TV, phone or disruptions.{"\n\n"}
						- Provide regular meals and a minimum of 2L of water per day.{"\n\n"}
						- Use over the counter headache medication as needed.{"\n\n"}
						- Complete the Symptoms Log Sheet, monitoring your child's symptoms and signs. Continue using the sheet until your child reaches 14 days without symptoms.{"\n\n"}
						- Encourage your child to have a positive mental attitude towards their recovery.
					</Text>
				</ExpandableTab>
				<ExpandableTab title="Orange Zone" subtitle="Until cleared for light activity" color={activeZone.name == zones.orange.name ? activeZone.color : "lightgrey"} footer="See your GP to check that your child may progress to the next zone. Your child must be symptom tolerant before moving on to Step 1" header="RPE - Very light or light to moderate. Heart rate 120 - 140 bpm">
					<Text style={{fontWeight:"bold"}}>Reccomendations:{"\n\n"}</Text>
					<Text>
						- Start low level physical and cognitive activity. Your child can now move around more freely.{"\n\n"}
						Activites may include:
						{"\n\t"}- less than 20 minutes of daily walking 
						{"\n\t"}- balance exercises (such as single leg stands or heel-toe walking)
						{"\n\t"}- cognitive tasks (such as reading){"\n\n"}
					</Text>
					<Text style={{fontWeight:"bold"}}>Supportive Care:{"\n\n"}</Text>
					<Text>
						- Try to reduce and/or stop headache medication once your child is more physically/mentally active.{"\n\n"}
						- Should sleep pattern remain a problem, then further assessment and possible treatment with Melatonin may be considered.
						This will require medical supervision and is best discussed with your local GP.
						{"\n"}
					</Text>
					<View style={styles.checkboxContainer}>
						<MyCheckbox onUpdate={(val) => setIsSymptomTolerant(val)}/><Text style={styles.checkboxLabel}>{`My child is Symptom Tolerant`}</Text>
					</View>
				</ExpandableTab>
				<ExpandableTab title="Yellow Zone" subtitle="GRADED RETURN TO ACTIVITY" color={activeZone.name == zones.yellow.name ? activeZone.color : "lightgrey"} footer="Progress to the next step if your child is symptom free for 24 hours." header="RPE - Moderate to Hard. Heart rate 80% HRt +10% each week">
					<Text style={{fontWeight:"bold"}}>Step 1 - Light cognitive and physical activity{"\n"}</Text>
					<Text>
						{"\n\t"}- Progress toward 30 minutes of cognitive exertion.
						{"\n\t"}- Your child can perform 20 minutes of aerobic activity at 80% of their heart rate threshold (HRt), increasing by 10% each week.
						{"\n\n"}Progress to the next step if your child is symptom free for 24 hours.
					</Text>
					<Text style={{fontWeight:"bold"}}>{"\n\n"}Step 2 - Moderate cognitive and physical activity{"\n"}</Text>
					<Text>
						{"\n\t"}- Part time school with accommodations (rest breaks, minimal homework, no exams) until able to handle 60 minutes or more of cognitive exertion.
						{"\n\t"}- Specific skills and moderate aerobic activity for 20-30 minutes.
						{"\n\n"}Progress to the next step if your child is symptom free for 24 hours.
					</Text>
					<Text style={{fontWeight:"bold"}}>{"\n\n"}Step 3 - Extended activity{"\n"}</Text>
					<Text>
						{"\n\t"}- Progress towards full time school with minimal accommodations.
						{"\n\t"}- More intense aerobic and skill-based activity on a more regular basis. 
						{"\n"}
					</Text>
					<View style={styles.checkboxContainer}>
						<MyCheckbox onUpdate={(val) => setIsSymptomFree24Hours(val)}/><Text style={styles.checkboxLabel}>{`My child has been symptom free for 24 hours.`}</Text>
					</View>
				</ExpandableTab>
				<ExpandableTab title="Green Zone" subtitle="RETURNING TO PRE-INJURY ACTIVITY" color={activeZone.name == zones.green.name ? activeZone.color : "lightgrey"} header="RPE - Very Hard to Maximal. Heart rate 80 - 100% HRt">
					<Text>Once your child has been cleared to commence a return to activity protocol, they are ready to progress as follows:{"\n"}</Text>
						<Text style={{fontWeight:"bold"}}>{"\n\n"}Step 4 - Pre-injury activity (without contact){"\n"}</Text>
						<Text>
							{"\n\t"}- Full time school with minimal accommodations progressing when able to handle all classroom activities.
							{"\n\t"}-  Attend sport practice, however with no contact or collision activities.
						</Text>
						<Text style={{fontWeight:"bold"}}>{"\n\n"}Step 5 - Reconditioning (without contact){"\n"}</Text>
						<Text>
							{"\n\t"}- Full school.
							{"\n\t"}- Progressively return to non-contact sports over the next few weeks (e.g. 10 minutes half game full game).
							{"\n\t"}- Prepare for return to play with extra aerobic and (if relevant) resistance training. Your child must have 14 days symptom free before returning to contact sport.
						</Text>
						<Text>Your child must be symptom free for 14 days before moving on to Step 6. If clearance is needed for your child's school or sporting club, see your GP to obtain the sign off below.</Text>
						<Text style={{fontWeight:"bold"}}>{"\n\n"}Step 6 - Full activity (with contact){"\n"}</Text>
						<Text>
							{"\n\t"}- Once your child has been symptom free for 14 days, return to all activities without restriction, including contact and collision sports.
						</Text>
				</ExpandableTab>
				<View style={uiStyle.container}>
					<TouchableOpacity style={[styles.bottomButton, uiStyle.shadowProp]} onPress={() => navigation.navigate('Continue Tests', { screen: 'HEAD BUMPS' })}>
						<Text style={uiStyle.buttonLabel}>Check Symptoms</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
};

const styles = StyleSheet.create({
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

export default ActionPlanScreen;