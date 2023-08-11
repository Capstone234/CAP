import { IncidentReportRepo } from '../IncidentReportRepo';

describe('IncidentReportRepo', () => {
  const REP_ID = 1231244;

  const MOCK_RS = {
    rows: {
      length: 2,
      _array: [{}, {}],
      item: () => ({}),
    },
  };

  const MOCK_ERR = 'something bad happened';

  let mockDa;
  let iRR;
  beforeEach(() => {
    mockDa = {
      runSqlStmt: jest.fn(() => Promise.resolve('')),
    };

    iRR = new IncidentReportRepo(mockDa);
  });

  describe('createReport', () => {
    it('returns insertId', async () => {
      const insertId = 12345;

      const mockRs = {
        insertId: insertId,
      };

      mockDa.runSqlStmt = () => Promise.resolve(mockRs);

      let ret = await iRR.createReport(111);
      expect(ret).toBe(insertId);
    });

    it('calls with patientId ', async () => {
      const patientId = 123445;
      await iRR.createReport(patientId);

      expect(mockDa.runSqlStmt.mock.calls.length).toBe(1);
      expect(mockDa.runSqlStmt.mock.calls[0][1]).toEqual([patientId]);
    });
  });

  describe('setSingleResponse', () => {
    it('returns insertId', async () => {
      const args = [REP_ID, 'knock knock', 'whos there?'];
      const insertId = 1111111;

      const mockRs = {
        insertId: insertId,
      };

      mockDa.runSqlStmt = () => Promise.resolve(mockRs);

      let ret = await iRR.setSingleResponse(...args);
      expect(ret).toBe(insertId);
    });

    it('calls with patientId ', async () => {
      const args = [12345, 'knock knock', 'whos there?'];

      await iRR.setSingleResponse(...args);

      expect(mockDa.runSqlStmt.mock.calls.length).toBe(2);
      expect(mockDa.runSqlStmt.mock.calls[0][1]).toEqual(args.slice(0, 2));
      expect(mockDa.runSqlStmt.mock.calls[1][1]).toEqual(args);
    });
  });

  describe('getSingleResponses', () => {
    it('returns row array', async () => {
      const mockRs = {
        rows: {
          length: 2,
          _array: [{ name: 'row0' }, { name: 'row1' }],
        },
      };

      mockDa.runSqlStmt = () => Promise.resolve(mockRs);

      const ret = await iRR.getSingleResponses(REP_ID);
      expect(ret).toEqual(mockRs.rows._array);
    });
  });

  describe('setMultiResponse', () => {
    it('inserts new multi response and its parts', async () => {
      const errCb = jest.fn(() => {});
      const sucCb = jest.fn(() => {});

      const desc = 'test multi response';
      const resp = ['response 1', 'response 2', 'response 3'];

      await iRR.setMultiResponse(REP_ID, desc, resp).then(sucCb, errCb);
      expect(mockDa.runSqlStmt.mock.calls.length).toBe(6);

      expect(errCb.mock.calls.length).toBe(0);
      expect(sucCb.mock.calls.length).toBe(1);
    });

    it('correctly rejects on MultiResponse error', async () => {
      mockDa.runSqlStmt = jest.fn(() =>
        Promise.reject('something bad happened'),
      );

      const errCb = jest.fn(() => {});
      const sucCb = jest.fn(() => {});

      await iRR.setMultiResponse(REP_ID, '', []).then(sucCb, errCb);

      expect(errCb.mock.calls.length).toBe(1);
      expect(sucCb.mock.calls.length).toBe(0);
    });

    it('correctly rejects on MultiResponsePart error', async () => {
      let timesCalled = 0;
      mockDa.runSqlStmt = jest.fn(() => {
        if (timesCalled === 0) {
          Promise.resolve('');
          timesCalled++;
        } else {
          Promise.reject('something bad happened');
        }
      });

      const errCb = jest.fn(() => {});
      const sucCb = jest.fn(() => {});

      await iRR.setMultiResponse(REP_ID, '', []).then(sucCb, errCb);

      expect(errCb.mock.calls.length).toBe(1);
      expect(sucCb.mock.calls.length).toBe(0);
    });
  });

  describe('getMultiResponses', () => {
    it('correctly resolves', async () => {
      const mockMlRs = {
        rows: {
          length: 2,
          _array: [{ mr_id: 1 }, { mr_id: 2 }],
        },
      };

      const mockMlpRs = {
        rows: {
          length: 3,
          _array: [{}, {}, {}],
        },
      };

      let timesRun = 0;
      mockDa.runSqlStmt = jest.fn(() => {
        if (timesRun === 0) {
          timesRun++;
          return Promise.resolve(mockMlRs);
        } else {
          return Promise.resolve(mockMlpRs);
        }
      });

      const ret = await iRR.getMultiResponses(REP_ID);
      const exp = [
        { mr_id: 1, MultiResponsePart: [{}, {}, {}] },
        { mr_id: 2, MultiResponsePart: [{}, {}, {}] },
      ];

      expect(ret).toEqual(exp);
    });

    it('correctly rejects on MultiResponse error', async () => {
      mockDa.runSqlStmt = jest.fn(() => Promise.reject(MOCK_ERR));

      const errCb = jest.fn(() => {});
      const sucCb = jest.fn(() => {});

      await iRR.getMultiResponses(REP_ID).then(sucCb, errCb);

      expect(sucCb.mock.calls.length).toBe(0);
      expect(errCb.mock.calls.length).toBe(1);
      expect(errCb.mock.calls[0][0]).toBe(MOCK_ERR);
    });

    it('correctly rejects on MultiResponsePart error', async () => {
      let timesCalled = 0;
      mockDa.runSqlStmt = jest.fn(() => {
        if (timesCalled === 0) {
          timesCalled++;
          return Promise.resolve(MOCK_RS);
        } else {
          return Promise.reject(MOCK_ERR);
        }
      });

      const errCb = jest.fn(() => {});
      const sucCb = jest.fn(() => {});

      await iRR.getMultiResponses(REP_ID).then(sucCb, errCb);

      expect(sucCb.mock.calls.length).toBe(0);
      expect(errCb.mock.calls.length).toBe(1);
      expect(errCb.mock.calls[0][0]).toBe(MOCK_ERR);
    });
  });
});
