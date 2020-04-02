// TODO: make it SSR friendly and handle errors gracefully + add typings
//@ts-ignore
import Typography from '@saltit/typography-picker';

//Injection can be improved by font list memoization, thus preventing unnecessary refetching
function injectFonts(typography: Typography): void {
  const fontsStr = getFontsStr(typography);

  if (fontsStr !== '') {
    const link = getFontsLink(fontsStr);
    if (document != null) {
      injectLink(link);
    }
  } else {
    // Fallback action if defined?
  }
}
function injectLink(link: string) {
  const typoElt = document.getElementById('typography.js');
  if (typoElt) {
    typoElt.insertAdjacentHTML('afterend', link);
  } else {
    // Fallback action if defined?
  }
}

// Can be extended into custom domain +
const getFontsStr = (typography: Typography): string =>
  typography?.options?.googleFonts != null
    ? typography.options.googleFonts
        .map(
          font => `${font.name.split(' ').join('+')}:${font.styles.join(',')}`,
        )
        .join('|')
    : '';

/*
 TODO: 
  - [href] be extended with custom domain for self hosted fonts
  - [href] may be compatible with local font assets
  */
const getFontsLink = (
  str: string,
  domain = 'https://fonts.googleapis.com/css?family=',
): string => `<link href="${domain}${str}" rel="stylesheet" type="text/css" />`;

export default injectFonts;
