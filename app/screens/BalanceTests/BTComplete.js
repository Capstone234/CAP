import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ImageBackground,
  ProgressBarAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useContext } from 'react';
import uiStyle from '../../styles/uiStyle';
import styles from '../../styles/BalanceTestsStyles/BTCompleteStyle';
import ProgressBar from '../../styles/ProgressBar';
import {
  IncidentIdContext,
  IncidentReportRepoContext,
} from '../../components/GlobalContextProvider';

import preventBackAction from '../../components/preventBackAction';

function BTComplete({ navigation }) {
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);

  preventBackAction();

  return (
    <SafeAreaView style={uiStyle.container}>
      <ImageBackground style={styles.image}
        source={require('../../../assets/b3.png')}>
        <ProgressBar percentage={30} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={[uiStyle.titleText, uiStyle.titleTextBox]}
            adjustsFontSizeToFit={true}
            numberOfLines={1}
          >
            Balance Test Complete
          </Text>
        </View>

        <View style={uiStyle.infoTextContainer}>
        <ScrollView style={uiStyle.stackedTextBox}>
          <Text style={uiStyle.stackedText}>
            You have successfully completed the first balance test. Press next
            to continue to the second balance test.
          </Text>
        </ScrollView>
        </View>

        <View style={uiStyle.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Balance Test 4');
            }}
            style={[uiStyle.bottomButtonBlue, uiStyle.shadowProp, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
          >
            <Text style={[uiStyle.buttonLabelWhite, { flex: 1 }]}>Next</Text>
            <Ionicons name="arrow-forward-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default BTComplete;
