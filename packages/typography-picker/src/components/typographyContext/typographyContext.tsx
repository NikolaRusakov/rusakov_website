import React from 'react';
// @ts-ignore
import altonTheme from 'typography-theme-alton';
import Typography from '../../../index';

const {
  Provider: TypographyProvider,
  Consumer: TypographyConsumer,
} = React.createContext<{ theme: Typography; injectFont: () => void }>({
  theme: altonTheme,
  injectFont: () => undefined,
});

export default { TypographyConsumer, TypographyProvider };
