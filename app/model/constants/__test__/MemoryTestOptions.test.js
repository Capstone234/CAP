import MemoryTestOptions, {getShuffledOptions} from '../MemoryTestOptions';

describe('MemoryTestOptions', () => {
    it('has the correct number of options', () => {
        const options = getShuffledOptions();
        expect(options.length).toBe(9);
    });

});