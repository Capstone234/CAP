import * as React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect, useCallback } from 'react';
import uiStyle from '../components/uiStyle.jsx';
import exportObjectAsCsv, { exportMapAsCsv } from '../model/exportAsCsv';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const parseMTBTMultiResponses = (mrs) => {
  const memoryTestCorrectAnswers = [];
  const memoryTest1Responses = [];
  const memoryTest2Responses = [];
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
        mr.description === 'Memory Test Part 2' &&
        mr.MultiResponsePart !== undefined
      ) {
        mr.MultiResponsePart.forEach((mrp) => {
          memoryTest2Responses.push(mrp.response);
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
  if (
    memoryTest1Responses.length === 0 &&
    memoryTest2Responses.length === 0 &&
    balanceTest1Responses.length === 0 &&
    balanceTest2Responses.length === 0
  ) {
    return [];
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
const parseMultiResponses = (mrs) => {
  const checkResponsesArray = [];
  if (mrs !== null) {
    mrs.forEach((mr) => {
      if (
        mr.description === 'Red Flags' &&
        mr.MultiResponsePart !== undefined
      ) {
        checkResponsesArray.push('Red Flags Checklist');
        let counter = 0;
        mr.MultiResponsePart.forEach((mrp) => {
          counter++;
          checkResponsesArray.push(mrp.response);
        });
        if (counter === 0) {
          checkResponsesArray.push('No symptoms');
        }
      } else if (
        mr.description === 'PCSS Checklist' &&
        mr.MultiResponsePart !== undefined
      ) {
        checkResponsesArray.push('PCSS Checklist:');
        let counter = 0;
        mr.MultiResponsePart.forEach((mrp) => {
          counter++;
          checkResponsesArray.push(mrp.response);
        });
        if (counter === 0) {
          checkResponsesArray.push('No symptoms');
        }
      }
    });
  }
  return checkResponsesArray;
};

const parseReactionTest = (rt) => {
  const reactionTestResponses = [];
  if (rt === undefined) {
    return reactionTestResponses;
  }
  if ((rt.time_attempt_1 + rt.time_attempt_2 + rt.time_attempt_3) / 3 < 500) {
    reactionTestResponses.push('Reaction Test Result: Passed');
  } else {
    reactionTestResponses.push('Reaction Test Result: Failed');
  }
  return reactionTestResponses;
};

const parseVOMSTest = (vts) => {
  const vomsR = [];
  if (vts === undefined) {
    return vomsR;
  }
  vts.forEach((vt) => {
    const r = `${vt.description}: headache: ${vt.headache_rating}: nausea: ${vt.nausea_rating}: dizziness: ${vt.dizziness_rating}: fogginess: ${vt.fogginess_rating} `;
    vomsR.push(r);
  });

  return vomsR;
};

const parseVOMSNPCDistance = (npc) => {
  const npcDist = null;
  if (npc === undefined) {
    return npcDist;
  }
  npc = `Near point of convergence distance: ${npc.distance}`;
  return npc;
};

function ReportScreen({ navigation }) {
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [reportId] = useContext(ReportIdContext);
  const [mtAndBtResults, setMTBTResults] = useState([]);
  const [responses, setResponses] = useState([]);
  const [vomsR, setVomsR] = useState([]);
  const [npcDistance, setNPCDistance] = useState(null);

  const [reactionTest, setReactionTest] = useState(null);
  const [patient] = useContext(PatientContext);
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
      .then((mrs) => parseMTBTMultiResponses(mrs))
      .then((res) => setMTBTResults(res));
    incidentRepoContext
      .getMultiResponses(reportId)
      .then((mrs) => parseMultiResponses(mrs))
      .then((res) => setResponses(res));
    incidentRepoContext
      .getReactionTest(reportId)
      .then((rt) => parseReactionTest(rt))
      .then((rs) => setReactionTest(rs));
    incidentRepoContext
      .getAllVOMSSymptoms(reportId)
      .then((sym) => parseVOMSTest(sym))
      .then((res) => setVomsR(res));
    incidentRepoContext
      .getVOMSNPCDistance(reportId)
      .then((npc) => parseVOMSNPCDistance(npc))
      .then((res) => setNPCDistance(res));
  }, [incidentRepoContext, reportId]);
  let allTestResults = [];
  if (responses.length > 0) {
    let i = 0;
    for (; i < responses.length; i++) {
      allTestResults.push(
        <Text key={i} style={uiStyle.text}>
          {responses[i]}
        </Text>,
      );
    }
  }
  if (reactionTest !== null && mtAndBtResults.length > 0) {
    let i = 0;
    for (; i < mtAndBtResults.length; i++) {
      allTestResults.push(
        <Text key={i + 77} style={uiStyle.text}>
          {mtAndBtResults[i]}
        </Text>,
      );
    }
    allTestResults.push(
      <Text key={i + 177} style={uiStyle.text}>
        {reactionTest}
      </Text>,
    );
  }
  const handleExport = useCallback(() => {
    let results = [];

    if (reactionTest !== null && mtAndBtResults.length > 0) {
      results.push(...mtAndBtResults);
      results.push(...reactionTest);
    }

    if (npcDistance !== null) {
      results.push(npcDistance);
    }

    if (results.length === 0) {
      return;
    }

    if (vomsR.length === 0) {
      return;
    }

    if (npcDistance === null) {
      return;
    }

    const fileName = `${patient.first_name}Report${reportId}Results`;

    let mapEntries = [
      ['report_id', reportId],
      ['patient_id', patient.patient_id],
      ...results.map((res) => {
        if (res !== null) {
          let split = res.split(': ');

          return [split[0].trim(), split[1].trim()];
        }
      }),
    ];

    const map = new Map(mapEntries);

    let vomsMapEntries = [
      ...vomsR.map((res) => {
        if (res !== null) {
          let split = res.split(': ');

          return [
            split[0].trim(),
            split[1].trim(),
            split[2].trim(),
            split[3].trim(),
            split[4].trim(),
            split[5].trim(),
            split[6].trim(),
            split[7].trim(),
            split[8].trim(),
          ];
        }
      }),
    ];

    exportMapAsCsv(
      fileName,
      map,
      vomsMapEntries,
      npcDistance,
      'Share report csv file',
    ).catch(alert);
  }, [
    reactionTest,
    mtAndBtResults,
    patient.first_name,
    patient.patient_id,
    reportId,
    npcDistance,
    vomsR,
  ]);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={uiStyle.titleText}>Report</Text>
      <ScrollView>{allTestResults}</ScrollView>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={handleExport}
      >
        <MaterialCommunityIcons name="share-variant" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const title = '#000000';
const text = '#fff';
const background = '#fff';
const buttons = '#ff0000';
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: background,
    justifyContent: 'center',
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
    top: 50,
  },
  startCheckText: {
    color: text,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
