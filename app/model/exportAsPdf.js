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
const exportMapAsPdf = async (filename, results, fullname) => {
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
  const pdfFilename = `${filename}.pdf`; // Specify the desired PDF filename
  const filePath = `${FileSystem.cacheDirectory}${pdfFilename}`;


  const tableWidth = '50%';

  let totalContents = '';

  // Add "Basic Test Report" before the loop
  totalContents += '<html><body style="text-align: center;"><b> '+ filename +' for ' + fullname + '</b><br><br><br>';

  // Iterate over the results array and add a new table for each object
  results.forEach((item, index) => {
    if (index > 0) {
      totalContents += '<div style="page-break-before: always; margin-top: 20px;"></div>';
    }

    let table = `
    <table border="1" style="width: ${tableWidth}; margin: 0 auto; text-align: center;">
      <thead>
        <tr>
          <th>Fields</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody>
    `;

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

    table += `
      </tbody>
    </table>
    `;

    // Add the current table to the totalContents
    totalContents += table;

    // Add three line breaks between tables (excluding the last one)
    if (index < results.length - 1) {
      totalContents += '<br><br><br>';
    }
  });

  // Close the body and html tags after the loop
  totalContents += '</body></html>';


  const file = await printToFileAsync({
    html: totalContents,
    base64: false,
    uri: filePath, // Specify the full file path with desired filename
  });

  // Share the generated PDF file
  await Sharing.shareAsync(file.uri, { mimeType: 'application/pdf', dialogTitle: pdfFilename });
};

export { exportMapAsPdf };