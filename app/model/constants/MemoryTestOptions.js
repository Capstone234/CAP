const options = [
  'bird',
  'clock',
  'cup',
  'flower',
  'fork',
  'keys',
  'pen',
  'scissors',
  'toothbrush',
];

/**
 * Return a random ordering of options
 *
 * From https://stackoverflow.com/a/46545530
 * @return {string[]}
 */
export const getShuffledOptions = () => {
  return options
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
