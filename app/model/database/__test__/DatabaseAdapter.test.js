import { DatabaseAdapter } from '../DatabaseAdapter';
import { TABLES_SQL } from '../DatabaseConfig';

describe('DatabaseAdapter', () => {
  let db;
  let da;

  beforeEach(async () => {
    db = {
      transaction: jest.fn((cb, errCb, sucCb) => {
        sucCb();
      }),
    };

    da = await DatabaseAdapter.initDatabase(db);
  });

  describe('initDatabase', () => {
    it('uses sqlite db', async () => {
      // 5 tables * 2
      expect(db.transaction).toHaveBeenCalledTimes(TABLES_SQL.length);
    });

    it('on success resolves with database adapter', async () => {
      let errCb = jest.fn();
      let sucCb = jest.fn();

      await DatabaseAdapter.initDatabase(db).then(sucCb, errCb);

      // Resolve is called once
      expect(sucCb.mock.calls.length).toBe(1);
      expect(sucCb.mock.calls[0][0]).toBeInstanceOf(DatabaseAdapter);

      expect(errCb.mock.calls.length).toBe(0);
    });

    it('on error resolves error reason', async () => {
      const err = 'error message';
      db = {
        transaction: jest.fn((cb, errCb) => {
          errCb(err);
        }),
      };

      let errCb = jest.fn();
      let sucCb = jest.fn();

      await DatabaseAdapter.initDatabase(db).then(sucCb, errCb);

      expect(errCb.mock.calls.length).toBe(1);
      expect(errCb.mock.calls[0][0]).toBe(err);

      expect(sucCb.mock.calls.length).toBe(0);
    });
  });

  describe('runSqlStmt', () => {
    it('starts transaction', () => {
      db.transaction.mockClear();

      da.runSqlStmt('');

      // Called once
      expect(db.transaction.mock.calls.length).toBe(1);
    });

    it('runs executeSql with correct arguments (no "args" set)', () => {
      // Mock transaction
      let tx = {
        executeSql: jest.fn(() => {}),
      };
      db.transaction = jest.fn((cb) => {
        cb(tx);
      });

      const sqlStmt = 'My sql statement';

      da.runSqlStmt(sqlStmt);

      // Called once
      expect(tx.executeSql.mock.calls.length).toBe(1);
      // Runs given sql statement
      expect(tx.executeSql.mock.calls[0][0]).toBe(sqlStmt);
      // Runs with empty args
      expect(tx.executeSql.mock.calls[0][1]).toEqual([]);
      // Correct number of arguments
      expect(tx.executeSql.mock.calls[0].length).toBe(4);
    });

    it('runs executeSql with correct arguments (one arg in "args")', () => {
      // Mock transaction
      let tx = {
        executeSql: jest.fn(() => {}),
      };
      db.transaction = jest.fn((cb) => {
        cb(tx);
      });

      const sqlStmt = 'My sql statement';
      const args = ['arg1'];

      da.runSqlStmt(sqlStmt, args);

      // Called once
      expect(tx.executeSql.mock.calls.length).toBe(1);
      // Runs given sql statement
      expect(tx.executeSql.mock.calls[0][0]).toBe(sqlStmt);
      // Runs with given args
      expect(tx.executeSql.mock.calls[0][1]).toEqual(args);
      // Correct number of arguments
      expect(tx.executeSql.mock.calls[0].length).toBe(4);
    });

    it('runs executeSql with correct arguments ("args" set)', () => {
      // Mock transaction
      let tx = {
        executeSql: jest.fn(() => {}),
      };
      db.transaction = jest.fn((cb) => {
        cb(tx);
      });

      const sqlStmt = 'My sql statement';
      const args = ['arg1', 'arg2'];

      da.runSqlStmt(sqlStmt, args);

      // Called once
      expect(tx.executeSql.mock.calls.length).toBe(1);
      // Runs given sql statement
      expect(tx.executeSql.mock.calls[0][0]).toBe(sqlStmt);
      // Runs with given args
      expect(tx.executeSql.mock.calls[0][1]).toEqual(args);
      // Correct number of arguments
      expect(tx.executeSql.mock.calls[0].length).toBe(4);
    });

    it('rejects on transaction error', async () => {
      db.transaction = jest.fn((cb, errCb) => {
        errCb('');
      });

      let errCb = jest.fn();
      let sucCb = jest.fn();
      await da.runSqlStmt('').then(sucCb, errCb);

      // Calls reject callback
      expect(errCb.mock.calls[0].length).toBe(1);
      // Doesnt call accept callback
      expect(sucCb.mock.calls.length).toBe(0);
    });

    it('rejects on executeSql error', async () => {
      // Mock transaction
      let tx = {
        executeSql: jest.fn((stmt, args, cb, errCb) => {
          errCb('', '');
        }),
      };
      db.transaction = jest.fn((cb) => {
        cb(tx);
      });

      let errCb = jest.fn();
      let sucCb = jest.fn();
      await da.runSqlStmt('').then(sucCb, errCb);

      // Calls reject callback
      expect(errCb.mock.calls[0].length).toBe(1);
      // Doesnt call accept callback
      expect(sucCb.mock.calls.length).toBe(0);
    });

    it('resolves with executeSql resultSet', async () => {
      const res = 'result set';

      // Run the callback given to executeSql with result set
      let tx = {
        executeSql: jest.fn((stmt, args, cb) => {
          cb('', res);
        }),
      };

      // Run callback, then success callback
      db.transaction = jest.fn((cb, errCb, sucCb) => {
        cb(tx);
        sucCb();
      });

      let errCb = jest.fn();
      let sucCb = jest.fn();
      await da.runSqlStmt('').then(sucCb, errCb);

      // Calls resolve callback
      expect(sucCb.mock.calls.length).toBe(1);
      // Called with result set
      expect(sucCb.mock.calls[0][0]).toBe(res);
      // Doesnt call reject callback
      expect(errCb.mock.calls.length).toBe(0);
    });
  });
});
