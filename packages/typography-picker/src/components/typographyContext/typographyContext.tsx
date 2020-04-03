import React from 'react';
import altonTheme from 'typography-theme-alton';
import Typography from 'typography';

export const {
  Provider: TypographyProvider,
  Consumer: TypographyConsumer,
} = React.createContext<{ theme: Typography; injectFont: () => void }>({
  theme: altonTheme,
  injectFont: () => undefined,
});
