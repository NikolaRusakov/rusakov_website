const unitToString = (str: any): string => str.toString();

export const parseUnit = (str: string | number): [number, string] =>
  parseNumberString(unitToString(str));

const parseNumberString = (str: string, unit = ''): [number, string] =>
  [parseFloat(str), str.match(/[\d.\-\+]*\s*(.*)/)?.[1] || unit] ?? [0, unit];

export const remToPx = (input: [number, string]): [number, string] =>
  input[1] == 'rem' ? [input[0] * 16, 'px'] : input;
