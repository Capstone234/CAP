import StringUtils from '../StringUtils'; // Update the path accordingly


describe('StringUtils class', () => {
  describe('enforceLength method', () => {
    it('should replace null, undefined, or empty strings with "null"', () => {
      const strings = [null, undefined, '   ', 'test'];
      const result = StringUtils.enforceLength(strings);
      expect(result).toEqual(['null', 'null', 'null', 'test']);
    });

    it('should throw an error if a string exceeds its allowed length', () => {
      const strings = ['a'.repeat(51), 'test', 'test', 'test'];
      expect(() => StringUtils.enforceLength(strings)).toThrow('String at position 0 exceeds the allowed length of 50 characters.');
    });
  });

  describe('join method', () => {
    it('should throw an error if input is not an array of 4 strings', () => {
      expect(() => StringUtils.join(['test'])).toThrow('Expected an array of 4 strings.');
    });

    it('should join an array of 4 strings with the default delimiter', () => {
      const strings = ['test1', 'test2', 'test3', 'test4'];
      const result = StringUtils.join(strings);
      expect(result).toBe('test1|test2|test3|test4');
    });
  });

  describe('split method', () => {
    it('should throw an error if the input string does not have 3 delimiters', () => {
      expect(() => StringUtils.split('test1|test2')).toThrow('The provided string does not match the expected format.');
    });

    it('should split a string into an array of 4 strings', () => {
      const input = 'test1|test2|test3|test4';
      const result = StringUtils.split(input);
      expect(result).toEqual(['test1', 'test2', 'test3', 'test4']);
    });

    it('should replace "null" with actual null value', () => {
      const input = 'test1|null|test3|test4';
      const result = StringUtils.split(input);
      expect(result).toEqual(['test1', null, 'test3', 'test4']);
    });
  });
});
