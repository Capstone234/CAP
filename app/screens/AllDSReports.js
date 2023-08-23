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
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
  AccountContext,
  AccountRepoContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import uiStyle from '../components/uiStyle';


function AllDSReports({ navigation }){
  
  const preliminaryReportRepoContext = useContext(PreliminaryReportRepoContext);
  const [, setPatient] = useContext(PatientContext);
  const [account] = useContext(AccountContext);
  //const [reportId] = useContext(ReportIdContext);
  const mounted = useRef(false);
  const [reportResults, setReportResults] = useState([]);
 

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
  //console.log(account.account_id);
//   const reports = incidentRepoContext.getPrelimReports(account.account_id);
    let reports = [];
  preliminaryReportRepoContext.getDSLFromPatient(account.account_id).then((values) => {
    //console.log(values);
    // if(reportResults != null){
      setReportResults(values);
    //}
    
    // console.log(reports.length);

    });
    //console.log(reportResults);
    if (reportResults.length > 0) {
      let j = 1;
      let z=0;
      for (let i = 0; i < reportResults.length; i++) {
          //console.log(reportResults[i]);
          const dateAndTime = reportResults[i].date_of_test.split('T');
          let time;
          if(dateAndTime[1] != null){
            time = dateAndTime[1].slice(0, 5);
          }
        const description = ' '+dateAndTime[0]+' '+time+'\n Headache: '+reportResults[i].headache_result+'/6' + ' \n Nausea: ' + reportResults[i].nausea_result + '/6'+
        ' \n Dizziness: '+ reportResults[i].dizziness_result + '/6'+' \n Vomiting: '+ reportResults[i].vomiting_result +'/6'+' \n Balance Problem: '+
        reportResults[i].balance_problem_result +'/6'+' \n Blurry or Double Vision: '+ reportResults[i].blurry_or_double_vision_result +'/6'
        + ' \n Sensitivity to light: '+ reportResults[i].sensitivity_to_light_result +'/6'+ ' \n Sensitivity to noise: '+ reportResults[i].sensitive_to_noise_result
        +'/6'+ ' \n Pain other than headache: '+ reportResults[i].pain_other_than_headache_result+'/6'+ ' \n Feeling Slowed Down: '+reportResults[i].feeling_slowed_down_result+
        '/6'+' \n Difficulty Concentrating: '+ reportResults[i].difficulty_concentrating_result +'/6'+ ' \n Difficulty Remembering: '+ reportResults[i].difficulty_remembering_result+
        '/6'+' \n Trouble falling asleep: '+ reportResults[i].trouble_fall_asleep_result +'/6'+ ' \n Fatigue or low energy: '+ reportResults[i].fatigue_or_low_energy_result +'/6'+
        ' \n Drowsiness: '+ reportResults[i].drowsiness_result +'/6'+ ' \n Feeling more emotional: '+ reportResults[i].feeling_more_emotional_result +'/6'+'\n Irritability: '+
        reportResults[i].irritability_result +'/6'+ '\n Sadness: '+ reportResults[i].sadness_result +'/6'+' \n Nervousness: '+reportResults[i].nervousness_result +'/6'+
        ' \n';
        //console.log(description);
        usersButtons.push(
          <Text key={z} style={styles.reporttext}>Report {reportResults[i].log_id} {description}</Text>,
        );
        usersButtons.push(
          <TouchableOpacity
        key={j} style={styles.pdfButton}
        onPress={()=> {createPDF(description)}}
      >
        <Text style={uiStyle.buttonLabel}>Generate PDF report</Text>
      </TouchableOpacity>
        
        );
        j+=2;
        z+=2;
        // if(reportResults.length == 1){
        //   reportResults.pop();
        // }
        // reportResults.slice(i+1, reportResults.length);
        //console.log(usersButtons[i]);
      }
    }
      else{
        
        usersButtons.push(
          <Text key={1} style={uiStyle.buttonLabel}>No such reports.</Text>
        );
      }
      
      
//     console.log('done');
//console.log(usersButtons);
return(
  <SafeAreaView style={uiStyle.container}>
  <View style = {styles.titlecontainer}>
  <Text style={styles.text}>
    All Daily Symptom Reports for {account.first_name}
  </Text>
  </View>
  <View style={styles.reportContainer} >
    <ScrollView>
      {usersButtons}
    </ScrollView>
  </View>
  
  <TouchableOpacity
    style={[styles.bottomButton, uiStyle.shadowProp]}
    onPress={() => navigation.navigate('Home')}
  >
    
    <Text style={uiStyle.buttonLabel}>Return to Home</Text>
  </TouchableOpacity>
  </SafeAreaView>

);

    
}

const styles = StyleSheet.create({
  inputAreaContainer: {
    flex: 1,
    alignItems: 'center',
    
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#D3D3D3',
  },
  text: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/18,
    fontWeight: '800',
    textAlign: 'center',
    textAlignVertical: 'center',
   
  },
  reporttext: {
    color: '#003A67',
    fontSize: Dimensions.get('window').width/20,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: (Dimensions.get('window').height)/40,
  },
  bottomButton: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: (Dimensions.get('window').height)/30,
    marginBottom: (Dimensions.get('window').height)/20,
  },
  titlecontainer: {
    alignItems: 'center',
    backgroundColor: '#9AD3FF',
    marginBottom: (Dimensions.get('window').height)/300,
    marginTop: (Dimensions.get('window').height)/20,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  pdfButton: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#C1E4FF',
    marginTop: (Dimensions.get('window').height)/500,
  },
  reportContainer: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get('window').width/1.2,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: (Dimensions.get('window').height)/50,
  },
});


export default AllDSReports;



