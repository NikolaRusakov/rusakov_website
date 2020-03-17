import { setHue, saturate } from 'polished';

const heading = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
};

export const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    '0.75rem',
    '0.875rem',
    '1rem',
    '1.25rem',
    '1.5rem',
    '2rem',
    '3rem',
    '4rem',
    '6rem',
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  radii: [2, 4, 8, 16, 32],
  transitionProperty: {
    default: 'transition 0.25ms',
  },
  colors: {
    text: '#292929',
    background: '#00b0f0',
    primary: '#00b0f0',
    secondary: '#008BBE',
    accent: '#006d95',
    muted: '#E6E6E6',
    highlight: setHue(200, '#00b0f0'),
    darken: saturate(100, '#006d95'),
    // highlight: '#65D6FF',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
        secondary: '#09c',
        muted: '#111',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    // code: {
    //   // ...dracula,
    //   ...nightOwl,
    // },
    // code: {
    //   ...nightOwl,
    //   dracula,
    //   duotoneDark,
    //   duotoneLight,
    //   github,
    //   nightOwlLight,
    //   oceanicNext,
    //   prism,
    //   prismCoy,
    //   prismDark,
    //   prismFunky,
    //   prismOkaidia,
    //   prismSolarizedlight,
    //   prismTomorrow,
    //   prismTwilight,
    //   shadesOfPurple,
    //   ultramin,
    //   vsDark,
    //   // ...nightOwl,
    // },
    /*    prism: {
          [[
            '.comment',
            '.prolog',
            '.doctype',
            '.cdata',
            '.punctuation',
            '.operator',
            '.entity',
            '.url',
          ]]: {
            color: 'gray',
          },
          '.comment': {
            fontStyle: 'italic',
          },
          [[
            '.property',
            '.tag',
            '.boolean',
            '.number',
            '.constant',
            '.symbol',
            '.deleted',
            '.function',
            '.class-name',
            '.regex',
            '.important',
            '.variable',
          ]]: {
            color: 'purple',
          },
          [['.atrule', '.attr-value', '.keyword']]: {
            color: 'primary',
          },
          [[
            '.selector',
            '.attr-name',
            '.string',
            '.char',
            '.builtin',
            '.inserted',
          ]]: {
            color: 'secondary',
          },
        },*/
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    navlink: {
      textAlign: 'left',
      fontStyle: 'italic',
      borderBottomStyle: 'solid',
    },
  }
};

export default theme;
