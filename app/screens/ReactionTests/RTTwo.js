import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { useContext, useEffect, useState } from 'react';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/ReactionTestsStyles/RTTwoStyle';

import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../../components/GlobalContextProvider';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function RTTwo({ navigation }) {
  const [attemptResults, setAttemptResults] = useState([]);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);

  // Start time in milliseconds
  const [startMs, setStartMs] = useState(null);

  // Stage = button stage from start -> wait -> press
  const [stage, setStage] = useState(0);

  let btnStyle;
  let btnOnPress = () => {};
  let btnTxt;

  async function fetchReactionTest(uid, iid) {
    try {
      const reactionTest = await incidentReportRepoContext.getReaction(uid, iid);
      console.log(reactionTest);
    } catch (error) {
      console.error('Error fetching reaction test:', error);
    }
  }

  // Stage 0 is the start stage, waiting for user to press button
  if (stage === 0) {
    btnStyle = styles.startButton;
    btnOnPress = () => {
      setStage(1);
      setTimeout(() => {

        // Start timer as soon as the circle turns yellow
        setStartMs(Date.now());
        setStage(2);
      }, getRandomInt(2000, 5000)); // Wait between 2 and 5 seconds, then set to next stage
    };
    btnTxt = 'Start';

  // Stage 1 is the wait stage
  } else if (stage === 1) {
    btnTxt = 'Wait...';
    btnStyle = styles.waitButton;

  // Stage 2 is the press stage
  } else if (stage === 2) {
    btnTxt = 'Press!';
    btnStyle = styles.pressButton;
    btnOnPress = () => {

      setAttemptResults((prevAttemptResults) => [
        ...prevAttemptResults,
        Date.now() - startMs,
      ]);

      setStartMs(null);
      setStage(0);
    };
  }

  const threshold = 500;

  // Check if user has failed or passed tests
  useEffect(() => {

    if (attemptResults.length === 3) {
      let pass = 0;
      if (attemptResults[0] >= threshold || attemptResults[1] >= threshold ||
        attemptResults[2] >= threshold) {
            pass = 0;
      } else {
        pass = 1;
      }
      // Calculate the sum of all numbers in the array
      const sum = attemptResults.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      // Calculate the mean (average)
      const average = sum / attemptResults.length;
      incidentReportRepoContext.setReaction(user.uid, incidentId,
                                                attemptResults[0], attemptResults[1],
                                                attemptResults[2], average, pass);
      fetchReactionTest(user.uid, incidentId)
      navigation.navigate('Reaction Test 3', { pass, average, attemptResults });

    }
  }, [attemptResults, navigation]);

  return (
    <View style={uiStyle.container}>
      <View testID='btnOnPress' accessible={true} accessibilityLabel={'btnOnPress'} label='btnOnPress' style={uiStyle.textContainer} onTouchStart={btnOnPress}>
        <View testID='btnView' accessible={true} accessibilityLabel={'btnView'} label='btnView' style={uiStyle.textContainer}>
          <TouchableOpacity testID='btn' accessible={true} accessibilityLabel={'btn'} label='btn'
          style={[styles.reactionButton, btnStyle]}>
            <Text style={styles.startText}>{btnTxt}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RTTwo;
