/**
 * @module
 */

/**
 * Represents a user in the database.
 *
 * Snake case is used for properties because it is used in the db schema.
 *
 * This class is compatible with the DB refactor.
 */
export class User {
  constructor(uid, username, fName, sName, age, weight, email, password) {
    this.uid = uid;
    this.username = username;
    this.fName = fName;
    this.sName = sName;
    this.age = age;
    this.weight = weight;
    this.email = email;
    this.password = password;
  }
}
