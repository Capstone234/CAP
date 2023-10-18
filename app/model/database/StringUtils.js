//This is in with the database stuff because it is being used for the db.
//Basically as soon as we had finished the DB the clients wanted a new feature,
//to be able to use a single account for multiple people. So we modify the
//incident description field in the incident table to save all of the specific
//patient info for that incident.

//We do this using delimiters, this set of functions will encode and decode
//the string for this purpose.

class StringUtils {
  constructor(delimiter = '|') {
    this.delimiter = delimiter;
    this.lengths = [50, 25, 25, 500]; // Expected max lengths for each string
  }

  // Helper function to ensure strings are within the required length
  enforceLength(strings) {
    return strings.map((str, index) => {
      if (str === null || str === undefined || str.trim() === '') {
        return 'null';
      }
      if (str.length > this.lengths[index]) {
        throw new Error(`String at position ${index} exceeds the allowed length of ${this.lengths[index]} characters.`);
      }
      return str;
    });
  }

  // Join an array of 4 strings into a single string with delimiters
  join(strings) {
    if (strings.length !== 4) {
      throw new Error('Expected an array of 4 strings.');
    }
    const enforcedStrings = this.enforceLength(strings);
    return enforcedStrings.join(this.delimiter);
  }

  // Split a delimited string into an array of 4 strings
  split(joinedString) {
    const strings = joinedString.split(this.delimiter);
    if (strings.length !== 4) {
      throw new Error('The provided string does not match the expected format.');
    }
    return strings.map(str => (str === 'null' ? null : str));
  }
}

export default new StringUtils();
