export const parseUnit = (str: string): [number, string] =>
  [parseFloat(str), str.match(/[\d.\-\+]*\s*(.*)/)?.[1] || ''] ?? [0, ''];
