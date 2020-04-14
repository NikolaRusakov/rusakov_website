import { setHue, saturate, transparentize } from 'polished';

import {
  dark,
  base,
  system,
  funk,
  future,
  roboto,
  deep,
  swiss,
  tosh,
  bootstrap,
  bulma,
  tailwind,
  // @ts-ignore
} from '@theme-ui/presets';

const heading = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
};

export const theme = {
  // useBodyStyles: true,
  breakpoints: ['40em', '52em', '64em'],
  space: [2, 4, 8, 16, 32, 64, 128, 256, 512],
  badges: {
    primary: {
      color: 'background',
      bg: 'text',
    },
    outline: {
      color: 'background',
      bg: 'accent',
      boxShadow: theme =>
        `0 0 3px 0 grey inset, 0 0 3px 0 ${theme.colors.primary}`,
    },
  },
  // fonts: {
  //   body: 'inherit',
  //   heading: 'inherit',
  //   monospace: 'inherit',
  // },
  // fonts: {
  //   body: 'system-ui, sans-serif',
  //   heading: 'inherit',
  //   monospace: 'Menlo, monospace',
  // },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  // fontSizes: [
  //   '0.75rem',
  //   '0.875rem',
  //   '1rem',
  //   '1.25rem',
  //   '1.5rem',
  //   '2rem',
  //   '3rem',
  //   '4rem',
  //   '6rem',
  // ],
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
  useCustomProperties: true,
  initialColorMode: 'system',
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    muted: '#f6f6f6',
    highlight: '#efeffe',
    gray: '#777',
    // accent: '#609',
    // text: '#292929',
    // // background: '#f3f3f3',
    // background: '#75a69f',
    // primary: '#00b0f0',
    // secondary: '#008BBE',
    // accent: '#005fd3',
    // muted: '#E6E6E6',
    // highlight: setHue(200, '#00b0f0'),
    // darken: '#69D1F2',
    // invert: '#121212',
    // // highlight: '#65D6FF',
    modes: {
      base: { ...base.colors },
      system: { ...system.colors },
      funk: { ...funk.colors },
      future: { ...future.colors },
      roboto: { ...roboto.colors },
      deep: { ...deep.colors },
      swiss: { ...swiss.colors },
      tosh: { ...tosh.colors },
      bootstrap: { ...bootstrap.colors },
      bulma: { ...bulma.colors },
      tailwind: { ...tailwind.colors },
      dark: { ...dark.colors },
      // dark: {
      //   text: '#fff',
      //   // background: '#0c0c0c',
      //   background: '#121212',
      //   accent: '#eec5ff',
      //   primary: '#0cf',
      //   secondary: '#09c',
      //   muted: 'rgba(0,70,162,0.98)',
      //   darken: '#9fbed0',
      //   invert: '#00b0f0',
      //   // darken: '#dff3ff',
      // },
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.5)',
    },
    secondary: {
      padding: 1,
      borderRadius: 2,
      boxShadow: '0 0 2px 1px rgba(100, 0, 0, 0.2)',
    },
  },
  styles: {
    root: {
      transitionDuration: '0.3s',
      transitionProperty: 'background-color, color',
    },
    hr: {
      color: 'text',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
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
  },
};

export default theme;
