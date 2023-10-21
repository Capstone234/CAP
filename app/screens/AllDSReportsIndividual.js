import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  View,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import { exportMapAsCsv } from '../model/exportAsCsv';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllIndividualReportScreenStyle';


function AllDSReportsIndividual({ route, navigation }) {

  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
  const key = route.params;

  useEffect(() => {
    mounted.current = true; // Component is mounted
    return () => {
      // Component is unmounted
      mounted.current = false;
    };
  }, []);

  const createPDF = async (results) => {
    exportMapAsPdf("Basic Report", results);
  }

  let usersButtons = [];
  //   const reports = incidentRepoContext.getPrelimReports(account.account_id);
  let reports = [];
  preliminaryReportRepoContext.getDSLFromPatient(account.account_id).then((values) => {
    //console.log(values);
    // if(reportResults != null){
    setReportResults(values);
    //}
  });

  let formId = Object.values(key)[0]
  // console.log(formId);

  // ---------- List of reports ----------
  if (reportResults.length > 0) {

    const dateAndTime = reportResults[formId].date_of_test.split('T');
    let time;
    if (dateAndTime[1] != null) {
      time = '' + dateAndTime[1].slice(0, 5);
    }
    const date = '' + dateAndTime[0];

    // ---------- Report details ----------
    // TODO: not currently updated due to database revamping
    const headacheResult = reportResults[formId].headache_result
    const nauseaResult = reportResults[formId].nausea_result
    const dizzinessResult = reportResults[formId].dizziness_result
    const vomitingResult = reportResults[formId].vomiting_result
    const balanceResult = reportResults[formId].balance_problem_result
    const visionResult = reportResults[formId].blurry_or_double_vision_result
    const lightResult = reportResults[formId].sensitivity_to_light_result
    const noiseResult = reportResults[formId].sensitive_to_noise_result
    const painResult = reportResults[formId].pain_other_than_headache_result
    const sluggishResult = reportResults[formId].pain_other_than_headache_result
    const concentrateResult = reportResults[formId].difficulty_concentrating_result
    const rememberResult = reportResults[formId].difficulty_remembering_result
    const sleepResult = reportResults[formId].trouble_fall_asleep_result
    const fatigueResult = reportResults[formId].fatigue_or_low_energy_result
    const drowsinessResult = reportResults[formId].drowsiness_result
    const emotionalResult = reportResults[formId].feeling_more_emotional_result
    const irritabilityResult = reportResults[formId].irritability_result
    const sadnessResult = reportResults[formId].sadness_result
    const nervousnessResult = reportResults[formId].nervousness_result
    const finalResult = reportResults[formId].dsl_result

    usersButtons.push(
      <Text key={1} style={styles.headerText}>Report #{reportResults[formId].log_id} </Text>,
      <Text key={2} style={styles.datetext}>Completed {date} {time} </Text>,
      <Text key={3} style={styles.scoretext}>Daily Symptom Score: {reportResults[formId].dsl_result} /132</Text>
    );

    usersButtons.push(
      <Text key={4} style={styles.reporttext}>Headache:  {headacheResult}</Text>,
      <Text key={5} style={styles.reporttext}>Nausea:  {nauseaResult}</Text>,
      <Text key={6} style={styles.reporttext}>Dizziness:  {dizzinessResult}</Text>,
      <Text key={7} style={styles.reporttext}>Vomiting:  {vomitingResult}</Text>,
      <Text key={8} style={styles.reporttext}>Balance Problem:  {balanceResult}</Text>,
      <Text key={9} style={styles.reporttext}>Blurry or Double Vision:  {visionResult}</Text>,
      <Text key={10} style={styles.reporttext}>Sensitivity to light:  {lightResult}</Text>,
      <Text key={11} style={styles.reporttext}>Sensitivity to noise:  {noiseResult}</Text>,
      <Text key={12} style={styles.reporttext}>Pain other than headache:  {painResult}</Text>,
      <Text key={13} style={styles.reporttext}>Feeling Slowed Down:  {sluggishResult}</Text>,
      <Text key={14} style={styles.reporttext}>Difficulty Concentrating:  {concentrateResult}</Text>,
      <Text key={15} style={styles.reporttext}>Difficulty Remembering:  {rememberResult}</Text>,
      <Text key={16} style={styles.reporttext}>Trouble falling asleep:  {sleepResult}</Text>,
      <Text key={17} style={styles.reporttext}>Fatigue or low energy:  {fatigueResult}</Text>,
      <Text key={18} style={styles.reporttext}>Drowsiness:  {drowsinessResult}</Text>,
      <Text key={19} style={styles.reporttext}>Feeling more emotional:  {emotionalResult}</Text>,
      <Text key={20} style={styles.reporttext}>Irritability:  {irritabilityResult}</Text>,
      <Text key={21} style={styles.reporttext}>Sadness:  {sadnessResult}</Text>,
      <Text key={22} style={styles.reporttext}>Nervousness:  {nervousnessResult}</Text>,
    );
  }

  else {
    usersButtons.push(
      <Text key={0} style={uiStyle.buttonLabel}>Sorry, there is something wrong.</Text>
    );
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
        <TouchableOpacity style={styles.pdfButton}
          onPress={() => { createPDF(' ') }}>
          <Text style={styles.subtext}>Generate PDF report</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}


export default AllDSReportsIndividual;



