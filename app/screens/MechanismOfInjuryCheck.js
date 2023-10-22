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
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);

  async function fetchBalance(uid, iid) {
    try {
      const mechanism = await incidentReportRepoContext.getMechanism(uid, iid);
      console.log(mechanism);
    } catch (error) {
      console.error('Error fetching balance result:', error);
    }
  }

  const handleCreateSResponse = (res) => {
    incidentReportRepoContext.setMechanism(user.uid, incidentId, res);
    fetchBalance(user.uid, incidentId);
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
              incidentReportRepoContext.setFinishedupto(incidentId, 1);
              handleCreateSResponse('YES');
              navigation.navigate('Verbal Test 0');
            }}
          >
            <Text style={styles.label}>YES</Text>
          </Pressable>

          <Pressable testID='NO' accessible={true} accessibilityLabel={'NO'} label='NO'
            style={styles.buttonNo}
            onPress={() => {
              incidentReportRepoContext.setFinishedupto(incidentId, 1);
              handleCreateSResponse('NO');
              navigation.navigate('Verbal Test 0');
            }}
          >
            <Text style={styles.label}>NO</Text>
          </Pressable>
        </View>
        <View style={styles.sameRow}>
          <Pressable testID='MAYBE' accessible={true} accessibilityLabel={'MAYBE/UNSURE'} label='MAYBE'
            style={styles.buttonMaybe}
            onPress={() => {
              incidentReportRepoContext.setFinishedupto(incidentId, 1);
              handleCreateSResponse('MAYBE');
              navigation.navigate('Verbal Test 0');
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
