import * as React from 'react';
import { useContext, useState } from 'react';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../components/GlobalContextProvider';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import uiStyle from '../../styles/uiStyle';
import preventBackAction from '../../components/preventBackAction';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 *
 * @param {number[]} route.params.attemptResults time for each attempt
 * @param {number} route.params.avg average time
 * @param {string} route.params.grade pass or fail
 */
export default function RTThree({ route, navigation }) {
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  preventBackAction();


  const reactionTest = route.params;
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Button
  //         onPress={() => navigation.navigate('Reaction Test 1')}
  //         title="REDO Test"
  //       />
  //     ),
  //   });
  // }, [navigation]);

  let resultComponent = <></>;
  let grade = 'pass';
  if (reactionTest.pass == 0) {
    grade = 'fail';
  }

  resultComponent = (
    <Text style={uiStyle.stackedText}>
      Attempt 1: {reactionTest.attemptResults[0]} ms
      {'\n'}
      Attempt 2: {reactionTest.attemptResults[1]} ms
      {'\n'}
      Attempt 3: {reactionTest.attemptResults[2]} ms
      {'\n'}
      {'\n'}
      Your average reaction time is {reactionTest.average.toFixed(2)} ms
      {'\n'}
      {'\n'}
      Your overall grade is {grade}
    </Text>
  );

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={uiStyle.container}>
        <Text  style={[uiStyle.titleText, uiStyle.titleTextBox]}>Results</Text>

        <View style={uiStyle.infoTextContainer}>
        <ScrollView style={uiStyle.stackedTextBox}>{resultComponent}</ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Balance Test 1')}
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp]}
          >
            <Text style={uiStyle.buttonLabelWhite}>Start Balance Test!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
