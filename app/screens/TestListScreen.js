import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  Alert
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/TestListScreenStyle';
import uiStyle from '../styles/uiStyle';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import {
  //Import the code we need. eg this now uses MedicalReportRepoContext
  //so we got to import that for the DB functionality.
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../components/GlobalContextProvider';

function TestsListScreen({ navigation, route }) {

  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);
  const [result, setResult] = useState(null);

  console.log(`UserId ${user.uid}  incidentId ${incidentId}`);

  const fetchFinishedUpTo = async () => {
    try {
      const result = await incidentReportRepoContext.getFinishedUpto(user.uid, incidentId);
      setResult(result.finishedupto);
    } catch (error) {
      navigation.navigate("Home Page");
      Alert.alert('Alert', 'No test is currently in progress!\nPlease click \"Begin Check\".', [
        { text: 'OK', onPress: () => navigation.navigate('Home Page') }
      ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFinishedUpTo();
    }, [incidentId])
  );

  // tests information
  const tests = [
    {
      order: 1,
      title: "Red Flag Checklist",
      link: "Red flags checklist",
    },
    {
      order: 2,
      title: "Verbal Test",
      link: "Verbal Test 0",
    },
    {
      order: 3,
      title: "PCSS",
      link: "PCSS Checklist",
    },
    {
      order: 4,
      title: "Memory Test 1",
      link: "Further Tests"
    },
    {
      order: 5,
      title: "Balance Test 1",
      link: "Balance Test 1"
    },
    {
      order: 6,
      title: "Balance Test 2",
      link: "Balance Test 4"
    },
    {
      order: 7,
      title: "VOMS Test",
      link: "VOMS Start"
    },
    {
      order: 8,
      title: "Hop Test",
      link: "Hop Test 1"
    },
    {
      order: 9,
      title: "Memory Test 2",
      link: "Memory Test 5 Intro"
    },
  ];


return (
    <View style={uiStyle.container}>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Remaining Tests</Text>
            <View style={[styles.containerButton, styles.shadowProp]}>
          {
            tests.map((test, index) => {
              const buttonStyle = {
                backgroundColor: test.order < result + 1
                  ? '#003A67' // medium blue
                  : test.order === result + 1
                  ? '#349BEB' // dark blue
                  : test.order > result + 1
                  ? '#808080' // gray
                  : 'red',
                  width: test.order === result + 1
                   ? Dimensions.get('window').width/1.5
                   : Dimensions.get('window').width/1.75,
                  height: test.order === result + 1
                     ? Dimensions.get('window').width/6
                     : Dimensions.get('window').width/8,
                  borderRadius: test.order === result + 1
                     ? 40
                     : 30,
                  elevation: test.order === result + 1
                   ? 8
                   : 3,
            };
            const buttonTextStyle = {
                color: test.order > result + 1
                 ? '#003A67'
                 : '#fff',
            };
            const isDisabled = test.order !== result + 1;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // Navigate to the selected test screen when a test is clicked
                  navigation.navigate('Continue Tests', {screen: test.link});
                }}
                style={[buttonStyle, styles.generalButton]}
                disabled={isDisabled}
              >
                <Text style={[buttonTextStyle, styles.buttonText]}>{test.title}</Text>
              </TouchableOpacity>
            );
          })}
            </View>
        </View>
    </View>
  );
}

export default TestsListScreen;
