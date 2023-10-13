import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView
} from 'react-native';
import { useContext, useState, useEffect } from 'react';
//import styles from '../styles/DisclaimerStyle';
import { Ionicons } from '@expo/vector-icons';
import uiStyle from '../styles/uiStyle';

import {
  //Import the code we need. eg this now uses MedicalReportRepoContext
  //so we got to import that for the DB functionality.
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext
} from '../components/GlobalContextProvider';

function TestsListScreen({ navigation, route }) {

  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const [user, setUser] = useContext(UserContext);


  console.log("User Id " + user.uid);
  console.log("Incident Id " + incidentId);
//  console.log(incidentReportRepoContext.getAllDailySymtoms(user.uid, incidentId));
  const fetchFinishedUpTo = async () => {
    try {
      const result = await incidentReportRepoContext.getFinishedUpto(user.uid, incidentId);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const tests = [
    {
      order: 1,
      title: "Red Flag Checklist",
      link: "Red flags checklist",
    },
    {
      order: 2,
      title: "Verbal Test",
      link: "Verbal Test 0",
    },
    {
      order: 3,
      title: "PCSS",
      link: "PCSS Checklist",
    },
    {
      order: 4,
      title: "Memory Test 1",
      link: "Memory Test 1"
    },
    {
      order: 5,
      title: "Balance Test 1",
      link: "Balance Test 1"
    },
    {
      order: 6,
      title: "Balance Test 2",
      link: "Balance Test 4"
    },
    {
      order: 7,
      title: "VOMS Test",
      link: ""
    },
    {
      order: 8,
      title: "Hop Test",
      link: "Hop Test 1"
    },
    {
      order: 9,
      title: "Memory Test 2",
      link: "Memory Test 5 Intro"
    },
  ];

  const handleText1Click = () => {
    // Handle click for Text 1
    fetchFinishedUpTo()
    console.log('Fetch finished up to');
  };

  const handleText2Click = () => {
    // Handle click for Text 2
    console.log('Text 2 clicked');
  };

  return (


    <SafeAreaView style={uiStyle.container}>
        <TouchableOpacity onPress={handleText1Click}>
          <Text>fetchFinishedUpTo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleText2Click}>
          <Text>Text 2</Text>
        </TouchableOpacity>
    </SafeAreaView>
//      <Text>List of Available Tests:</Text>
//      {tests.map((test, index) => (
//        <TouchableOpacity
//          key={index}
//          onPress={() => {
//            // Navigate to the selected test screen when a test is clicked
//            navigation.navigate(test.screen);
//          }}
//        >
//          <Text>{test.title}</Text>
//        </TouchableOpacity>
//      ))}



  );
}

export default TestsListScreen;

{/* <View style={styles.screen}>
     <View style={styles.container}>
         <View style={styles.containerText}>
            <Text style={styles.titleText}>Lists of Tests:</Text> 
            <View style={[ styles.shadowProp]}>

              {/* <TouchableOpacity onPress={createAlert} style={styles.startCheckButton}>
                <Text style={styles.buttonLabel}>Begin Check</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Continue Tests', {screen: 'All Reports'}) } style={[styles.viewHistoryButton, styles.shadowProp]}>
                <Text style={styles.buttonLabel}>View Reports</Text>
              </TouchableOpacity> */}

    //             {tests.map((test, index) => (
    //                 <TouchableOpacity style={styles.startCheckButton}
    //                 key={index}
    //                 onPress={() => {
    //                     // Navigate to the selected test screen when a test is clicked
    //                     // navigation.navigate(test.screen);
    //                     console.log("Try");
    //                     navigation.navigate('Red flags checklist');
    //                     console.log("Try 1");

                        
    //                 }}
    //                 >
    //                 <Text style={styles.buttonLabel}>{test.title}</Text>
    //                 </TouchableOpacity>
    //             ))}

    //           </View>       
    //       </View>
    //     </View>
    // </View> */}