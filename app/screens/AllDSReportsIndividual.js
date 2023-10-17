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
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  UserContext,
  UserRepoContext,
  IncidentIdContext
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIndividualReportScreenStyle';




function AllDSReportsIndividual({ route, navigation }) {

  const incidentReportRepoContext = useContext(IncidentReportRepoContext);
  const { incidentId, updateIncidentId } = useContext(IncidentIdContext);
  const [user, setUser] = useContext(UserContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const key = route.params;

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
  let reports = [];
  incidentReportRepoContext.getAllDailySymtoms(user.uid).then((values) => {
    //console.log(values);
    // if(reportResults != null){
    // console.log(user.uid);
    setReportResults(values);
    //}
  });

  let formId = Object.values(key)[0]
  // console.log(user.uid);

  // console.log(reportResults);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {

    const dateAndTime = reportResults[formId].dateTime;
    // let time;
    // if (dateAndTime[1] != null) {
    //   time = '' + dateAndTime[1].slice(0, 5);
    // }
    // const date = '' + dateAndTime[0];

    // ---------- Report details ---------- 
    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportResults[formId].sid} </Text>,
      <Text key={2} style={styles.datetext}>Completed {dateAndTime} </Text>,
      <Text key={3} style={styles.scoretext}>Daily Symptom Score: {reportResults[formId].symptomsPass} /132</Text>
    );

    usersButtons.push(
      <Text key={4} style={styles.reporttext}>Headache:  {reportResults[formId].headache}</Text>,
      <Text key={5} style={styles.reporttext}>Nausea:  {reportResults[formId].nausea}</Text>,
      <Text key={6} style={styles.reporttext}>Vomiting:  {reportResults[formId].vomiting}</Text>,
      <Text key={7} style={styles.reporttext}>Balance Problem:  {reportResults[formId].balance}</Text>,
      <Text key={8} style={styles.reporttext}>Dizziness:  {reportResults[formId].dizziness}</Text>,
      <Text key={9} style={styles.reporttext}>Fatigue/Low energy:  {reportResults[formId].fatigue}</Text>,
      <Text key={10} style={styles.reporttext}>Sensitivity to light:  {reportResults[formId].light}</Text>,
      <Text key={11} style={styles.reporttext}>Sensitivity to noise:  {reportResults[formId].noise}</Text>,
      <Text key={12} style={styles.reporttext}>Numbness/Tingling:  {reportResults[formId].numb}</Text>,
      <Text key={13} style={styles.reporttext}>Feeling mentally foggy:  {reportResults[formId].foggy}</Text>,
      <Text key={14} style={styles.reporttext}>Feeling slowed down:  {reportResults[formId].slowed}</Text>,
      <Text key={15} style={styles.reporttext}>Difficulty concentrating:  {reportResults[formId].concentrating}</Text>,
      <Text key={16} style={styles.reporttext}>Difficulty remembering:  {reportResults[formId].remembering}</Text>,
      <Text key={17} style={styles.reporttext}>Drowsiness:  {reportResults[formId].drowsiness}</Text>,
      <Text key={18} style={styles.reporttext}>Sleeping less than usual:  {reportResults[formId].sleep_less}</Text>,
      <Text key={19} style={styles.reporttext}>Sleeping more than usual:  {reportResults[formId].sleep_more}</Text>,
      <Text key={20} style={styles.reporttext}>Trouble falling asleep:  {reportResults[formId].sleeping}</Text>,
      <Text key={21} style={styles.reporttext}>Irritability:  {reportResults[formId].irritability}</Text>,
      <Text key={22} style={styles.reporttext}>Sadness:  {reportResults[formId].sadness}</Text>,
      <Text key={23} style={styles.reporttext}>Nervousness:  {reportResults[formId].nervousness}</Text>,
      <Text key={24} style={styles.reporttext}>Feeling more emotional:  {reportResults[formId].emotional}</Text>,
      <Text key={25} style={styles.reporttext}>Blurry/Double vision:  {reportResults[formId].blurry}</Text>,
    );
  }

  else {
    usersButtons.push(
      <Text key={0} style={uiStyle.buttonLabel}>Sorry, there is something wrong.</Text>
    );
  }

  const createPDF = async (id, results) => {
    // console.log( id, results, reportResults);
    exportMapAsPdf(id, reportResults);
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
          onPress={() => { createCSV(' ') }}>
          <Text style={styles.subtext}>Generate CSV report</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createPDF(' ') }}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.pdfButton} onPress={() => createPDF(user.uid)}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}


export default AllDSReportsIndividual;



