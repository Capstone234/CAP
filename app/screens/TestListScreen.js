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
import StringUtils from '../model/database/StringUtils';
import styles from '../styles/TestListScreenStyle';
import uiStyle from '../styles/uiStyle';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import {
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

  const getPatientName = () => {
    try {
        incidentReportRepoContext.getIncidentPatient(user.uid, incidentId).then((values) => {
          const patientInfoRaw = StringUtils.split(values);
          if (values != null) {
            return "for " + patientInfoRaw[0];
          } else {
            return "";
          }
        });
    } catch (error) {
        console.error('Error fetching incident result:', error);
    }
  };

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
      title: "Mechanism of Injury",
      link: "Mechanism Of Injury Check",
    },
    {
      order: 3,
      title: "Verbal Test",
      link: "Verbal Test 0",
    },
    {
      order: 4,
      title: "PCSS",
      link: "PCSS Checklist",
    },
    {
      order: 5,
      title: "Memory Test 1",
      link: "Further Tests"
    },
    {
      order: 6,
      title: "Reaction Test",
      link: "Reaction Test 1"
    },
    {
      order: 7,
      title: "Balance Test 1",
      link: "Balance Test 1"
    },
    {
      order: 8,
      title: "Balance Test 2",
      link: "Balance Test 4"
    },
    {
      order: 9,
      title: "VOMS Test",
      link: "VOMS Start"
    },
    {
      order: 10,
      title: "Hop Test",
      link: "Hop Test 1"
    },
    {
      order: 11,
      title: "Memory Test 2",
      link: "Memory Test 5 Intro"
    },
  ];


return (
    <View style={uiStyle.container}>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Remaining Tests</Text>
            <View style={[styles.containerButton, styles.shadowProp]}>
                <View style={styles.detailsView}>
                 <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Continue Tests', {screen: 'Patient Details'});
                    }}
                    style={[styles.generalButton, styles.detailsButton, { marginRight: 20 }]}>
                    <Text style={[styles.detailsText, styles.buttonText]}>Patient</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Continue Tests', {screen: 'Login'});
                      }}
                      style={[styles.generalButton, styles.detailsButton]}>
                      <Text style={[styles.detailsText, styles.buttonText]}>Owner</Text>
                    </TouchableOpacity>
                 </View>
          {
            tests.map((test, index) => {
              const buttonStyle = {
                backgroundColor: test.order < result + 1
                  ? '#003A67' // medium blue
                  : test.order === result + 1
                  ? '#349BEB' // dark blue
                  : test.order > result + 1
                  ? '#808080' // gray
                  : 'red', // for unknown error
                  width: test.order === result + 1
                   ? Dimensions.get('window').width/1.75
                   : Dimensions.get('window').width/2.3,
                  height: test.order === result + 1
                     ? Dimensions.get('window').height/15
                     : Dimensions.get('window').height/20,
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
