import * as React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  View,
  ImageBackground,
  LogBox
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext
} from '../components/GlobalContextProvider';
import StringUtils from '../model/database/StringUtils';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIndividualReportScreenStyle';
import { parseISO, isSameMonth } from 'date-fns';

function AllDSReportsIndividual({ route, navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [user, setUser] = useContext(UserContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const { key, date } = route.params;

  // const [showPDF, setShowPDF] = useState(false);

  // const createPDF = async (results) => {
  //   try {
  //     // Define the HTML content for the PDF (customize this part).
  //     const dateAndTime = reportResults[formId].dateTime;
  //     const htmlContent = `
  //       <html>
  //         <body>
  //           <h1>Report #${reportResults[formId].sid}</h1>
  //           <p>Completed ${dateAndTime}</p>
  //           <p>Daily Symptom Score: ${reportResults[formId].symptomsPass} / 132</p>
  //           <!-- Include more report data as needed -->
  //         </body>
  //       </html>
  //     `;

  //     // Define options for the PDF
  //     const options = {
  //       html: htmlContent,
  //       fileName: 'Report.pdf',
  //       directory: 'Documents',
  //     };

  //     const pdfFile = await RNHTMLtoPDF.convert(options);
  //     console.log('PDF generated: ' + pdfFile.filePath);

  //     // Set the PDF path and show the PDF component
  //     setPdfPath('file://' + pdfFile.filePath);
  //     setShowPDF(true);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // };



  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);


  let usersButtons = [];
  //   const reports = incidentRepoContext.getPrelimReports(account.account_id);
  incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
    setReportResults(values);
  });

  const filteredList = reportResults.filter(col => {
    const colDate = parseISO(col.dateTime);
    return isSameMonth(colDate, date);
  });

  // console.log(reportResults);
  // console.log(filteredList);
  // console.log(date);
  // console.log(key);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  // ---------- List of reports ----------
  if (filteredList.length > 0) {
    const dateAndTime = filteredList[key].dateTime;
    let reportID = filteredList[key].sid;

    if (filteredList[key].sid == null) {
      reportID = 0; // i.e., do not have an ongoing incident
    }

    // ---------- Report details ---------- 
    let patient_fname
    let patient_lname
    let associate_incident = incidentReportRepoContext.getIncidentPatient(user.uid, filteredList[i].iid);
    if (associate_incident == null || associate_incident == undefined) {
      patient_fname = user.fname
      patient_lname = user.sname
    } else {
      patient_fname = StringUtils.split(associate_incident)[0]
      patient_lname = StringUtils.split(associate_incident)[1]
    }
    
    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportID} </Text>,
      <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>,
      <Text key={3} style={styles.datetext}>Patient: {patient_fname} {patient_lname} </Text>,
      <Text key={4} style={styles.scoretext}>Daily Symptom Score: {filteredList[key].symptomsPass} /132</Text>
    );

    usersButtons.push(
      <Text key={5} style={styles.reporttext}>Headache:  {filteredList[key].headache}</Text>,
      <Text key={6} style={styles.reporttext}>Nausea:  {filteredList[key].nausea}</Text>,
      <Text key={7} style={styles.reporttext}>Vomiting:  {filteredList[key].vomiting}</Text>,
      <Text key={8} style={styles.reporttext}>Balance Problem:  {filteredList[key].balance}</Text>,
      <Text key={9} style={styles.reporttext}>Dizziness:  {filteredList[key].dizziness}</Text>,
      <Text key={10} style={styles.reporttext}>Fatigue/Low energy:  {filteredList[key].fatigue}</Text>,
      <Text key={11} style={styles.reporttext}>Sensitivity to light:  {filteredList[key].light}</Text>,
      <Text key={12} style={styles.reporttext}>Sensitivity to noise:  {filteredList[key].noise}</Text>,
      <Text key={13} style={styles.reporttext}>Numbness/Tingling:  {filteredList[key].numb}</Text>,
      <Text key={14} style={styles.reporttext}>Feeling mentally foggy:  {filteredList[key].foggy}</Text>,
      <Text key={15} style={styles.reporttext}>Feeling slowed down:  {filteredList[key].slowed}</Text>,
      <Text key={16} style={styles.reporttext}>Difficulty concentrating:  {filteredList[key].concentrating}</Text>,
      <Text key={17} style={styles.reporttext}>Difficulty remembering:  {filteredList[key].remembering}</Text>,
      <Text key={18} style={styles.reporttext}>Drowsiness:  {filteredList[key].drowsiness}</Text>,
      <Text key={19} style={styles.reporttext}>Sleeping less than usual:  {filteredList[key].sleep_less}</Text>,
      <Text key={20} style={styles.reporttext}>Sleeping more than usual:  {filteredList[key].sleep_more}</Text>,
      <Text key={21} style={styles.reporttext}>Trouble falling asleep:  {filteredList[key].sleeping}</Text>,
      <Text key={22} style={styles.reporttext}>Irritability:  {filteredList[key].irritability}</Text>,
      <Text key={23} style={styles.reporttext}>Sadness:  {filteredList[key].sadness}</Text>,
      <Text key={24} style={styles.reporttext}>Nervousness:  {filteredList[key].nervousness}</Text>,
      <Text key={25} style={styles.reporttext}>Feeling more emotional:  {filteredList[key].emotional}</Text>,
      <Text key={26} style={styles.reporttext}>Blurry/Double vision:  {filteredList[key].blurry}</Text>,
    );
  }

  else {
    usersButtons.push(
      <Text key={0} style={uiStyle.buttonLabel}>Sorry, there is something wrong.</Text>
    );
  }

  const createPDF = async (results) => {

    const resultIndiv = []; // Initialize an empty array
    // Push the object into the array
    resultIndiv.push(results[key]);
    console.log(resultIndiv);
    exportMapAsPdf("DS Report", resultIndiv);
  }

  const createCSV = async (results) => {
    const resultIndiv = []; // Initialize an empty array
    // Push the object into the array
    console.log(resultIndiv);
    resultIndiv.push(results[key]);

    exportMapAsCsv("DS Report", resultIndiv);
  }

  return (
    <SafeAreaView style={uiStyle.container}>
      <View style={styles.titlecontainer}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => { navigation.navigate('DS Report') }}>
          <Text style={styles.backBtnText}>&lt; Back to Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formcontainer} >
        <ScrollView>
          {usersButtons}
        </ScrollView>
      </View>

      <View style={styles.footercontainer}>
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createCSV(filteredList) }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton} onPress={() => createPDF(filteredList)}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}


export default AllDSReportsIndividual;



