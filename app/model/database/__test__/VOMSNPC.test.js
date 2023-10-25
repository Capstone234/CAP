import { IncidentReportRepo } from '../IncidentReportRepo';

describe('NPCTest', () => {

  let mockDatabase;
  let voms;
  beforeEach(() => {
    mockDatabase = {
      runSqlStmt: jest.fn(() => Promise.resolve('')),
    };

    voms = new IncidentReportRepo(mockDatabase);
  });

  describe('addVOMSNPCDistance', () => {
    it('should create VOMSNPCResult', async () => {
      const mockResult = {
        insertId: 982
      }

      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const VOMSId = await voms.addVOMSNPCDistance(123, 456, 10);
      expect(VOMSId).toEqual(mockResult.insertId);
    });
  });

  describe('getVOMSNPCDistance', () => {
    it('should return VomsDistance report', async () => {
      const mockResult = {
        rows: {
          item: () => ({
            distance: 10
          }),
        }
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
      const VOMSDistance = await voms.getVOMSNPCDistance(123, 456);
      expect(VOMSDistance).toEqual(mockResult.rows.item(0));
    });
    it('should not find VOMS report if uid or iid is null', async () =>{
      const mockResult = "Cannot find results";
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);

      let result = await voms.getVOMSNPCDistance(undefined, 456);
      expect(result).toEqual(mockResult);

      result = await voms.getVOMSNPCDistance(null, 456);
      expect(result).toEqual(mockResult);

      result = await voms.getVOMSNPCDistance(123, undefined);
      expect(result).toEqual(mockResult);

      result = await voms.getVOMSNPCDistance(123, null);
      expect(result).toEqual(mockResult);
    });
    it('should not find results if results does not exist', async () =>{
      const mockResult = {
        rows: {
          length: 0,
        },
      };
      mockDatabase.runSqlStmt = () => Promise.resolve(mockResult);
    
      await expect(voms.getVOMSNPCDistance(123, 456)).rejects.toThrowError(
        'No VOMS Distance found for uid: 123, iid: 456'
      );
    });
  });

  
});
