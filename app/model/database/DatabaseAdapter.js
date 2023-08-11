/**
 * @module
 */

import { TABLES_SQL } from './DatabaseConfig';

export class DatabaseAdapter {
  /**
   *
   * @param {SQLite.WebSQLDatabase} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {string} sqlStmt
   * @param {any[]} args
   * @return {Promise<SQLResultSet>}
   */
  async runSqlStmt(sqlStmt, args = []) {
    let ret;
    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            sqlStmt,
            args,
            (_, rs) => (ret = rs),
            (_, err) => reject(err),
          );
        },
        (err) => reject(err),
        () => resolve(ret),
      );
    });
  }

  /**
   *
   * @param {SQLite.WebSQLDatabase} db
   * @return {Promise<DatabaseAdapter>}
   */
  static async initDatabase(db) {
    let da = new DatabaseAdapter(db);
    let error;

    for (let tableSql of TABLES_SQL) {
      await da.runSqlStmt(tableSql).then(
        () => {},
        (err) => {
          error = err;
        },
      );
    }

    return new Promise((resolve, reject) => {
      if (error != null) {
        reject(error);
      } else {
        resolve(da);
      }
    });
  }
}
