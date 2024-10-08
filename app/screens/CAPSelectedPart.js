import * as React from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../components/GlobalContextProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/CAPTestScreenStyle';
import uiStyle from '../styles/uiStyle';

function CAPSelectedPart({navigation}){
    const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
      const incidentReportRepoContext = useContext(IncidentReportRepoContext);
      const [user, setUser] = useContext(UserContext);
        //debug function to confirm that the db got updated
      async function fetchIncidents(uid) {
        try {
          const incidents = await incidentReportRepoContext.getIncidents(uid);
          console.log(incidents);
        } catch (error) {
          console.error('Error fetching incidents:', error);
        }
      }
      const createAlert = () =>
        Alert.alert(
          'Alert',
          'We strongly recommend you have someone else do the concussion check for you',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                // Create a report and fetch incidents here
                incidentReportRepoContext.createReport(user.uid, user.username, null, 0, 0).then((id) => {
                  // Update ReportId context for the app;
                  updateIncidentId(id);
                  fetchIncidents(incidentId);
                  // Navigate to the desired screen
                  navigation.navigate('Continue Tests', { screen: 'Red flags checklist' });
                });
              }
            },
          ],
        );
    return (
        <SafeAreaView style={uiStyle.container}>
            <View style={styles.inputAreaContainer}>
                <TouchableOpacity
                            style={[styles.bottomButton, styles.shadowProp]}
                            onPress={() => {
                                navigation.navigate('Continue Tests', {screen: 'Doctor Auth'});
                            }}
                          >
                            <Text
                              style={uiStyle.buttonLabel}
                              maxFontSizeMultiplier={1}
                            >
                              Doctor to complete
                            </Text>
                          </TouchableOpacity>
                <TouchableOpacity
                                            style={[styles.bottomButton, styles.shadowProp]}
                                            onPress={() => {
                                                navigation.navigate('Continue Tests', {screen: 'Parent Part'});
                                            }}
                                          >
                                            <Text
                                              style={uiStyle.buttonLabel}
                                              maxFontSizeMultiplier={1}
                                            >
                                              Parent to complete
                                            </Text>
                                          </TouchableOpacity>
                <TouchableOpacity
                                            style={[styles.bottomButton, styles.shadowProp]}
                                            onPress={() => {
                                                navigation.navigate('Continue Tests', {screen: 'Prelim Report'});
                                            }}
                                          >
                                            <Text
                                              style={uiStyle.buttonLabel}
                                              maxFontSizeMultiplier={1}
                                            >
                                              Patient to complete
                                            </Text>
                                          </TouchableOpacity>

                <TouchableOpacity
                                                            style={[styles.nextButton, styles.shadowProp]}
                                                            onPress={() => {
                                                                navigation.navigate('Continue Tests', {screen: 'Prelim Report'});
                                                            }}
                                                          >
                                                            <Text
                                                              style={styles.nextText}
                                                              maxFontSizeMultiplier={1}
                                                            >
                                                              Next
                                                            </Text>
                                                          </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

export default CAPSelectedPart
