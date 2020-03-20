export const parseUnit = (str: string) =>
  [parseFloat(str), str.match(/[\d.\-\+]*\s*(.*)/)?.[1] || ''] ?? [0, ''];
