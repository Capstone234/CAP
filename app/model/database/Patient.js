/**
 * @module
 */

/**
 * Represents a patient in the database.
 *
 * Snake case is used for properties because it is used in the db schema.
 */
export class Patient {
  constructor(patientId, firstName, lastName, age, weight) {
    this.patient_id = patientId;
    this.first_name = firstName;
    this.last_name = lastName;
    this.age = age;
    this.weight = weight;
  }
}
