import { readableColor } from 'polished';

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
      position: 'relative',
      '&:after': {
        position: 'absolute',
        top: '-15px',
        left: '-15px',
        right: '-15px',
        bottom: '-15px',
        boxShadow: theme =>
          `0 0 3px 0 grey inset, 0 0 3px 0 ${theme.colors.primary}`,
      },
      bg: theme =>
        theme.colors.highlight || theme.colors.accent || theme.colors.muted,
      // boxShadow: theme =>
      //   `0 0 3px 0 grey inset, 0 0 3px 0 ${theme.colors.primary}`,
    },
    muted: {
      color: theme => theme.colors.text,
      fontSize: theme => `calc(${theme.fontSizes[0]}px * 0.9)`,
      bg: 'primary',
      fontWeight: 'normal',
      height: 'min-content',
      border: theme => `1px solid ${theme.colors.secondary}`,
      boxShadow: theme => `0 0 1px 0 ${theme.colors.secondary}`,
    },
    highlight: {
      color: 'background',
      bg: 'text',
      fontSize: theme => `calc(${theme.fontSizes[0]}px * 0.9)`,
      background: 'transparent',
      fontWeight: 'normal',
      height: 'min-content',
      border: theme => `1px solid ${theme.colors.secondary}`,
      boxShadow: theme => `0 0 3px 0 ${theme.colors.secondary}`,
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
  // useCustomProperties: true,
  // initialColorModeName: 'light',
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
      borderRadius: 2,
      border: theme => `2px solid ${theme.colors.primary}`,
      // boxShadow: '0 0 4px 1px rgba(0, 0, 0, 0.5)',
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
      m: '0px',
      width: '100vw',
      transitionProperty: 'background-color, color',
      '&::-webkit-scrollbar': {
        width: '0.8rem',
        height: '0.5em',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme =>
          `linear-gradient(180deg,${theme.colors.primary},${theme.colors.secondary})`,
        borderRadius: '999px',
        boxShadow:
          'inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25)',
      },
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
      margin: '0 !important',
    },
    tr: {
      color: 'text',
    },
    thead: {
      textAlign: 'center',
    },
    th: {
      bg: 'text',
      color: 'background',

      '&:first-child': {
        textAlign: 'center',
      },
    },
    td: {
      '&:first-child': {
        textAlign: 'center',
      },
    },
    li: {
      listStylePosition: 'inside',
    },
    navlink: {
      textAlign: 'left',
      fontStyle: 'italic',
      borderBottomStyle: 'solid',
    },
  },
};

export default theme;
