import standardDeviation from '../standardDeviation';

describe('standardDeviation', () => {
  it('returns 0 when given empty array', () => {
    const arr = [];
    const std = standardDeviation(arr);

    expect(std).toBe(0);
  });

  it('returns standard deviation is not 0', () => {
    const arr = [1, 2, 3];
    const std = standardDeviation(arr);

    expect(std).toBeCloseTo(0.81649);
  });

  it('returns standard deviation of 0', () => {
    const arr = [1, 1, 1];
    const std = standardDeviation(arr);

    expect(std).toBe(0);
  });
});
