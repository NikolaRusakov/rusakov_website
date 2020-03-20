export const ratiosMap: { [key: string]: number } = {
  'minor second': 16 / 15,
  'major second': 9 / 8,
  'minor third': 6 / 5,
  'major third': 4 / 3,
  'diminished fourth': Math.sqrt(2),
  'perfect fifth': 3 / 2,
  'minor sixth': 8 / 5,
  golden: 1.61803398875,
  phi: 1.61803398875,
  'major sixth': 5 / 3,
  'minor seventh': 16 / 9,
  'major seventh': 15 / 8,
  octave: 2,
  'major tenth': 5 / 2,
  'major eleventh': 8 / 3,
  'major twelfth': 3,
  'double octave': 4,
};

export function isNumber(x: unknown): x is number {
  return typeof x === 'number';
}

export default (ratio: number | string): number => {
  if (ratio == null) {
    return 2;
  }
  return isNumber(ratio) ? ratio : ratiosMap[ratio];
};
