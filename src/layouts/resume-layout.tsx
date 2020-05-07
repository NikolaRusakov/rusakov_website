/** @jsx jsx */
import {
  jsx,
  Styled,
  ThemeProvider,
  useColorMode,
  useThemeUI,
  Button,
} from 'theme-ui';
// @ts-ignore
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTranslation } from 'react-i18next';
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
  polaris,
  // @ts-ignore
} from '@theme-ui/presets';
import merge from 'deepmerge';

import withI18next from '../i18n/withI18Next';
const presets = {
  default: base,
  light: base,
  dark,
  system,
  funk,
  future,
  roboto,
  deep,
  swiss,
  tosh,
  bootstrap,
  tailwind,
  polaris,
  bulma,
};
// @ts-ignore
import { toTheme } from '@theme-ui/typography';
import typography from 'typography-theme-alton';

typography.baseFontSize = '16px';

const preset = (v: string) => ({
  value: v,
  identity: presets,
  map: (mapping: (str: string) => typeof preset) => mapping(v),
});

// @ts-ignore
const AboutLayout: React.FC = children => {
  const { colorMode } = useThemeUI();
  const [, setMode] = useColorMode();
  const { t } = useTranslation();
  return (
    <ThemeProvider
      theme={merge(presets[colorMode] ?? presets[0], {
        ...toTheme(typography),
        fonts: {
          ...toTheme(typography).fonts,
          body: 'JetBrains Mono, normal',
        },
      })}>
      <Button
        sx={{ height: '2em' }}
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

          //TODO only set new Theme Color which is patched with preset color styles on init.
          setMode(newThemeColor);
        }}>
        <span sx={{ p: 1 }}>{colorMode}</span>
      </Button>
      <Styled.root
        sx={{
          width: ['100vw', '80vw', '66.7vw'],
          margin: '3rem auto',
          '* h1': {
            textAlign: 'center',
          },
        }}>
        {children.pageContext.children ? (
          <MDXRenderer>{children.pageContext.children}</MDXRenderer>
        ) : (
          children.children
        )}
      </Styled.root>
    </ThemeProvider>
  );
};

export default withI18next()(AboutLayout);
