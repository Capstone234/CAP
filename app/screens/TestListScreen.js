// import * as React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import styles from '../styles/DisclaimerStyle';
// // import styles from '../styles/HomeScreenStyle';


// function TestsListScreen({ navigation, route }) {
//   const { tests } = route.params;

//   return (
//     <View >
//       <Text>List of Available Tests:</Text>
//       {tests.map((test, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => {
//             // Navigate to the selected test screen when a test is clicked
//             navigation.navigate(test.screen);
//           }}
//         >
//           <Text>{test.title}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>


// {/* <View style={styles.screen}>
//      <View style={styles.container}>
//          <View style={styles.containerText}>
//             <Text style={styles.titleText}>Lists of Tests:</Text> 
//             <View style={[ styles.shadowProp]}>

//               {/* <TouchableOpacity onPress={createAlert} style={styles.startCheckButton}>
//                 <Text style={styles.buttonLabel}>Begin Check</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Continue Tests', {screen: 'All Reports'}) } style={[styles.viewHistoryButton, styles.shadowProp]}>
//                 <Text style={styles.buttonLabel}>View Reports</Text>
//               </TouchableOpacity> */}

//     //             {tests.map((test, index) => (
//     //                 <TouchableOpacity style={styles.startCheckButton}
//     //                 key={index}
//     //                 onPress={() => {
//     //                     // Navigate to the selected test screen when a test is clicked
//     //                     // navigation.navigate(test.screen);
//     //                     console.log("Try");
//     //                     navigation.navigate('Red flags checklist');
//     //                     console.log("Try 1");

                        
//     //                 }}
//     //                 >
//     //                 <Text style={styles.buttonLabel}>{test.title}</Text>
//     //                 </TouchableOpacity>
//     //             ))}

//     //           </View>       
//     //       </View>
//     //     </View>
//     // </View> */}
//   );
// }

// export default TestsListScreen;
