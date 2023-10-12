import * as React from 'react';
import {
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView
} from 'react-native';
import styles from '../styles/DisclaimerStyle';
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


//  const { tests } = route.params;
  const handleText1Click = () => {
    // Handle click for Text 1
    console.log('Text 1 clicked');
  };

  const handleText2Click = () => {
    // Handle click for Text 2
    console.log('Text 2 clicked');
  };

  return (
    console.log(incidentId);
    console.log(incidentReportRepoContext);

    <View>
        <TouchableOpacity onPress={handleText1Click}>
          <Text>Text 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleText2Click}>
          <Text>Text 2</Text>
        </TouchableOpacity>
    </View>
//    <View >
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
//    </View>

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