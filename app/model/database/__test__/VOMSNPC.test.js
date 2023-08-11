import { IncidentReportRepo } from '../IncidentReportRepo';

describe('NPCTest', () => {
  const TEST_NPC_RESULTS = {
    vs_id: 1234,
    distance: 10,
  };

  const MOCK_NPC = {
    rows: {
      length: 2,
      _array: [{}, {}],
      item: () => ({}),
    },
  };

  let mockDa;
  let vs;

  beforeEach(() => {
    mockDa = {
      runSqlStmt: jest.fn(() => Promise.resolve(MOCK_NPC)),
    };
    vs = new IncidentReportRepo(mockDa);
  });

  describe('createVOMSNPCResult', () => {
    it('calls runSqlStmt with correct args', async () => {
      const reportId = 1234;
      const distance = 10;

      await vs.addVOMSNPCDistance(reportId, distance);

      expect(mockDa.runSqlStmt.mock.calls.length).toBe(1);
      expect(mockDa.runSqlStmt.mock.calls[0][1]).toEqual([reportId, distance]);
    });

    it('returns insert id', async () => {
      const id = 1234;
      mockDa.runSqlStmt = jest.fn(() => Promise.resolve({ insertId: id }));

      const sucCb = jest.fn(() => {});

      await vs.addVOMSNPCDistance(1234, 10).then(sucCb);
      expect(sucCb.mock.calls.length).toBe(1);
      expect(sucCb.mock.calls[0][0]).toBe(id);
    });
  });

  describe('getVOMSNPCDistance', () => {
    it('returns existing results', async () => {
      const mockRs = {
        rows: {
          length: 1,
          item: jest.fn(() => TEST_NPC_RESULTS),
        },
      };
      mockDa.runSqlStmt = jest.fn(() => Promise.resolve(mockRs));
      let r = await vs.getVOMSNPCDistance(TEST_NPC_RESULTS.vs_id);

      expect(r.vs_id).toBe(TEST_NPC_RESULTS.vs_id);
      expect(r.distance).toBe(TEST_NPC_RESULTS.distance);
    });
  });
});
