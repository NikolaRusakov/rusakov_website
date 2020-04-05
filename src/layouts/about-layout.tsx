/** @jsx jsx */
import {
  Checkbox,
  jsx,
  Styled,
  ThemeProvider,
  useColorMode,
  useThemeUI,
} from 'theme-ui';
// @ts-ignore
import { toTheme } from '@theme-ui/typography';

import { Helmet } from 'react-helmet';
import theme from '../gatsby-plugin-theme-ui/index';
import altonTheme from 'typography-theme-alton';
import { useMemo, useState } from 'react';
import Typography from 'typography';
import merge from 'deepmerge';
import {
  DesignTool,
  injectFonts,
  themes,
} from '@saltit/typography-picker/dist';

const AboutLayout: React.FC = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const [curTheme, setTheme] = useState<Typography>(new Typography(altonTheme));
  const { theme: themeSet, colorMode } = useThemeUI();

  const injectRecentFont = useMemo(() => injectFonts(curTheme), [
    curTheme?.options?.headerFontFamily,
    curTheme?.options?.bodyFontFamily,
  ]);
  const typographyToTheme = toTheme(curTheme.options);
  return (
    <div>
      <Helmet defer={false}>
        {/*<meta charset="utf-8" />*/}
        <title>Rusakov Website</title>
        <link rel="canonical" href="http://rusakov.website/" />
        <style id="typography.js">{curTheme.toString()}</style>
        {injectRecentFont}
      </Helmet>
      <ThemeProvider theme={merge(typographyToTheme, theme)}>
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
          defaultTheme={altonTheme}
          themeNames={themes.map(({ name }) => name)}
          themes={[...themes]}
          trigger={mode}
          onChange={changes => {
            const bodyColor =
              colorMode === 'default' || colorMode === 'light'
                ? themeSet.colors?.text
                : themeSet.colors?.modes?.[colorMode]?.text;

            setTheme(
              new Typography({ ...changes, bodyColor, headerColor: bodyColor }),
            );
          }}
        />
        <Styled.root>{children}</Styled.root>
      </ThemeProvider>
    </div>
  );
};

export default AboutLayout;
