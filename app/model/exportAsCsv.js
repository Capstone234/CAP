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

const exportMapAsCsv = async (fileName, medical_tests, fullname) => {
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Sharing files isn't available on your platform`);
    return;
  }

  const filePath = FileSystem.documentDirectory + `${fileName}.csv`;
  // console.log( medical_tests);
  if (medical_tests.length === 0) {
    // Handle the case where there are no results to export
    alert('No medical tests data to export as CSV.');
    return;
  }

  // Get the keys from the first object in the array
  const firstTest = medical_tests[0];
  const testAttributes = Object.keys(firstTest);


  // Create the header row for your CSV
  const header = testAttributes.join(',') + '\n';

  // Create an empty string to store the table contents
  let tableContents = header;

  // Iterate over each object in the medical_tests array
  medical_tests.forEach((test, index) => {

    const formattedDate = new Date(test.dateTime).toLocaleDateString(); // Format the date
    const testRow = testAttributes.map(attr => (attr === 'dateTime' ? formattedDate : test[attr])).join(',');
    tableContents += testRow + '\n';
  });

  
  // Write the tableContents to the file
  await FileSystem.writeAsStringAsync(filePath, tableContents);

  const emailAttachments = [filePath];

  MailComposer.composeAsync({
    recipients: ["bphslatealerts@gmail.com"],
    subject: "Medical Report for " + fullname,
    attachments: emailAttachments,
    body: "This is the report for " + fullname
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
  await Sharing.shareAsync(filePath);
};

export { exportMapAsCsv };

