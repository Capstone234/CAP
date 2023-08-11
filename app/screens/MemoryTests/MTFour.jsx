import * as React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import uiStyle from '../../components/uiStyle.jsx';

import { useContext, useState } from 'react';

import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../../components/GlobalContextProvider';
import DisplayOptions from '../../components/MemoryTests/DisplayOptions';
import { getShuffledOptions } from '../../model/constants/MemoryTestOptions';

/**
 * The screen will be perform memory test.
 * This is the first test out of the Further Tests
 * After this test is completed, user needs to navigate to the next test which
 * is Reaction Test.
 */

function MTFour({ navigation }) {
  // Context variables
  const [reportId] = useContext(ReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [options] = useState(getShuffledOptions());

  const handleCreateMultiResponse = (res) => {
    const desc = 'Memory Test Part 1';
    incidentRepoContext.setMultiResponse(reportId, desc, res).then((r) => {});
  };

  // updates const list when onCheckmarkPress() is called
  function onUpdate(name) {
    let index = chosenList.indexOf(name);
    if (index === -1) {
      chosenList.push(name); // if it isn't stored add it to the array
    } else {
      chosenList.splice(index, 1); // if it is stored then remove it from the array
    }
    return { chosenList };
  }

  const chosenList = [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={uiStyle.text}>
        What three images does your patient remember?
      </Text>
      <ScrollView style={{ margin: 10 }}>
        <SafeAreaView style={uiStyle.container}>
          <DisplayOptions options={options} updateOption={onUpdate} />
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          handleCreateMultiResponse(chosenList);
          navigation.navigate('Reaction Test 1');
        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default MTFour;
