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
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTranslation } from 'react-i18next';

import { Helmet } from 'react-helmet';
import usStandardsTheme from 'typography-theme-us-web-design-standards';
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
  polaris,
  // @ts-ignore
} from '@theme-ui/presets';
import withI18next from '../i18n/withI18Next';
import { Link } from 'gatsby';
import i18next from 'i18next';
import { TypographyOptions } from '@saltit/typography-picker';
// @ts-ignore
import { ReactComponent as CloseIcon } from '../../static/svg/close.svg';

const presets = {
  light: bulma,
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
  dark,
  tailwind,
  polaris,
};

const preset = (v: string) => ({
  value: v,
  identity: presets,
  map: (mapping: (str: string) => typeof preset) => mapping(v),
});

// @ts-ignore
const AboutLayout: React.FC = children => {
  const { theme: themeSet, colorMode } = useThemeUI();
  const [mode, setMode] = useColorMode();
  let usStandards: TypographyOptions = usStandardsTheme;
  usStandards.baseFontSize = '16px';

  const { t } = useTranslation();
  const typographyNaming = i18next.getResourceBundle(
    i18next.language,
    'typography',
  );

  const bodyColor =
    colorMode === 'default' || colorMode === 'light'
      ? themeSet.colors?.text
      : themeSet.colors?.modes?.[colorMode]?.text;

  const [typography, setTypography] = useState<Typography>(
    new Typography({ ...usStandards, bodyColor, headerColor: bodyColor }),
  );

  const typographyToTheme = toTheme(typography.options);

  const provideTypography = {
    ...typographyToTheme,
    bodyColor,
    headerColor: bodyColor,
  };

  const injectRecentFont = useMemo(() => injectFonts(typography), [
    typography?.options?.headerFontFamily,
    typography?.options?.bodyFontFamily,
  ]);

  //TODO solution to overriding typography with color modes
  return (
    <ThemeProvider
      theme={merge(
        provideTypography,
        merge(
          {
            // useColorSchemeMediaQuery: true,
            ...presets[colorMode],
          },
          provideTypography,
        ),
      )}>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Rusakov Website</title>
          {i18next.languages.map(locale => {
            <link
              rel="alternate"
              href="https://rusakov-website.rusakov.now.sh/{locale}"
              hrefLang={locale}
              key={locale}
            />;
            <meta name="theme-color" content={themeSet?.colors?.primary} />;
            // <link rel="alternate" href="http://rusakov.website/{locale}" hrefLang={locale} key={locale}/>
          })}
          i18next
          <link
            rel="canonical"
            href="https://rusakov-website.rusakov.now.sh/"
          />
          <style id="typography.js">{typography.toString()}</style>
          {injectRecentFont}
        </Helmet>
        <nav
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2002,
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
          }}>
          <Flex css={{ flexDirection: 'row', alignItems: 'center' }}>
            <label>
              <Checkbox
                onClick={() => {
                  const next = mode === 'dark' ? 'light' : 'dark';
                  setMode(next);
                }}
              />
              {mode}
            </label>
            <Flex css={{ flexDirection: 'column' }}>
              <span>{t('typography:show typography toolbox')}</span>
              <DesignTool
                // @ts-ignore
                theme={{
                  defaultTheme: usStandards,
                  themeName: 'typography-theme-us-web-design-standards',
                }}
                themeNames={themes.map(({ name }) => name)}
                themes={[...themes]}
                trigger={mode}
                naming={typographyNaming}
                // @ts-ignore
                closeIcon={() => (
                  <CloseIcon width={24} height={24} viewBox="0 0 48 48" />
                )}
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
            </Flex>
          </Flex>
          <Flex css={{ flexDirection: 'column' }}>
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

                //TODO only set new Theme Color which is patched with preset color styles on init.
                setMode(newThemeColor);
              }}>
              {colorMode}
            </Button>
            <article
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <div>
                {children.pageContext.paths?.map(
                  ({ locale, templateKey }, index, array) => (
                    <React.Fragment>
                      <Link
                        key={`${locale}-${templateKey}`}
                        to={`/${locale}/${templateKey}`}
                        hrefLang={locale}>
                        {t(`${locale}`)}
                      </Link>
                      {index < array.length - 1 && '|'}
                    </React.Fragment>
                  ),
                )}
              </div>
            </article>
          </Flex>
        </nav>
        <Styled.root>
          {children.pageContext.children ? (
            <MDXRenderer>{children.pageContext.children}</MDXRenderer>
          ) : (
            children.children
          )}
        </Styled.root>
      </div>
    </ThemeProvider>
  );
};

export default withI18next()(AboutLayout);
