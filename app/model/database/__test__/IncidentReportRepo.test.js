import { IncidentReportRepo } from '../IncidentReportRepo';

describe('IncidentReportRepo', () => {

  let mockDatabase;
  let report;
  beforeEach(() => {
    mockDatabase = {
      runSqlStmt: jest.fn(() => Promise.resolve('')),
    };

    report = new IncidentReportRepo(mockDatabase);
  });

  describe('createReport', () => {
    it('should create a report and return the report ID', async () => {
      const mockResult = {
        insertId: 123
      }

      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

      const reportId = await report.createReport(123, "testUser", "test description", 0, 0);
      expect(reportId).toEqual(123);
    });
  });

  describe('updateIncident', () => {
    it('should update an incident and return the number of rows affected', async () => {
      // Mock the runSqlStmt method to return the expected number of rows affected
      const mockRowsAffected = 1;
      mockDatabase.runSqlStmt = () => Promise.resolve({ rowsAffected: mockRowsAffected });
  
      // Call the updateIncident method
      const rowsAffected = await report.updateIncident(123, 456, "updatedUser", "Updated incident", 3, 1, "2023-10-15 12:00:00");
  
      // Ensure that the number of rows affected is as expected
      expect(rowsAffected).toEqual(mockRowsAffected);
    });
    it('should reject with an error when an error occurs during the update', async () => {
      const errorMessage = 'Database error';
      
      // Mock the runSqlStmt method to return a rejected Promise with an error message
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      
      // Call the updateIncident method
      await expect(
        report.updateIncident(123, 456, "updatedUser", "Updated incident", 3, 1, "2023-10-15 12:00:00")
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('incrementTestStage', () => {
    it('should update the finishedupto attribute of incident report for user', async () => {
      const mockRowsAffected = 1;
      mockDatabase.runSqlStmt = () => Promise.resolve({ rowsAffected: mockRowsAffected });
      const rowsAffected = await report.incrementTestStage(456);
      expect(rowsAffected).toEqual(mockRowsAffected);
    });
    it('should reject with an error if and error occurs during increment update', async () => {
      const errorMessage = 'Database error';
      
      // Mock the runSqlStmt method to return a rejected Promise with an error message
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      
      // Call the updateIncident method
      await expect(
        report.incrementTestStage(456)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('updateIncidentUid', () => {
    it('should update incident uid', async () => {
      const mockRowsAffected = 1;
      mockDatabase.runSqlStmt = () => Promise.resolve({ rowsAffected: mockRowsAffected });
      const rowsAffected = await report.updateIncidentUid(123, 456);
      expect(rowsAffected).toEqual(mockRowsAffected);
    });
    it('should reject with an error if and error occurs during updating incident uid', async () => {
      const errorMessage = 'Database error';
      
      // Mock the runSqlStmt method to return a rejected Promise with an error message
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      
      // Call the updateIncident method
      await expect(
        report.updateIncidentUid(123, 456)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe('getAllIncidents', () => {
    it('should get all incidents for user', async () => {
      const mockResult = {
        rows: {
            _array: [{
                uid: 123,
                iid: 456,
                username: 'testUser',
                incident: 'Test incident',
                finishedupto: 3,
                finished: 1,
                datetime: '2023-10-15 12:00:00',
                nextreport:'2023-10-16 12:00:00',
            },
            {
              uid: 123,
              iid: 789,
              username: 'testUser1',
              incident: 'Test incident',
              finishedupto: 3,
              finished: 1,
              datetime: '2023-10-15 12:00:00',
              nextreport:'2023-10-16 12:00:00',
            }],
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const incident = await report.getIncidents(123);
      expect(incident).toEqual(mockResult.rows._array);
    });
  });

  describe('getAllDailySymptom', () => {
    it('should get all incidents for user', async () => {
      const mockResult = {
        rows: {
          length: 2,
          _array: [{
            uid: 123,
            iid: 456,
            sid: 789,
            dateTime: '2023-10-15 12:00:00',
            Headache: 4,
            Nausea: 3,
            Dizzy: 2,
            Vomiting: 3,
            Balance: 6,
            Blurry: 4,
            Light: 5,
            Noise: 1,
            NumbTingle: 0,
            Pain: 0,
            Slow: 0,
            Concentrating: 0,
            Remembering: 2,
            TroubleSleep: 1,
            Fatigued: 4,
            Drowsy: 2,
            Emotional: 4,
            Irritable: 5,
            Sadness: 1,
            Nervous: 2,
            symptomsPass: 4,
          },
          {
            uid: 123,
            iid: 456,
            sid: 789,
            dateTime: '2023-10-16 12:00:00',
            Headache: 4,
            Nausea: 3,
            Dizzy: 2,
            Vomiting: 3,
            Balance: 6,
            Blurry: 4,
            Light: 5,
            Noise: 1,
            NumbTingle: 0,
            Pain: 0,
            Slow: 0,
            Concentrating: 0,
            Remembering: 2,
            TroubleSleep: 1,
            Fatigued: 4,
            Drowsy: 2,
            Emotional: 4,
            Irritable: 5,
            Sadness: 1,
            Nervous: 2,
            symptomsPass: 4,
          }],
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const symptom = await report.getAllDailySymtoms(123);
      expect(symptom).toEqual(mockResult.rows._array);
    });
  });

  describe('getDailySymptoms', () => {
    it('should return the symptom report for specified daily symptom id', async () => {
      const mockResult = {
        rows: {
          length: 1,
          item: () => ({
            uid: 123,
            iid: 456,
            sid: 789,
            dateTime: '2023-10-15 12:00:00',
            Headache: 4,
            Nausea: 3,
            Dizzy: 2,
            Vomiting: 3,
            Balance: 6,
            Blurry: 4,
            Light: 5,
            Noise: 1,
            NumbTingle: 0,
            Pain: 0,
            Slow: 0,
            Concentrating: 0,
            Remembering: 2,
            TroubleSleep: 1,
            Fatigued: 4,
            Drowsy: 2,
            Emotional: 4,
            Irritable: 5,
            Sadness: 1,
            Nervous: 2,
            symptomsPass: 4,
          }),
        },
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const dailySymptom = await report.getDailySymtoms(123, 456, 789);
    
      expect(dailySymptom).toEqual(mockResult.rows.item(0));
    });
    it('should not find a daily symptom report', async () => {
      const mockResult = {
        rows: {
          length: 0,
        },
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
      await expect(report.getDailySymtoms(123, 456, 789)).rejects.toThrowError(
        'No daily symptom report found for uid: 123, iid: 456, sid: 789'
      );
    });
    it('should throw an error when uid, iid, and sid are all null or undefined', async () => {
      const mockResult = "Cannot find Report";
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      //uid null
      let result = await report.getDailySymtoms(null, 456, 789);
      expect(result).toEqual(mockResult);

      //uid undefined
      result = await report.getDailySymtoms(undefined, 456, 789);
      expect(result).toEqual(mockResult);

      //iid null
      result = await report.getDailySymtoms(123, null, 789);
      expect(result).toEqual(mockResult);
      
      //iid undefined
      result = await report.getDailySymtoms(123, undefined, 789);
      expect(result).toEqual(mockResult);

      //sid null
      result = await report.getDailySymtoms(123, 456, null);
      expect(result).toEqual(mockResult);

      //sid undefined
      result = await report.getDailySymtoms(123, 456, undefined);
      expect(result).toEqual(mockResult);
    });
  });
  
  
  describe('getMostRecentDailySymptoms', () => {
    it('should get the latest daily symptom report', async () => {
      const mockResult = {
        rows: {
          length: 2,
          item: () => [{
            uid: 123,
            iid: 456,
            sid: 789,
            dateTime: '2023-10-15 12:00:00',
            Headache: 4,
            Nausea: 3,
            Dizzy: 2,
            Vomiting: 3,
            Balance: 6,
            Blurry: 4,
            Light: 5,
            Noise: 1,
            NumbTingle: 0,
            Pain: 0,
            Slow: 0,
            Concentrating: 0,
            Remembering: 2,
            TroubleSleep: 1,
            Fatigued: 4,
            Drowsy: 2,
            Emotional: 4,
            Irritable: 5,
            Sadness: 1,
            Nervous: 2,
            symptomsPass: 4,
          },
          {
            uid: 123,
            iid: 456,
            sid: 789,
            dateTime: '2023-10-16 12:00:00',
            Headache: 4,
            Nausea: 3,
            Dizzy: 2,
            Vomiting: 3,
            Balance: 6,
            Blurry: 4,
            Light: 5,
            Noise: 1,
            NumbTingle: 0,
            Pain: 0,
            Slow: 0,
            Concentrating: 0,
            Remembering: 2,
            TroubleSleep: 1,
            Fatigued: 4,
            Drowsy: 2,
            Emotional: 4,
            Irritable: 5,
            Sadness: 1,
            Nervous: 2,
            symptomsPass: 4,
          }],
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const symptom = await report.getMostRecentDailySymptoms(123);
      expect(symptom).toEqual(mockResult.rows.item(1));
    });
    it('should not find report when uid is null or undefined', async () => {
      const mockResult = "Cannot find report";
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      let result = await report.getMostRecentDailySymptoms(null);
      expect(result).toEqual(mockResult);

      result = await report.getMostRecentDailySymptoms(undefined);
      expect(result).toEqual(mockResult);
    });
    it('should not find a daily symptom report', async () => {
      const mockResult = {
        rows: {
          length: 0,
        },
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
      await expect(report.getMostRecentDailySymptoms(123, 456, 789)).rejects.toThrowError(
        'No latest daily symptom report found for uid: 123'
      );
    });
  });


  describe('getPrelimReport', () => {
    it('should return prelim report', async () => {
      /*
      We are mocking database do not need to put all the inner join
      in the mocked result as we are just testing for the sql stmt is
      working and returning the rows arrat so as long as it can find 
      report using the uid and iid. (Too tedious to add all results after
      inner join)
      */
      const mockResult = {
        rows: {
          _array: [{
              uid: 123,
              iid: 456
          }],
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const prelim = await report.getPrelimReports(123, 456);
      expect(prelim).toEqual(mockResult.rows._array);
    });
    it('should not find prelim report if uid or iid is null', async () =>{
      const mockResult = "Cannot find report";
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

      let result = await report.getPrelimReports(undefined, 456);
      expect(result).toEqual(mockResult);

      result = await report.getPrelimReports(null, 456);
      expect(result).toEqual(mockResult);

      result = await report.getPrelimReports(123, undefined);
      expect(result).toEqual(mockResult);

      result = await report.getPrelimReports(123, null);
      expect(result).toEqual(mockResult);
    });
  });


  describe('setReaction', () => {
    it('should insert reaction and resolve without errors', async () => {
      await expect(report.setReaction(123, 456, 10, 20, 30, 15, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert reaction";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setReaction(1, 456, 10, 20, 30, 15, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setRedFlag', () => {
    it('should insert redflag and resolve without errors', async () => {
      await expect(report.setRedFlag(123, 456, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert redflag";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setRedFlag(1, 456,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setVerbal', () => {
    it('should insert verbal and resolve without errors', async () => {
      await expect(report.setVerbalTest(123, 456, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert verbal test";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setVerbalTest(1, 456, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setBalance', () => {
    it('should insert balance and resolve without errors', async () => {
      await expect(report.setBalance(123, 456, 0, 0, 0, 0, 1, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert balance";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setBalance(1, 456, 0, 0, 0, 0, 1, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setHop', () => {
    it('should insert hop and resolve without errors', async () => {
      await expect(report.setHop(123, 456, 1, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert hop";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setHop(1, 456, 1, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setMemory', () => {
    it('should memory reaction and resolve without errors', async () => {
      await expect(report.setMemory(123, 456, 0, 0, 1, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert memory";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setMemory(123, 456, 0, 0, 1, 1)).rejects.toThrow(errorMessage);
    });
  });


  describe('setPCSS', () => {
    it('should insert PCSS and resolve without errors', async () => {
      await expect(report.setPCSS(123, 456, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).resolves.not.toThrow();
    });
    it('should reject and return error if any error occurs', async () =>{
      const errorMessage = "Error: cannot add insert PCSS";
      mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
      await expect(report.setPCSS(1, 456, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)).rejects.toThrow(errorMessage);
    });
  });
  

  // describe('getReaction', () => {
  //   it('Get reaction data', async () => {

  //   });
  //   it('should reject and return error if any error occurs', async () =>{
  //     const errorMessage = "Error: cannot add insert reaction";
  //     mockDatabase.runSqlStmt = () => Promise.reject(new Error(errorMessage));
  //     await expect(report.setReaction(1, 456, 10, 20, 30, 15, 1)).rejects.toThrow(errorMessage);
  //   });
  // });


});
