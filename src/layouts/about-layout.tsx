/** @jsx jsx */
import { jsx, useColorMode, Checkbox } from 'theme-ui';
import { ThemeProvider, Styled } from 'theme-ui';
import { Helmet } from 'react-helmet';
import theme from '../gatsby-plugin-theme-ui/index';
import DesignTool from '@saltit/typography-picker/dist/components/designTool/designTool';
// @ts-ignore
import altonTheme from 'typography-theme-alton';
import { useState, useMemo } from 'react';
import Typography from 'typography';
import merge from 'deepmerge';
import injectFonts from '@saltit/typography-picker/dist/util/injectFonts';

const AboutLayout: React.FC = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const [curTheme, setTheme] = useState<Typography>(altonTheme);

  const injectRecentFont = useMemo(() => injectFonts(curTheme), [
    curTheme?.options?.headerFontFamily,
    curTheme?.options?.bodyFontFamily,
  ]);

  return (
    <div>
      <Helmet defer={false}>
        <meta charset="utf-8" />
        <title>Rusakov Website</title>
        <link rel="canonical" href="http://rusakov.website/" />
        <style id="typography.js">{curTheme.toString()}</style>
        {injectRecentFont}
      </Helmet>
      <ThemeProvider theme={merge(curTheme, theme)}>
        <label>
          {mode}
          <Checkbox
            onClick={() => {
              const next = mode === 'dark' ? 'light' : 'dark';
              setMode(next);
            }}
          />
        </label>
        <DesignTool
          defaultTheme={curTheme}
          themeNames={['typography-theme-Wikipedia']}
          themes={[
            {
              name: 'typography-theme-Wikipedia',
              title: 'Wikipedia',
              // @ts-ignore
              requireTheme: () => import('typography-theme-Wikipedia'),
            },
          ]}
          onChange={changes => setTheme(new Typography(changes))}
        />
        <Styled.root>{children}</Styled.root>
      </ThemeProvider>
    </div>
  );
};

export default AboutLayout;
