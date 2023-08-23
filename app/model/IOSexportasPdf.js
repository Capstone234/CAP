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
const IOSexportMapAsPdf = async (
  medical_tests
) => {
  if (!(await Sharing.isAvailableAsync())) {
    // eslint-disable-next-line no-alert
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  // Write csv file using object
//   const filePath = `${FileSystem.cacheDirectory}/${fileName}.txt`;

  // console.log('Tests',medical_tests);
  let totalContents = '';
  totalContents = totalContents.concat('<html>','<body>','<b>Medical Test Report</b>', '<br><br><br>');
  // console.log(totalContents);
  let medical_test_content = '';

 

  Object.entries(medical_tests).forEach(([key, value]) => {
    let sep = ',';
    let end = '<br><br>';
    if (key != 'report_id'){
      medical_test_content = medical_test_content.concat(key,sep,value,end); 
    }
    
  });

  totalContents = totalContents.concat(medical_test_content);
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

export { IOSexportMapAsPdf };
