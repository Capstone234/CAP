import * as React from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import {
  PatientContext,
  AccountContext,
  PreliminaryReportRepoContext,
} from '../components/GlobalContextProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import { exportMapAsPdf } from '../model/exportAsPdf';
import uiStyle from '../styles/uiStyle';
import styles from '../styles/AllPrelimReportScreenStyle';


function AllPrelimReports({ navigation }){
  
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
  var dict = {0:'FAIL', 1:'PASS'};
  //console.log(account.account_id);
//   const reports = incidentRepoContext.getPrelimReports(account.account_id);
    let reports = [];
  preliminaryReportRepoContext.getListofPatientReports(account.account_id).then((values) => {
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
          
        const description = ' '+dateAndTime[0]+' '+time+'\n Memory Test 1: '+dict[reportResults[i].memory_test1_result] + ' \n Memory Test 2: ' + dict[reportResults[i].memory_test2_result] +
        ' \n Reaction Test: '+ dict[reportResults[i].reaction_test_result] + ' \n Balance Test 1: '+ dict[reportResults[i].balance_test1_result] +' \n Balance Test 2: '+
        dict[reportResults[i].balance_test2_result] + ' \n Hop Test: '+ dict[reportResults[i].hop_test_result] + ' \n';
        //console.log(description);
        usersButtons.push(
          <Text key={z} style={styles.reporttext}>Report {reportResults[i].report_id} {description}</Text>,
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
    All Preliminary Reports for {account.first_name}
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


export default AllPrelimReports;




















