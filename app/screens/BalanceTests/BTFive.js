import * as React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Image,
} from "react-native";

import uiStyle from "../../components/uiStyle";
import { useContext, useState } from "react";
import {
  dataContext2,
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from "../../components/GlobalContextProvider";

function BTFive({ navigation }) {
  // Context variables
  const [patient, setPatient] = useContext(PatientContext);
  const [reportId, setReportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);

  const handleCreateMultiResponse = (answers) => {
    const desc = "BalanceTest-response: first SD, second VAR, one leg up";
    incidentRepoContext.setMultiResponse(reportId, desc, answers).then(
      () => {
        incidentRepoContext
          .getMultiResponses(reportId)
          .then((mrs) => console.log(mrs));
      },
      (err) => console.log(err)
    );
  };
  const [data2, setData2] = useContext(dataContext2);
  var variation = Math.round(Math.pow(data2, 2) * 1000) / 1000;
  var deviation = Math.round(data2 * 1000) / 1000;

  const checkResult = (deviation, variation) => {
    var result = "FAIL";
    var imgLink = require("../../../assets/unchecked_box.png");

    if (deviation < 0.2 && variation < 0.05) {
      result = "PASS";
      imgLink = require("../../../assets/checked_box.png");
    }

    return (
      <SafeAreaView style={uiStyle.container}>
        <Text style={styles.resultText}>
          {"\n"}
          <Image style={styles.resultImg} source={imgLink}></Image>
          {"\t\t"}
          {result}
        </Text>
        <SafeAreaView style={styles.rowContainer}>
          <Text style={[uiStyle.stackedText, styles.centerValueText]}>
            Deviation
            {"\n"}
            {deviation}
          </Text>
          <Text style={[uiStyle.stackedText, styles.centerValueText]}>
            Variation
            {"\n"}
            {variation}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={uiStyle.container}>
      <ScrollView>
        <SafeAreaView style={uiStyle.container}>
          <Text style={uiStyle.titleText}>Stability Grade</Text>
          {checkResult(deviation, variation)}
        </SafeAreaView>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Memory Test 5");
          handleCreateMultiResponse([deviation, variation]);

        }}
        style={uiStyle.bottomButton}
      >
        <Text style={uiStyle.buttonLabel}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.homeButton}
      >
        <Text style={uiStyle.buttonLabel}>Return Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const title = "#000000";
const text = "#fff";
const background = "#fff";
const buttons = "#ff3333";
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: background,
    justifyContent: "center",
  },
  startCheckButton: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: buttons,
  },
  startCheckText: {
    color: text,
    fontWeight: "bold",
    fontSize: 20,
  },
  titleText: {
    color: title,
    fontSize: 30,
    position: "absolute",
    top: 60,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 24,
  },
  resultImg: {
    resizeMode: "contain",
    height: 24,
    width: 24,
  },
  rowContainer: {
    flexDirection: "row",
  },
  centerValueText: {
    textAlign: "center",
  },
  homeButton: {
    // consistent with "View History" button on Home screen, i.e long red button on bottom
    width: 300,
    height: 50,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default BTFive;
