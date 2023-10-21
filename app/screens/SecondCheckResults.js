import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext,
} from '../components/GlobalContextProvider';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/SecondCheckResultsScreenStyle';

import preventBackAction from '../components/preventBackAction';

const parseSingleResponses = (srs) => {

  let responsesArray = [];
  if (srs !== null) {
    srs.forEach((element) => {
      if (
        element.description === 'Mechanism of injury response' &&
        element.response === 'YES'
      ) {
        responsesArray.push('Yes');
      }
    });
  }
  return responsesArray;
};
/**
 * The screen will show the result after user has completed PCSS test.
 * The screen will either be:
 * patient needs to go to GP ASAP,
 * or
 * do further test to assess concussion or go to home and create profile
 *
 *TODO: Currently this uses data passed by navigation rather than the
 *DB data we should probably change this to pull from the DB to keep it
 *consistent since you can go back and mess with sliders for different answer
 *here but the db wont change the first result
 *
 * @param {boolean} route.params.hasSymptoms if the individual has any PCSS symptoms
 */
function SecondCheckResults({ route, navigation }) {

    preventBackAction();
    
  // Context variables
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const mounted = useRef(false);
  const [symptoms, setSymptoms] = useState(0);
  const [users, setUsers] = useState([]);
  const userRepoContext = useContext(UserRepoContext);
  const [user] = useContext(UserContext);
  const sliderResult = route.params;

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  // Local state
  let screen;


  let result = Object.values(sliderResult)[0]
  if (result >= 60) {

    screen = (
      <View style={uiStyle.container}>
        <Text style={styles.titleText}>Result</Text>

        <ScrollView>
          <View style={uiStyle.container}>
            <Text style={uiStyle.stackedText}>
              The affected individual is displaying some symptoms of concussion.
              {'\n'}{'\n'}
              We strongly recommend you complete our preliminary tests.
              {'\n'}{'\n'}
              If you are concerned, immediately contact a GP.
            </Text>
          </View>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, uiStyle.shadowProp]}
            onPress={() => navigation.navigate('Further Tests')}
          >
            <Text
              style={uiStyle.buttonLabel}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Complete Preliminary Tests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    screen = (
      <View style={uiStyle.container}>
        <Text style={styles.titleText}>Result</Text>

        <ScrollView>
          <View style={uiStyle.container}>
            <Text style={uiStyle.stackedText}>
              There is a low probability of a concussion injury.
              {'\n'}{'\n'}
              However, we strongly recommend you immediately remove yourself from
              play and complete the preliminary tests down below.
              {'\n'}{'\n'}
              You should rest for the next 24 hours. If symptoms should develop,
              see a GP immediately.
            </Text>
          </View>
        </ScrollView>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, uiStyle.shadowProp]}
            onPress={() => navigation.navigate('Further Tests')}
          >
            <Text
              style={uiStyle.buttonLabel}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
            >
              Complete Preliminary Tests
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      {screen}
    </SafeAreaView>
  );
}

export default SecondCheckResults;
