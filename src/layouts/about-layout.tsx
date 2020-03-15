import React from 'react';
import { Message, ThemeProvider } from 'theme-ui';
import ThemeUIPrism from '@theme-ui/prism';
import PrismCore from 'prismjs/components/prism-core';
import theme from '../theme';

const components = {
  Message,
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
};

// @ts-ignore
export default ({ children }) => (
  <ThemeProvider theme={theme} components={components}>
    {children}
  </ThemeProvider>
);
