import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import { Alert } from 'react-native';
/**
 *
 * @param fileName local file to write map contents to
 * @param mapping mapping of column headings to values
 * @param vomsMapping
 * @param shareDialog dialog is share prompt on Android
 * @return {Promise<void>}
 */
const exportMapAsCsv = async (
  fileName,
  medical_tests
) => {
  if (!(await Sharing.isAvailableAsync())) {
    // eslint-disable-next-line no-alert
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  // Write csv file using object
  const filePath = FileSystem.documentDirectory + `${fileName}.csv`;
  let attributes = '';
  let values = '';
  let first = true;
  // console.log('Tests',medical_tests);
  let totalContents = '';
  totalContents = totalContents.concat('test,result', '\n');
  // console.log(totalContents);
  let medical_test_content = '';

  Object.entries(medical_tests).forEach(([key, value]) => {
    let sep = ',';
    let end = '\n';
    if (key != 'report_id'){
      medical_test_content = medical_test_content.concat(key,sep,value,end); 
    }
    
  });

  totalContents = totalContents.concat(medical_test_content);

  await FileSystem.writeAsStringAsync(filePath, totalContents);
  const emailAttachments = [];
  emailAttachments.push(filePath);
  console.log(filePath);
  MailComposer.composeAsync({
    recipients: ["bphslatealerts@gmail.com"],
    subject: "Medical Report for *insert patient name please*",
    attachments: emailAttachments,
    body: "This is the report for *insert patient name please*"
  }).catch(() =>
    Alert.alert("Unable To Send Feedback", undefined, [
      {
        text: "Copy feedback email",
        onPress: () => Clipboard.setString("test@gmail.com")
      },
      {
        text: "OK"
      }
    ])
  );

  // Share file
  // await Sharing.shareAsync(filePath);
  // console.log(filePath);
  // return filePath;
};

export { exportMapAsCsv };
