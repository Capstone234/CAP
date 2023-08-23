/**
 * @module
 */

import { Account } from './Account';

export class AccountRepo {
  /**
   *
   * @param {DatabaseAdapter} da
   */
  constructor(da) {
    this.da = da;
  }

  /**
   * Creates a user
   *
   * @param firstName
   * @param lastName
   * @param age
   * @param weight
   * @param password
   * @returns {Promise<number>} a promise of the accountId
   * @throws {SQLError}
   */
  async createAccount(firstName, lastName, age, weight, password) {
    const sql =
      'INSERT INTO Account (first_name, last_name, age, weight, password) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [firstName, lastName, age, weight, password]).then((rs) => {
        resolve(rs.insertId);
      }, reject);
    });
  }

  /**
   * Returns the account with given id.
   *
   * @returns {Promise<Patient>} a promise of the accountId
   * @throws {SQLError}
   */
  async getAccount(accountId) {
    const sql = 'SELECT * FROM Account WHERE account_id = ?';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [patientId]).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error('No account with id ' + accountId));
          return;
        }
        const account = rs.rows.item(0);
        if (
          'account_id' in account &&
          'first_name' in account &&
          'last_name' in account &&
          'age' in account &&
          'weight' in account &&
          'password' in account
        ) {
          resolve(
            new Account(
              account.accountId,
              account.first_name,
              account.last_name,
              account.age,
              account.weight,
              account.password,
            ),
          );
        } else {
          reject(
            new Error(
              'Account table does not contain all Account class attributes',
            ),
          );
        }
      });
    });
  }
  
  
  /**
   * Returns all the patients in the database
   * @returns {Promise<any[]>} array of Accounts first name and last name rows
   */
  async getAllAccounts() {
    const sql =
      'SELECT account_id, first_name, last_name, age, weight, password FROM Account';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, []).then((rs) => {
        resolve(rs.rows._array);
      });
    });
  }
}
