import { IncidentReportRepo } from '../IncidentReportRepo';

describe('VOMSTest', () => {
  const TEST_VOMS_RESULTS = {
    vs_id: 1234,
    description: 'Initial',
    headache_rating: 0,
    nausea_rating: 0,
    dizziness_rating: 0,
    fogginess_rating: 0,
  };

  const MOCK_VOMS = {
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
      runSqlStmt: jest.fn(() => Promise.resolve(MOCK_VOMS)),
    };
    vs = new IncidentReportRepo(mockDa);
  });

  describe('createVOMSSymptomsResult', () => {
    it('calls runSqlStmt with correct args', async () => {
      const reportId = 1234;
      const description = 'Initial';
      const headache_rating = 0;
      const nausea_rating = 0;
      const dizziness_rating = 0;
      const fogginess_rating = 0;

      await vs.addVOMSSymptoms(
        reportId,
        description,
        headache_rating,
        nausea_rating,
        dizziness_rating,
        fogginess_rating,
      );

      expect(mockDa.runSqlStmt.mock.calls.length).toBe(1);
      expect(mockDa.runSqlStmt.mock.calls[0][1]).toEqual([
        reportId,
        description,
        headache_rating,
        nausea_rating,
        dizziness_rating,
        fogginess_rating,
      ]);
    });

    it('returns insert id', async () => {
      const id = 1234;
      mockDa.runSqlStmt = jest.fn(() => Promise.resolve({ insertId: id }));

      const sucCb = jest.fn(() => {});

      await vs.addVOMSSymptoms(1234, 'Initial', 0, 0, 0, 0).then(sucCb);
      expect(sucCb.mock.calls.length).toBe(1);
      expect(sucCb.mock.calls[0][0]).toBe(id);
    });
  });

  describe('getVOMSSymptoms', () => {
    it('returns existing results', async () => {
      const mockRs = {
        rows: {
          length: 1,
          item: jest.fn(() => TEST_VOMS_RESULTS),
        },
      };
      mockDa.runSqlStmt = jest.fn(() => Promise.resolve(mockRs));
      let r = await vs.getVOMSSymptoms(
        TEST_VOMS_RESULTS.vs_id,
        TEST_VOMS_RESULTS.description,
      );

      expect(r.vs_id).toBe(TEST_VOMS_RESULTS.vs_id);
      expect(r.description).toBe(TEST_VOMS_RESULTS.description);
      expect(r.headache_rating).toBe(TEST_VOMS_RESULTS.headache_rating);
      expect(r.nausea_rating).toBe(TEST_VOMS_RESULTS.nausea_rating);
      expect(r.dizziness_rating).toBe(TEST_VOMS_RESULTS.dizziness_rating);
      expect(r.fogginess_rating).toBe(TEST_VOMS_RESULTS.fogginess_rating);
    });
  });

  describe('getAllVOMSSymptoms', () => {
    it('correctly resolves', async () => {
      const mockVS = {
        rows: {
          length: 1,
          _array: [
            {
              description: '',
              headache_rating: 0,
              nausea_rating: 0,
              dizziness_rating: 0,
              fogginess_rating: 0,
            },
          ],
        },
      };

      const ret = await vs.getAllVOMSSymptoms(TEST_VOMS_RESULTS.vs_id);
      const exp = [{}, {}];

      expect(ret).toEqual(exp);
    });
  });
});
