import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import { useEffect, useContext, useState, useRef } from 'react';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import uiStyle from '../components/uiStyle';

const parseMultiResponses = (mrs, memoryTest2Responses) => {
  const memoryTestCorrectAnswers = [];
  const memoryTest1Responses = [];
  const balanceTest1Responses = [];
  const balanceTest2Responses = [];

  const testResultsArray = [];
  if (mrs !== null) {
    mrs.forEach((mr) => {
      if (
        mr.description === 'Memory Test Correct Answers' &&
        mr.MultiResponsePart !== undefined
      ) {
        mr.MultiResponsePart.forEach((mrp) => {
          memoryTestCorrectAnswers.push(mrp.response);
        });
      } else if (
        mr.description === 'Memory Test Part 1' &&
        mr.MultiResponsePart !== undefined
      ) {
        mr.MultiResponsePart.forEach((mrp) => {
          memoryTest1Responses.push(mrp.response);
        });
      } else if (
        mr.description ===
          'BalanceTest-response: first SD, second VAR, one foot in front of the other' &&
        mr.MultiResponsePart !== undefined
      ) {
        mr.MultiResponsePart.forEach((mrp) => {
          balanceTest1Responses.push(mrp.response);
        });
      } else if (
        mr.description ===
          'BalanceTest-response: first SD, second VAR, one leg up' &&
        mr.MultiResponsePart !== undefined
      ) {
        mr.MultiResponsePart.forEach((mrp) => {
          balanceTest2Responses.push(mrp.response);
        });
      }
    });
  }
  let memory1Correct = 0;
  let memory2Correct = 0;
  memoryTest1Responses.forEach((element) => {
    if (memoryTestCorrectAnswers.includes(element)) {
      memory1Correct++;
    }
  });
  memoryTest2Responses.forEach((element) => {
    if (memoryTestCorrectAnswers.includes(element)) {
      memory2Correct++;
    }
  });
  if (memory1Correct === 3) {
    testResultsArray.push('Initial Memory Test Result: Passed');
  } else {
    testResultsArray.push('Initial Memory Test Result: Failed');
  }
  if (memory2Correct === 3) {
    testResultsArray.push('Follow-up Memory Test Result: Passed');
  } else {
    testResultsArray.push('Follow-up Memory Test Result: Failed');
  }
  if (balanceTest1Responses[0] < 0.2 && balanceTest1Responses[1] < 0.05) {
    testResultsArray.push('Balance Test 1 Result: Passed');
  } else {
    testResultsArray.push('Balance Test 1 Result: Failed');
  }
  if (balanceTest2Responses[0] < 0.2 && balanceTest2Responses[1] < 0.05) {
    testResultsArray.push('Balance Test 2 Result: Passed');
  } else {
    testResultsArray.push('Balance Test 2 Result: Failed');
  }
  return testResultsArray;
};

const reactionThreshold = 500;
const parseReactionTest = (rt) => {
  const reactionTestResponses = [];
  if ((rt.time_attempt_1 < reactionThreshold || rt.time_attempt_2 < reactionThreshold || rt.time_attempt_3 < reactionThreshold)) {
    reactionTestResponses.push('Reaction Test Result: Passed');
  } else {
    reactionTestResponses.push('Reaction Test Result: Failed');
  }
  return reactionTestResponses;
};

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 * @param {boolean} route.params.secondMemoryTestResponses response of the second memory test. Inserting from the
 * previous screen tends to be too slow.
 */
function FurtherTestsResultsScreen({ route, navigation }) {
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [reportId] = useContext(ReportIdContext);
  const [mtAndBtResults, setMTBTResults] = useState([]);
  const [reactionTest, setReactionTest] = useState(null);
  const [account] = useContext(AccountContext);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    incidentRepoContext
      .getMultiResponses(reportId)
      .then((mrs) =>
        parseMultiResponses(mrs, route.params.secondMemoryTestResponses),
      )
      .then((res) => setMTBTResults(res));
    incidentRepoContext
      .getReactionTest(reportId)
      .then((rt) => parseReactionTest(rt))
      .then((rs) => setReactionTest(rs));
  }, [incidentRepoContext, reportId, route.params.secondMemoryTestResponses]);
  let allTestResults = [];
  if (reactionTest !== null && mtAndBtResults.length > 0) {
    let i = 0;
    for (; i < mtAndBtResults.length; i++) {
      allTestResults.push(
        <Text key={i} style={uiStyle.text}>
          {mtAndBtResults[i]}
        </Text>,
      );
    }
    allTestResults.push(
      <Text key={99} style={uiStyle.text}>
        {reactionTest}
      </Text>,
    );
  }
  const createAlert = () =>
  Alert.alert(
    'Alert',
    'Save To Profile',
    [
      {
        text: 'Save to new profile',
        onPress: () => navigation.navigate('Login'),
      },
      {
        text: 'Save to logged profile',
        onPress: () => {
          console.log(account.account_id);
          console.log(prelimReportId);
          incidentRepoContext.updateReport(account.account_id, prelimReportId);
          navigation.navigate('Home')}
        ,
      },
    ],
  );

  return (
    <View style={uiStyle.container}>
      <Text style={uiStyle.titleText}>Further Tests Results</Text>
      <ScrollView>{allTestResults}</ScrollView>
      <TouchableOpacity onPress={()=>{
        if(account.account_id != null && account.first_name != 'John'){
          
          createAlert();
        }
        else{
          navigation.navigate('Login');
        }
      }} style={styles.bottomButton}>
                <Text style={styles.buttonLabel}>Save Report</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    marginLeft: 10,
    width: 300,
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderRadius: 100,
    backgroundColor: '#FB582F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FurtherTestsResultsScreen;
