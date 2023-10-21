// import { useContext, useState, useEffect} from 'react';

// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import { printToFileAsync } from 'expo-print';
// import {
//   IncidentReportRepoContext,
//   IncidentIdContext,
//   UserContext,
//   DSLIdContext
// } from '../components/GlobalContextProvider';

// /**
//  *
//  * @param fileName local file to write map contents to
//  * @param mapping mapping of column headings to values
//  * @param vomsMapping
//  * @param shareDialog dialog is share prompt on Android
//  * @return {Promise<void>}
//  */
// const exportMapAsPdf = async (
//   uid, data, results
// ) => {
//   if (!(await Sharing.isAvailableAsync())) {
//     // eslint-disable-next-line no-alert
//     alert(`Sharing files isn't available on your platform`);
//     return;
//   }

//   // Write csv file using object
// //   const filePath = `${FileSystem.cacheDirectory}/${fileName}.txt`;

//   // console.log('From here',data);
//   // console.log('From here',results);

//   // const dataString = JSON.stringify(results);

//   // console.log('From here', dataString);

//   // const table = `
//   //   <table border="1">
//   //     <thead>
//   //       <tr>
//   //         <th>Date Time</th>
//   //         ${Object.keys(dataString[0]).map(key => `<th>${key}</th>`).join('')}
//   //       </tr>
//   //     </thead>
//   //     <tbody>
//   //       ${dataString.map(item => `
//   //         <tr>
//   //           <td>${item.dateTime}</td>
//   //           ${Object.keys(item).map(key => `<td>${item[key]}</td>`).join('')}
//   //         </tr>
//   //       `).join('')}
//   //     </tbody>
//   //   </table>
//   // `;

//   // console.log('From here', table);

//   let dataArray;
//   try {
//     dataArray = JSON.parse(results);
//   } catch (error) {
//     console.error('Error parsing dataString as JSON:', error);
//     return;
//   }

//   // Create an HTML table to display the data dynamically
//   const table = `
//     <table border="1">
//       <thead>
//         <tr>
//           <th>Date Time</th>
//           ${Object.keys(dataArray[0]).map(key => `<th>${key}</th>`).join('')}
//         </tr>
//       </thead>
//       <tbody>
//         ${dataArray.map(item => `
//           <tr>
//             <td>${item.dateTime}</td>
//             ${Object.keys(item).map(key => `<td>${item[key]}</td>`).join('')}
//           </tr>
//         `).join('')}
//       </tbody>
//     </table>
//   `;


//   // const incidentReportRepoContext = useContext(IncidentReportRepoContext);
//   // async function fetchDailySymptom(uid) {
//   //   try {
//   //     const symptomReport = await incidentReportRepoContext.getMostRecentDailySymptoms(uid);
      
//   //     console.log("here");
//   //     console.log(symptomReport);
//   //   } catch (error) {
//   //     console.error('Error fetching symptom report:', error);
//   //   }
//   // }

//   // fetchDailySymptom(basic_tests)

//   let attributes = '';
//   let values = '';
//   let first = true;
//   // console.log('Tests',medical_tests);
//   let totalContents = '';
//   totalContents = totalContents.concat('<html>','<body>','<b>Basic Test Report</b>', '<br><br><br>');
//   // console.log(totalContents);
//   let basic_test_content = totalContents.concat(data);
//   basic_test_content = totalContents.concat(dataArray);


//   // Object.entries(basic_tests).forEach(([key, value]) => {
//   //   let sep = ': ';
//   //   let end = '<br><br>';
//   //   var dict = {0:'FAIL', 1:'PASS'};

//   //   if (key != 'report_id'){
//   //       switch(key){
//   //           case 'memory_test1_result':
//   //               basic_test_content = basic_test_content.concat('Memory Test 1 Result',sep,dict[value],end); 
//   //             break
//   //           case 'memory_test2_result':
//   //               basic_test_content = basic_test_content.concat('Memory Test 2 Result',sep,dict[value],end); 
      
//   //             break
//   //           case 'reaction_test_result':
//   //               basic_test_content = basic_test_content.concat('Reaction Test Result',sep,dict[value],end); 
      
//   //             break
//   //           case 'balance_test1_result':
//   //               basic_test_content = basic_test_content.concat('Balance Test 1 Result',sep,dict[value],end); 
//   //             break
//   //           case 'balance_test2_result':
//   //               basic_test_content = basic_test_content.concat('Balance Test 2 Result',sep,dict[value],end); 
//   //             break
//   //           case 'hop_test_result':
//   //               basic_test_content = basic_test_content.concat('Hop Test Result',sep,dict[value],end); 
//   //         }
//   //   }
    
//   // });

//   totalContents = totalContents.concat(basic_test_content);
//   totalContents = totalContents.concat('</body>','</html>');


//   console.log(totalContents)


//   const file = await printToFileAsync({
//     html: totalContents,
//     base64: false

//   });


//   // Share file
//   await Sharing.shareAsync(file.uri);
//   // console.log(filePath);
//   // return filePath;
// };

// export { exportMapAsPdf };

import { useContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
import {
  IncidentReportRepoContext,
  IncidentIdContext,
  UserContext,
  DSLIdContext
} from '../components/GlobalContextProvider';

/**
 * @param uid User ID
 * @param data Array of objects to display in a table
 * @param results Other content to concatenate
 * @return {Promise<void>}
 */
const exportMapAsPdf = async (filename, results) => {
  if (!(await Sharing.isAvailableAsync())) {
    // eslint-disable-line no-alert
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  console.log(results);
  if (results.length === 0) {
    // Handle the case where there are no results to export
    alert('No results to export as PDF.');
    return;
  }

  let table = `
  <table border="1">
    <thead>
      <tr>
        <th>Type</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
`;

  // Iterate over the results array and add each object's data to the table
  results.forEach(item => {
    const keys = Object.keys(item);
    const filteredKeys = keys.filter(key => key !== 'sid' && key !== 'uid' && key !== 'iid');

    filteredKeys.forEach(key => {
      table += `
        <tr>
          <td>${key}</td>
          <td>${item[key]}</td>
        </tr>
      `;
    });
  });

  table += `
      </tbody>
    </table>
  `;

  let totalContents = '';
  totalContents = totalContents.concat('<html>', '<body>', '<b>Basic Test Report</b>', '<br><br><br>');
  totalContents = totalContents.concat(table);
  totalContents = totalContents.concat('</body>', '</html>');


  const file = await printToFileAsync({
    html: totalContents,
    base64: false,
    uri: filename, // Specify the desired file name here
  });

  // Share file
  await Sharing.shareAsync(file.uri);
};

export { exportMapAsPdf };