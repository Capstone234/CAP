import React from 'react';
import { useEffect, useState } from 'react';
import { User } from '../model/database/User';
import { UserRepo } from '../model/database/UserRepo';
import { DatabaseAdapter } from '../model/database/DatabaseAdapter';
import { IncidentReportRepo } from '../model/database/IncidentReportRepo';
import * as SQLite from 'expo-sqlite';

const DB_FILE = 'measurements.db';

// Contexts
/**
 *
 */
export const UserContext = React.createContext(null);

export const UserRepoContext = React.createContext(null);

export const IncidentIdContext = React.createContext(null);

export const IncidentReportRepoContext = React.createContext(null);

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

  // Global user
  const [user, setUser] = useState(new User(null, 'Guest', null, null, null, null, null, null));

  // Global report id
  const [incidentId, setIncidentId] = useState(null);

  // Global Repositories
  const [userRepoContext, setUserRepoContext] = useState(null);
  const [daContext, setDaContext] = useState(null);
  const [daContext2, setDaContext2] = useState(null);
  const [incidentRepoContext, setIncidentRepoContext] = useState(null);
  const [memoryCorrectAnswerContext, setMemoryCorrectAnswerContext] = useState([]);
  const [ageHopTestContext, setAgeHopTestContext] = useState(null);
  const [dslId, setDSLId] = useState(0);

  useEffect(() => {
    DatabaseAdapter.initDatabase(SQLite.openDatabase(DB_FILE)).then((daNew) => {
      setDaContext(daNew);
      setUserRepoContext(new UserRepo(daNew));
      setIncidentReportRepoContext(new IncidentReportRepo(daNew));
    });
  }, []);

  return (

    <IncidentIdContext.Provider value={[incidentId, setIncidentId]}>
      <UserContext.Provider value={[user, setUser]}>
        <UserRepoContext.Provider value={userRepoContext}>
          <IncidentReportRepoContext.Provider value={incidentRepoContext}>
            <MemoryCorrectAnswerContext.Provider value={[memoryCorrectAnswerContext, setMemoryCorrectAnswerContext]}>
              <DaContext.Provider value={daContext}>
                <DaContext2.Provider value={daContext2}>
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
          </IncidentReportRepoContext.Provider>
        </UserRepoContext.Provider>
      </UserContext.Provider>
    </IncidentIdContext.Provider>
  );
}