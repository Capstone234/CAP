import { IncidentReportRepo } from '../IncidentReportRepo';

describe('VOMSTest', () => {
  let mockDatabase;
  let voms;
  beforeEach(() => {
    mockDatabase = {
      runSqlStmt: jest.fn(() => Promise.resolve('')),
    };

    voms = new IncidentReportRepo(mockDatabase);
  });

  describe('addVOMSSymptoms', () => {
    it('should create VOMS Symptoms Result', async () => {
      const mockResult = {
        insertId: 982
      }

      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const VOMSId = await voms.addVOMSSymptoms(123, 456, 1, 0, 0, 0, 0);
      expect(VOMSId).toEqual(mockResult.insertId);
    });
  });
  describe('getAllVOMSSymtoms', () => {
    it('should get all voms symptoms for user', async () => {
      const mockResult = {
        rows: {
            _array: [{
                uid: 123,
                iid: 456,
            }]
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const vomsArray = await voms.getAllVOMSSymptoms(123, 456);
      expect(vomsArray).toEqual(mockResult.rows._array);
    });
    it('should not find VOMS report if uid or iid is null', async () =>{
      const mockResult = "Cannot find results";
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

      let result = await voms.getAllVOMSSymptoms(undefined, 456);
      expect(result).toEqual(mockResult);

      result = await voms.getAllVOMSSymptoms(null, 456);
      expect(result).toEqual(mockResult);

      result = await voms.getAllVOMSSymptoms(123, undefined);
      expect(result).toEqual(mockResult);

      result = await voms.getAllVOMSSymptoms(123, null);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getVOMS', () => {
    it('should return VomsDistance report', async () => {
      const mockResult = {
        rows: {
          item: () => ({
            uid: 123,
            iid: 456,
            stage: 1,
          }),
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const VOMSDistance = await voms.getVOMS(123, 456, 1);
      expect(VOMSDistance).toEqual(mockResult.rows.item(0));
    });
    it('should not find results if results does not exist', async () =>{
      const mockResult = {
        rows: {
          length: 0,
        },
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
      await expect(voms.getVOMS(312, 456, 1)).rejects.toThrowError(
        'No VOMS Distance found for uid: 312, iid: 456'
      );
    });
  });
  describe('getVOMSCluster', () => {
    it('should create VOMS Symptoms Result', async () => {
      const mockResult = {
        rows: {
          length: 10,
        },
      };

      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const VOMSId = await voms.getVOMSCluster(456);
      expect(VOMSId).toEqual(mockResult.rows);
    });
  });

  
});
