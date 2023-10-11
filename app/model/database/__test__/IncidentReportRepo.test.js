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
    it('should return Cannot find most recent daily symptom report when uid is null or undefined', async () => {
      const mockResult = "Cannot find most recent daily symptom report";
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



});
