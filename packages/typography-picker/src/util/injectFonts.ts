// TODO: make it SSR friendly and handle errors gracefully + add typings
//@ts-ignore
function injectFonts(typography) {
  const fontsStr = getFontsStr(typography);
  if (fontsStr) {
    const link = getFontsLink(fontsStr);
    injectLink(link);
  } else {
  }
}
//@ts-ignore
function injectLink(link) {
  const typoElt = document.getElementById('typography.js');
  if (typoElt) {
    typoElt.insertAdjacentHTML('afterend', link);
  } else {
  }
}
//@ts-ignore
function getFontsStr(typography) {
  let fontsStr = '';
  if (typography.options.googleFonts) {
//@ts-ignore
    const fonts = typography.options.googleFonts.map(font => {
      let str = '';
      str += font.name.split(' ').join('+');
      str += ':';
      str += font.styles.join(',');

      return str;
    });

    fontsStr = fonts.join('|');
  }
  return fontsStr;
}
//@ts-ignore
function getFontsLink(str) {
  /*
  TODO: 
   - [href] be extended with custom domain for self hosted fonts
   - [href] may be compatible with local font assets
   */
  return `<link href="http://fonts.googleapis.com/css?family=${str}" rel="stylesheet" type="text/css" />`;
}

export default injectFonts;
