import * as React from 'react';

import { useContext, useState } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import {
  IncidentReportRepoContext,
  PatientContext,
  PatientRepoContext,
  ReportIdContext,
} from '../components/GlobalContextProvider';

/**
 * Temporary screen to show/test database functionality.
 */
export default function SampleDatabaseScreen() {
  // Context variables
  const [patient, setPatient] = useContext(PatientContext);
  const [reportId, setReportId] = useContext(ReportIdContext);
  const patientRepoContext = useContext(PatientRepoContext);
  const incidentRepoContext = useContext(IncidentReportRepoContext);

  // Local state
  const [responses, setResponses] = useState(null);
  const [patients, setPatients] = useState(null);

  // TODO: remove
  const onCreateVOMSResponse = () => {
    const desc = 'Initial';
    incidentRepoContext.addVOMSSymptoms(reportId, desc, 5, 5, 5, 5).then(() => {
      incidentRepoContext
        .getVOMSSymptoms(reportId, desc)
        .then((sr) => setResponses(JSON.stringify(sr)));
    });
  };

  // TODO: remove
  const onCreatePatient = () => {
    if (patientRepoContext !== null) {
      const fname = Math.random().toString();

      patientRepoContext.createPatient(fname, 'Smith', 15, 40).then(
        (patientId) => {
          patientRepoContext.getPatient(patientId).then((patientRet) => {
            setPatient(patientRet);
          });
        },
        (err) => console.log('Error: ' + err),
      );
    } else {
      console.log('null patientRepo');
    }
  };

  // TODO: remove
  const handleCreateReport = () => {
    incidentRepoContext
      .createReport(patient.patient_id)
      .then((id) => setReportId(id));
  };

  // TODO: remove
  const handleCreateReportWithNullPatient = () => {
    incidentRepoContext.createReport(null).then((id) => setReportId(id));
  };

  // TODO: remove
  const handleUpdateReport = () => {
    console.log(patient.patient_id);
    console.log(reportId);
    incidentRepoContext.updateReport(patient.patient_id, reportId).then(
      (rowsAffected) => console.log(rowsAffected),
      (err) => console.log(err),
    );
  };

  // TODO: remove
  const onGetPatients = () => {
    if (patientRepoContext !== null) {
      patientRepoContext
        .getAllPatients()
        .then((pts) => setPatients(JSON.stringify(pts)));
    } else {
      console.log('null patientRepo');
    }
  };

  // TODO: remove
  const handleCreateSResponse = () => {
    const desc = 'test-response';
    const res = Math.random().toString();
    incidentRepoContext.setSingleResponse(reportId, desc, res).then(() => {
      incidentRepoContext
        .getSingleResponses(reportId)
        .then((sr) => setResponses(JSON.stringify(sr)));
    });
  };

  // TODO: remove
  const handleCreateMultiResponse = () => {
    const desc = 'test-multi-response';
    incidentRepoContext
      .setMultiResponse(reportId, desc, [
        Math.random().toString(),
        Math.random().toString(),
        Math.random().toString(),
      ])
      .then(
        () => {
          incidentRepoContext
            .getMultiResponses(reportId)
            .then((mrs) => setResponses(JSON.stringify(mrs)));
        },
        (err) => console.log(err),
      );
  };

  return (
    <SafeAreaView>
      <Button title="Create Patient" onPress={onCreatePatient} />

      <Text>
        {patient.first_name +
          ' ' +
          patient.last_name +
          patient.age +
          ' years old ' +
          patient.weight +
          ' kg'}
      </Text>

      <Button title="Get Patients" onPress={onGetPatients} />
      <Text>{patients}</Text>

      <Button
        title="Create Report With Null Patient"
        onPress={handleCreateReportWithNullPatient}
      />
      <Text>{reportId}</Text>

      <Button title="Update Report with Patient" onPress={handleUpdateReport} />

      <Button title="Create Report" onPress={handleCreateReport} />

      <Text>{reportId}</Text>

      <Button title="Create Single response" onPress={handleCreateSResponse} />

      <Button
        title="Create Multi response"
        onPress={handleCreateMultiResponse}
      />

      <Button title="Create voms response" onPress={onCreateVOMSResponse} />

      <Text>{responses}</Text>
    </SafeAreaView>
  );
}
