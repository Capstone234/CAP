import * as React from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { useContext, useState } from 'react';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../components/GlobalContextProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles/HomeScreenStyle';

/**
 * Starting screen that handles navigation to main app flows.
 *
 * @param navigation used to move to the other screens
 */
function HomeScreen({ navigation }) {
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <ImageBackground style={styles.image}
            source = {require('../../assets/logo.png')}>
          <View style={styles.containerText}>
            <Text
              style={styles.titleText}
              maxFontSizeMultiplier={1}
            >
              Concussion Check
            </Text>

            <ImageBackground style={styles.imageBackground}
                source = {require('../../assets/b2.png')}>
              <View style={[styles.containerButton, styles.shadowProp]}>
                <TouchableOpacity
                  onPress={createAlert}
                  style={styles.startCheckButton}
                >
                  <Text style={styles.buttonLabel}>Begin Check</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Continue Tests', {screen: 'All Reports'}) }
                  style={[styles.viewHistoryButton, styles.shadowProp]}
                >
                  <Text style={styles.buttonLabel}>View Reports</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
