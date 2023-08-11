/**
 * @module
 */

import { Patient } from './Patient';

export class PatientRepo {
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
   * @returns {Promise<number>} a promise of the patientId
   * @throws {SQLError}
   */
  async createPatient(firstName, lastName, age, weight) {
    const sql =
      'INSERT INTO Patient (first_name, last_name, age, weight) VALUES (?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [firstName, lastName, age, weight]).then((rs) => {
        resolve(rs.insertId);
      }, reject);
    });
  }

  /**
   * Returns the patient with given id.
   *
   * @returns {Promise<Patient>} a promise of the patientId
   * @throws {SQLError}
   */
  async getPatient(patientId) {
    const sql = 'SELECT * FROM Patient WHERE patient_id = ?';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, [patientId]).then((rs) => {
        if (rs.rows.length < 1) {
          reject(new Error('No patient with id ' + patientId));
          return;
        }
        const patient = rs.rows.item(0);
        if (
          'patient_id' in patient &&
          'first_name' in patient &&
          'last_name' in patient &&
          'age' in patient &&
          'weight' in patient
        ) {
          resolve(
            new Patient(
              patient.patient_id,
              patient.first_name,
              patient.last_name,
              patient.age,
              patient.weight,
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
   * Returns all the patients in the database
   * @returns {Promise<any[]>} array of Patients first name and last name rows
   */
  async getAllPatients() {
    const sql =
      'SELECT patient_id, first_name, last_name, age, weight FROM Patient';

    return new Promise((resolve, reject) => {
      this.da.runSqlStmt(sql, []).then((rs) => {
        resolve(rs.rows._array);
      });
    });
  }
}
