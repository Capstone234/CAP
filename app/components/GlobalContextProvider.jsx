import React from 'react';
import { useEffect, useState } from 'react';
import { Patient } from '../model/database/Patient';
import { DatabaseAdapter } from '../model/database/DatabaseAdapter';
import { PatientRepo } from '../model/database/PatientRepo';
import { IncidentReportRepo } from '../model/database/IncidentReportRepo';
import * as SQLite from 'expo-sqlite';

const DB_FILE = 'measurements.db';

// Contexts
/**
 *
 * @type {React.Context<[Patient, (newPatient: Patient) => void]>}
 */
export const PatientContext = React.createContext(null);

/**
 *
 * @type {React.Context<[number, (newPatient: number) => void]>}
 */
export const ReportIdContext = React.createContext(null);

/**
 *
 * @type {React.Context<PatientRepo>}
 */
export const PatientRepoContext = React.createContext(null);

/**
 *
 * @type {React.Context<IncidentReportRepo>}
 */
export const IncidentReportRepoContext = React.createContext(null);

/**
 *
 * @type {React.Context<DatabaseAdapter>}
 */
export const DaContext = React.createContext(null);

export const dataContext = React.createContext(0);

export const DaContext2 = React.createContext(null);

export const dataContext2 = React.createContext(0);

/**
 * Provider component
 */
export function GlobalContextProvider(props) {
  //Global x,y,z
  const [data, setData] = useState(0);

  // Global patient
  const [patient, setPatient] = useState(new Patient(null, 'John', null));

  // Global report id
  const [reportId, setReportId] = useState(null);

  // Global Repositories
  const [patientRepoContext, setPatientRepoContext] = useState(null);
  const [daContext, setDaContext] = useState(null);
  const [incidentRepoContext, setIncidentRepoContext] = useState(null);

  useEffect(() => {
    DatabaseAdapter.initDatabase(SQLite.openDatabase(DB_FILE)).then((daNew) => {
      setDaContext(daNew);
      setPatientRepoContext(new PatientRepo(daNew));
      setIncidentRepoContext(new IncidentReportRepo(daNew));
    });
  }, []);

  return (
    <ReportIdContext.Provider value={[reportId, setReportId]}>
      <PatientContext.Provider value={[patient, setPatient]}>
        <PatientRepoContext.Provider value={patientRepoContext}>
          <IncidentReportRepoContext.Provider value={incidentRepoContext}>
            <DaContext.Provider value={daContext}>
              <dataContext.Provider value={[data, setData]}>
                {props.children}
              </dataContext.Provider>
            </DaContext.Provider>
          </IncidentReportRepoContext.Provider>
        </PatientRepoContext.Provider>
      </PatientContext.Provider>
    </ReportIdContext.Provider>
  );
}
