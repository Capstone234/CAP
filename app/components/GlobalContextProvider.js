import React from 'react';
import { useEffect, useState } from 'react';
import { Patient } from '../model/database/Patient';
import { Account } from '../model/database/Account';
import { DatabaseAdapter } from '../model/database/DatabaseAdapter';
import { PatientRepo } from '../model/database/PatientRepo';
import {AccountRepo} from '../model/database/AccountRepo';
import { IncidentReportRepo } from '../model/database/IncidentReportRepo';
import { PreliminaryReportRepo } from '../model/database/PreliminaryReportRepo';
import { MedicalReportRepo } from '../model/database/MedicalReportRepo';
import * as SQLite from 'expo-sqlite';

const DB_FILE = 'measurements.db';

// Contexts
/**
 *
 * @type {React.Context<[Patient, (newPatient: Patient) => void]>}
 */
export const PatientContext = React.createContext(null);

export const AccountContext = React.createContext(null);

export const AccountRepoContext = React.createContext(null);

/**
 *
 * @type {React.Context<[number, (newPatient: number) => void]>}
 */
export const ReportIdContext = React.createContext(null);

/**
 *
 * @type {React.Context<[number, (newPatient: number) => void]>}
 */
 export const PrelimReportIdContext = React.createContext(null);

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
 * @type {React.Context<PreliminaryReportRepo>}
 */
 export const PreliminaryReportRepoContext = React.createContext(null);

 /**
 *
 * @type {React.Context<PreliminaryReportRepo>}
 */
  export const MedicalReportRepoContext = React.createContext(null);

/**
 *
 * @type {React.Context<DatabaseAdapter>}
 */
export const DaContext = React.createContext(null);

export const dataContext = React.createContext(0);

export const DaContext2 = React.createContext(null);

export const dataContext2 = React.createContext(0);

export const MemoryCorrectAnswerContext = React.createContext([]);

export const AgeHopTestContext = React.createContext(0);

export const DSLIdContext =  React.createContext(0);

/**
 * Provider component
 */
export function GlobalContextProvider(props) {
  //Global x,y,z
  const [data, setData] = useState(0);
  const [data2, setData2] = useState(0);

  // Global patient
  const [patient, setPatient] = useState(new Patient(null, 'John', null));

  const [account, setAccount] = useState(new Account(null, 'John', null, 0, 0, null));

  // Global report id
  const [reportId, setReportId] = useState(null);

  

  //PrelimReport ReportID
  const [prelimReportId, setPrelimReportId] = useState(0);

  // Global Repositories
  const [patientRepoContext, setPatientRepoContext] = useState(null);
  const [accountRepoContext, setAccountRepoContext] = useState(null);
  const [daContext, setDaContext] = useState(null);
  const [daContext2, setDaContext2] = useState(null);
  const [incidentRepoContext, setIncidentRepoContext] = useState(null);
  const [preliminaryReportRepoContext, setPreliminaryReportRepoContext] = useState(null);
  const [medicalReportRepoContext, setMedicalReportRepoContext] = useState(null);
  const [memoryCorrectAnswerContext, setMemoryCorrectAnswerContext] = useState([]);
  const [ageHopTestContext, setAgeHopTestContext] = useState(null);
  const [dslId, setDSLId] = useState(0);
  





  useEffect(() => {
    DatabaseAdapter.initDatabase(SQLite.openDatabase(DB_FILE)).then((daNew) => {
      setDaContext(daNew);
      setPatientRepoContext(new PatientRepo(daNew));
      setAccountRepoContext(new AccountRepo(daNew));
      setIncidentRepoContext(new IncidentReportRepo(daNew));
      setPreliminaryReportRepoContext(new PreliminaryReportRepo(daNew));
      setMedicalReportRepoContext(new MedicalReportRepo(daNew));
    });
  }, []);

  return (

    <PrelimReportIdContext.Provider value={[prelimReportId, setPrelimReportId]}>
      <ReportIdContext.Provider value={[reportId, setReportId]}>
        <PatientContext.Provider value={[patient, setPatient]}>
        <AccountContext.Provider value={[account, setAccount]}>
        <AccountRepoContext.Provider value={accountRepoContext}>
          <PatientRepoContext.Provider value={patientRepoContext}>
            <IncidentReportRepoContext.Provider value={incidentRepoContext}>
              <PreliminaryReportRepoContext.Provider value={preliminaryReportRepoContext}>
                <MedicalReportRepoContext.Provider value={medicalReportRepoContext}>
                  <MemoryCorrectAnswerContext.Provider value={[memoryCorrectAnswerContext, setMemoryCorrectAnswerContext]}>
                    <DaContext.Provider value={daContext}>
                      <DaContext2.Provider value={DaContext2}>
                        <dataContext.Provider value={[data, setData]}>
                          <dataContext2.Provider value={[data2, setData2]}>
                            <AgeHopTestContext.Provider value={[ageHopTestContext, setAgeHopTestContext]}>
                              <DSLIdContext.Provider value={[dslId, setDSLId]}>
                                {props.children}
                              </DSLIdContext.Provider>
                            </AgeHopTestContext.Provider>
                          </dataContext2.Provider>
                        </dataContext.Provider>
                      </DaContext2.Provider>
                    </DaContext.Provider>
                  </MemoryCorrectAnswerContext.Provider>
                </MedicalReportRepoContext.Provider>
              </PreliminaryReportRepoContext.Provider>  
            </IncidentReportRepoContext.Provider>
          </PatientRepoContext.Provider>
          </AccountRepoContext.Provider>
          </AccountContext.Provider>
        </PatientContext.Provider>
      </ReportIdContext.Provider>
    </PrelimReportIdContext.Provider>

  );
}
