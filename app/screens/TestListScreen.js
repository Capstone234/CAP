import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
import styles from '../styles/DisclaimerStyle';
import { Ionicons } from '@expo/vector-icons';
import uiStyle from '../styles/uiStyle';
import { useFocusEffect } from '@react-navigation/native';

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
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFinishedUpTo();
    }, [incidentId])
  );


//  // Use an effect to continuously check for changes in result
//  useEffect(() => {
//    const interval = setInterval(fetchFinishedUpTo, 5000); // Adjust the interval as needed
//    return () => clearInterval(interval);
//  }, []);


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

//  const handleText1Click = () => {
//    // Handle click for Text 1
//    fetchFinishedUpTo()
//    console.log('Fetch finished up to');
//  };
//
//  const handleText2Click = () => {
//    // Handle click for Text 2
//    console.log('Text 2 clicked');
//  };


  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={styles.titleText}>Lists of Tests:</Text>
      {
        tests.map((test, index) => {
          console.log(result);
          const buttonStyle = {
            backgroundColor: test.order < result + 1
              ? 'green'
              : test.order === result + 1
              ? 'blue'
              : test.order > result + 1
              ? 'gray'
              : 'red'
        };
        const isDisabled = test.order !== result;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // Navigate to the selected test screen when a test is clicked
              navigation.navigate(test.link);
            }}
            style={buttonStyle}
            disabled={isDisabled}
          >
            <Text>{test.title}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

export default TestsListScreen;
