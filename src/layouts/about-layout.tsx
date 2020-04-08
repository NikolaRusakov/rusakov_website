/** @jsx jsx */
import {
  Checkbox,
  jsx,
  Styled,
  ThemeProvider,
  useColorMode,
  useThemeUI,
  Flex,
  Button,
} from 'theme-ui';
// @ts-ignore
import { toTheme } from '@theme-ui/typography';

import { Helmet } from 'react-helmet';
import defaultTheme from '../gatsby-plugin-theme-ui/index';
import altonTheme from 'typography-theme-alton';
import { useMemo, useState } from 'react';
import Typography from 'typography';
import merge from 'deepmerge';
import {
  DesignTool,
  injectFonts,
  themes,
} from '@saltit/typography-picker/dist';
import React from 'react';
import {
  base,
  system,
  funk,
  future,
  roboto,
  dark,
  deep,
  swiss,
  tosh,
  bootstrap,
  bulma,
  tailwind,
  // @ts-ignore
} from '@theme-ui/presets';

const presets = {
  light: defaultTheme,
  base,
  system,
  funk,
  future,
  roboto,
  dark,
  deep,
  swiss,
  tosh,
  bootstrap,
  bulma,
  tailwind,
};

const preset = (v: string) => ({
  value: v,
  identity: presets,
  map: (mapping: (str: string) => typeof preset) => mapping(v),
});

const AboutLayout: React.FC = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const [typography, setTypography] = useState<Typography>(
    new Typography(altonTheme),
  );
  const { theme: themeSet, colorMode } = useThemeUI();
  const [theme, setTheme] = useState(defaultTheme);

  const injectRecentFont = useMemo(() => injectFonts(typography), [
    typography?.options?.headerFontFamily,
    typography?.options?.bodyFontFamily,
  ]);
  //TODO patch with all preset colors inside *modes* theme member
  const typographyToTheme = toTheme(typography.options);

  return (
    <div>
      <Helmet defer={false}>
        {/*<meta charset="utf-8" />*/}
        <title>Rusakov Website</title>
        <link rel="canonical" href="http://rusakov.website/" />
        <style id="typography.js">{typography.toString()}</style>
        {injectRecentFont}
      </Helmet>
      <ThemeProvider theme={merge(typographyToTheme, theme)}>
        <Flex sx={{ position: 'sticky', top: 0 }}>
          <label>
            <Checkbox
              onClick={() => {
                const next = mode === 'dark' ? 'light' : 'dark';
                setMode(next);
              }}
            />
            {mode}
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

              setTypography(
                new Typography({
                  ...changes,
                  bodyColor,
                  headerColor: bodyColor,
                }),
              );
            }}
          />
          <Button
            onClick={() => {
              const keyPresets = Object.keys(presets);
              const colorModeIndex =
                keyPresets.indexOf(colorMode) >= 0
                  ? keyPresets.indexOf(colorMode) + 1
                  : 0;
              const newThemeColor =
                keyPresets[
                  colorModeIndex == keyPresets.length ? 0 : colorModeIndex
                ];

              setTheme(presets[newThemeColor]);
              //TODO only set new Theme Color which is patched with preset color styles on init.
              setMode(newThemeColor);
            }}>
            {colorMode}
          </Button>
        </Flex>
        <Styled.root>{children}</Styled.root>
      </ThemeProvider>
    </div>
  );
};

export default AboutLayout;
