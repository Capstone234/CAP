/**
 * @module
 */

/**
 * Represents a patient in the database.
 *
 * Snake case is used for properties because it is used in the db schema.
 */
 export class Account {
    constructor(accountId, firstName, lastName, age, weight, password) {
      this.accountId = accountId;
      this.first_name = firstName;
      this.last_name = lastName;
      this.age = age;
      this.weight = weight;
      this.password = password;
    }
  }