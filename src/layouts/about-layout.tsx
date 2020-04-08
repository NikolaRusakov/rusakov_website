/** @jsx jsx */
import {
  Checkbox,
  jsx,
  Styled,
  ThemeProvider,
  useColorMode,
  useThemeUI,
  Flex,
} from 'theme-ui';
// @ts-ignore
import { toTheme } from '@theme-ui/typography';
import { BarChart, RadialAreaChart, RadialAxis } from 'reaviz';

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
import React from 'react';

const AboutLayout: React.FC = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const [curTheme, setTheme] = useState<Typography>(new Typography(altonTheme));
  const { theme: themeSet, colorMode } = useThemeUI();

  const injectRecentFont = useMemo(() => injectFonts(curTheme), [
    curTheme?.options?.headerFontFamily,
    curTheme?.options?.bodyFontFamily,
  ]);

  const categoryData = [
    {
      key: 'Phishing Attack',
      data: 10,
    },
    {
      key: 'IDS',
      data: 14,
    },
    {
      key: 'Malware',
      data: 5,
    },
    {
      key: 'DLP',
      data: 18,
    },
  ];

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

              setTheme(
                new Typography({
                  ...changes,
                  bodyColor,
                  headerColor: bodyColor,
                }),
              );
            }}
          />
        </Flex>
        <BarChart width={350} height={250} data={categoryData} />
        <RadialAreaChart
          data={categoryData}
          height={300}
          width={300}
          axis={<RadialAxis type="category" />}
        />

        <Styled.root>{children}</Styled.root>
      </ThemeProvider>
    </div>
  );
};

export default AboutLayout;
