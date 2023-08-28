import * as React from 'react';
import {
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  IncidentReportRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';
import { useContext, useState } from 'react';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/TextQuestionScreenStyle';
/**
 * Asks user for details about the concussion and gives a suggestion based on
 * the user's responses.
 */

function TextQuestionScreen({ navigation }) {
  const [value, onChangeText] = React.useState('');

  const [reportId, setReportId] = useContext(ReportIdContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);
  const [responses, setResponses] = useState(null);
  const handleResponseDescription = () => {
    const desc = 'text question';
    incidentRepoContext.setSingleResponse(reportId, desc, value).then(() => {
      incidentRepoContext
        .getSingleResponses(reportId)
        .then((sr) => setResponses(JSON.stringify(sr)));
    });
  };
  const myFunction = () => {
    navigation.navigate('Incident report 4');
    handleResponseDescription();
  };
  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.text}>
        {' '}
        Is there an alternative explanation for the affected person’s symptoms?
        If yes, please briefly note it down.
      </Text>
      <SafeAreaView style={uiStyle.textContainer}>
        <TextInput
          style={styles.content}
          onChangeText={(text) => onChangeText(text)}
          textDecorationLine={'none'}
          value={value}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </SafeAreaView>
      <Pressable style={uiStyle.bottomButton} onPress={() => myFunction()}>
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default TextQuestionScreen;
