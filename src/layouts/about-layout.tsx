/** @jsx jsx */
import { jsx, useColorMode, Checkbox } from 'theme-ui';
import { ThemeProvider, Styled } from 'theme-ui';

import theme from '../gatsby-plugin-theme-ui/index';

// @ts-ignore
const AboutLayout = ({ children }) => {
  const [mode, setMode] = useColorMode();

  return (
    <ThemeProvider theme={theme}>
      <label>
        {mode}
        <Checkbox
          onClick={() => {
            const next = mode === 'dark' ? 'light' : 'dark';
            setMode(next);
          }}
        />
      </label>
      <Styled.root>{children}</Styled.root>
    </ThemeProvider>
  );
};

export default AboutLayout;
