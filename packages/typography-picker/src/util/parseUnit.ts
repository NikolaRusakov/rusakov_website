const unitToString = (str: any): string => str.toString();

export const parseUnit = (str: string | number): [number, string] =>
  parseNumberString(unitToString(str));

const parseNumberString = (str: string): [number, string] =>
  [parseFloat(str), str.match(/[\d.\-\+]*\s*(.*)/)?.[1] || ''] ?? [0, ''];
