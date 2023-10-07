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
