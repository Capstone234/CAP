import * as React from 'react';
import {
  Text,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';

import { useContext, useState } from 'react';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext,
} from '../components/GlobalContextProvider';

import uiStyle from '../styles/uiStyle';
import styles from '../styles/MechanismOfInjuryCheckScreenStyle';

/**
 * Asks user if there was a clear head injury
 * Response; Yes, Maybe/Unsure, No.
 */
function MechanismOfInjuryCheck({ navigation }) {
  // Context variables
  const [user, setUser] = useContext(UserContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const userRepoContext = useContext(UserRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);

  const handleCreateSResponse = (res) => {
    const desc = 'Mechanism of injury response';
    incidentRepoContext.setSingleResponse(incidentId, desc, res).then(() => {
      incidentRepoContext
        .getSingleResponses(incidentId)
        .then((sr) => setResponses(JSON.stringify(sr)));
    });
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <Text style={uiStyle.text}>
        Was there a clear impact to the body or head?
      </Text>
      <SafeAreaView style={uiStyle.textContainer}>
        <View style={styles.sameRow}>
          <Pressable testID='YES' accessible={true} accessibilityLabel={'YES'} label='YES'
            style={styles.buttonYes}
            onPress={() => {
              handleCreateSResponse('YES');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>YES</Text>
          </Pressable>

          <Pressable testID='NO' accessible={true} accessibilityLabel={'NO'} label='NO'
            style={styles.buttonNo}
            onPress={() => {
              handleCreateSResponse('NO');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>NO</Text>
          </Pressable>
        </View>
        <View style={styles.sameRow}>
          <Pressable testID='MAYBE' accessible={true} accessibilityLabel={'MAYBE/UNSURE'} label='MAYBE'
            style={styles.buttonMaybe}
            onPress={() => {
              handleCreateSResponse('MAYBE');
              navigation.navigate('PCSS Checklist');
            }}
          >
            <Text style={styles.label}>MAYBE/UNSURE</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

export default MechanismOfInjuryCheck;
