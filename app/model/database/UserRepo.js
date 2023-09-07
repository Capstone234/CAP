/**
 * @module
 */

import { User } from './User';

export class UserRepo {
  /**
   * this class is compatible with the DB refactor.
   * TODO maybe some methods to update values.
   * @param {DatabaseAdapter} da
   */
  constructor(da) {
    this.da = da;
  }

  /**
   * Creates a user, it returns the username so you can then use that to
   * return the user from the db and initialise a user object in the app.
   * @param username
   * @param fName
   * @param sName
   * @param age
   * @param weight
   * @param email
   * @param password
   * @returns {Promise<username>} a promise of the username
   * @throws {SQLError}
   */
  async createPatient(username, fName, sName, age, weight, email, password) {
    const sql =
      'INSERT INTO Patient (username, fName, sName, age, weight, email, password) VALUES (?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [username, fName, sName, age, weight, email, password]).then(() => {
        resolve(username);
      }, reject);
    });
  }

  /**
   * Returns the user with given username. Acquire username by user input,
   * or it will be automatically returned after using the function above.
   *
   * @returns {Promise<Patient>} a promise of the patientId
   * @throws {SQLError}
   */
  async getUser(username) {
    const sql = 'SELECT * FROM User WHERE username = ?';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [username]).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error('No user with username: ' + username));
          return;
        }
        const user = rs.rows.item(0);
        if (
          'fName' in user &&
          'sName' in user &&
          'age' in user &&
          'weight' in user &&
          'email' in user &&
          'password' in user
        ) {
          resolve(
            new Patient(
              patient.username,
              patient.fName,
              patient.sName,
              patient.age,
              patient.weight,
              patient.email,
              patient.password,
            ),
          );
        } else {
          reject(
            new Error(
              'Patient table does not contain all Patient class attributes',
            ),
          );
        }
      });
    });
  }

  /**
   * Returns all the users in the database
   * @returns {Promise<any[]>} array of Patients first name and last name rows
   */
  async getAllUsers() {
    const sql =
      'SELECT username, fName, sName, age, weight, email, password FROM Patient';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, []).then((rs) => {
        resolve(rs.rows._array);
      });
    });
  }
}
