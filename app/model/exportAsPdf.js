import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { printToFileAsync } from 'expo-print';
/**
 *
 * @param fileName local file to write map contents to
 * @param mapping mapping of column headings to values
 * @param vomsMapping
 * @param shareDialog dialog is share prompt on Android
 * @return {Promise<void>}
 */
const exportMapAsPdf = async (
  basic_tests
) => {
  if (!(await Sharing.isAvailableAsync())) {
    // eslint-disable-next-line no-alert
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  // Write csv file using object
//   const filePath = `${FileSystem.cacheDirectory}/${fileName}.txt`;

  let attributes = '';
  let values = '';
  let first = true;
  // console.log('Tests',medical_tests);
  let totalContents = '';
  totalContents = totalContents.concat('<html>','<body>','<b>Basic Test Report</b>', '<br><br><br>');
  // console.log(totalContents);
  let basic_test_content = '';

  Object.entries(basic_tests).forEach(([key, value]) => {
    let sep = ': ';
    let end = '<br><br>';
    var dict = {0:'FAIL', 1:'PASS'};

    if (key != 'report_id'){
        switch(key){
            case 'memory_test1_result':
                basic_test_content = basic_test_content.concat('Memory Test 1 Result',sep,dict[value],end); 
              break
            case 'memory_test2_result':
                basic_test_content = basic_test_content.concat('Memory Test 2 Result',sep,dict[value],end); 
      
              break
            case 'reaction_test_result':
                basic_test_content = basic_test_content.concat('Reaction Test Result',sep,dict[value],end); 
      
              break
            case 'balance_test1_result':
                basic_test_content = basic_test_content.concat('Balance Test 1 Result',sep,dict[value],end); 
              break
            case 'balance_test2_result':
                basic_test_content = basic_test_content.concat('Balance Test 2 Result',sep,dict[value],end); 
              break
            case 'hop_test_result':
                basic_test_content = basic_test_content.concat('Hop Test Result',sep,dict[value],end); 
          }
    }
    
  });

  totalContents = totalContents.concat(basic_test_content);
  totalContents = totalContents.concat('</body>','</html>');


  console.log(totalContents)


  const file = await printToFileAsync({
    html: totalContents,
    base64: false

  });


  // Share file
  await Sharing.shareAsync(file.uri);
  // console.log(filePath);
  // return filePath;
};

export { exportMapAsPdf };
