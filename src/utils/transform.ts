export const toKeyFormat = (str: string): string =>
  str
    .toLowerCase()
    // replace "." occurrences
    .replace(/([\w]+\.)/g, '')
    // replace word occurrences in parentheses
    .replace(/\([^()]*\)/g, '')
    // to camel Case
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    .trim();
