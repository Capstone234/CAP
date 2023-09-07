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
   * @returns {Promise<id>} a promise of the uid
   * @throws {SQLError}
   */
  async createPatient(username, fName, sName, age, weight, email, password) {
    const sql =
      'INSERT INTO Patient (username, fName, sName, age, weight, email, password) VALUES (?, ?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [username, fName, sName, age, weight, email, password]).then((rs) => {
        resolve(rs.insertId);
      }, reject);
    });
  }

  /**
   * Returns the user with autogen uid. Acquire username by user input,
   * or it will be automatically returned after using the function above.
   *
   * @returns {Promise<Patient>} a promise of the patientId
   * @throws {SQLError}
   */
  async getUserByUsername(username) {
    const sql = 'SELECT * FROM User WHERE username = ?';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [username]).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error('No user with username: ' + username));
          return;
        }
        const user = rs.rows.item(0);
        if (
          'uid' in user &&
          'username' in user &&
          'fName' in user &&
          'sName' in user &&
          'age' in user &&
          'weight' in user &&
          'email' in user &&
          'password' in user
        ) {
          resolve(
            new User(
              user.uid,
              user.username,
              user.fName,
              user.sName,
              user.age,
              user.weight,
              user.email,
              user.password,
            ),
          );
        } else {
          reject(
            new Error(
              'User table does not contain all Patient class attributes',
            ),
          );
        }
      });
    });
  }

  async getUserByID(uid) {
    const sql = 'SELECT * FROM User WHERE uid = ?';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [uid]).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error('No user with uid ' + uid));
          return;
        }
        const user = rs.rows.item(0);
        if (
          'uid' in user &&
          'username' in user &&
          'fName' in user &&
          'sName' in user &&
          'age' in user &&
          'weight' in user &&
          'email' in user &&
          'password' in user
        ) {
          resolve(
            new User(
              user.uid,
              user.username,
              user.fName,
              user.sName,
              user.age,
              user.weight,
              user.email,
              user.password,
            ),
          );
        } else {
          reject(
            new Error(
              'User table does not contain all user class attributes',
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
      'SELECT uid, username, fName, sName, age, weight, email, password FROM User';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, []).then((rs) => {
        resolve(rs.rows._array);
      });
    });
  }
}
