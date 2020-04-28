/** @jsx jsx */
import { jsx } from '@emotion/core';
import { cx, css as cssFn } from 'emotion';

import React, { useEffect, useState } from 'react';
import fontList from '../../fontList.json';
import Autosuggest from 'react-autosuggest';
import { TypographyOptions, FontList } from '@saltit/typography-picker';
import { readableColor } from 'polished';
import { useTheme } from 'emotion-theming';

// fixme can be extended/improved with custom / self-hosted fonts
const googleFontFamilies = fontList.map(({ family }) => family);

// @ts-ignore
const universalHighlight = theme =>
  // @ts-ignore
  theme.colors.highlight || theme.colors.accent || theme.colors.muted;

export interface FontSelectToolProps {
  type: 'header' | 'body';
  options: TypographyOptions;
  onSelectChange: (
    options: TypographyOptions,
    family: { category: string; family: string; weights: string[] },
  ) => void;
}

const options: { name: string }[] = fontList.map(font => ({
  name: font.family,
}));

const pickBoldStyle = (name: string) => (
  fontList: FontList[],
): number | undefined => {
  const family = fontList.find(({ family }) => family === name);

  let weights = family?.weights
    ?.map(weight => (weight === 'regular' ? 400 : parseInt(weight, 10)))
    .sort()
    .filter(weight => Number.isFinite(weight));
  return weights?.includes(700) ? 700 : weights?.slice(-1)[0];
};

const getSuggestions = (value: string) => (
  opts: { name: string }[],
): { name: string }[] => {
  const inputValue = value.trim().toLowerCase();
  return inputValue === ''
    ? opts
    : inputValue.length === 0
    ? []
    : opts.filter(option => option.name.toLowerCase().includes(inputValue));
};

function getSuggestionValue({ name }: { name: string }) {
  return name;
}

function renderSuggestion({ name }: { name: string }) {
  return (
    <span
      css={theme => ({
        // @ts-ignore
        margin: `0 ${theme.space[1]}px`,
      })}>
      {name}
    </span>
  );
}

const FontSelectTool: React.FC<FontSelectToolProps> = ({
  type,
  options: opts,
  onSelectChange,
}) => {
  const useCustomTheme = useTheme();

  const selectValue = (type: 'header' | 'body'): string | undefined =>
    type === 'header' ? opts?.headerFontFamily?.[0] : opts?.bodyFontFamily?.[0];

  const [select, setSelect] = useState<{
    value: string;
    suggestions: { name: string }[];
  }>({
    value: selectValue(type) ?? fontList[0].family,
    suggestions: getSuggestions(type)(options),
  });

  const onSuggestionsUpdateRequested = ({ value }: { value: string }) => {
    setSelect({
      value: value,
      suggestions: getSuggestions(value)(options),
    });
  };

  useEffect(() => {
    setSelect({
      value:
        (type === 'body'
          ? opts.bodyFontFamily?.[0]
          : opts.headerFontFamily?.[0]) ?? select.value,
      suggestions: select.suggestions,
    });
  }, [opts.bodyFontFamily, opts.headerFontFamily]);

  const onChange = (
    event: React.FormEvent<any>,
    { newValue: value }: Autosuggest.ChangeEvent,
  ) => {
    setSelect({
      value,
      suggestions: select.suggestions,
    });
    fontChangeOnExisting(value, googleFontFamilies);
  };

  const fontChangeOnExisting = (family: string, fontFamilies: string[]) =>
    fontFamilies.includes(family) && selectFamilyChange(family);

  const selectFamilyChange = (value: string): void => {
    const family = fontList.find(font => font.family === value) || fontList[0];
    const boldStyle = (pickBoldStyle(value)(fontList) || 400).toString();

    const newOpts: TypographyOptions = {
      ...opts,
      ...(family &&
        type === 'header' && {
          headerFontFamily: [value, family?.category],
          headerWeight: boldStyle,
          googleFonts: [
            ...opts.googleFonts,
            {
              name: value,
              styles: [boldStyle],
            },
          ].filter(font => font.name !== opts?.headerFontFamily?.[0]),
        }),
      ...(family &&
        type === 'body' && {
          bodyFontFamily: [value, family?.category],
          bodyWeight: 400,
          boldWeight: boldStyle,
          googleFonts: [
            ...opts.googleFonts,
            {
              name: value,
              styles: ['400', '400i', boldStyle, `${boldStyle}i`],
            },
          ].filter(font => font.name !== opts?.bodyFontFamily?.[0]),
        }),
    };
    return onSelectChange(newOpts, family);
  };

  const inputProps = {
    // placeholder: 'Type font family',
    value: select.value,
    onChange: (
      value: React.FormEvent<any>,
      changeEvt: Autosuggest.ChangeEvent,
    ) => onChange(value, changeEvt),
  };

  return (
    <Autosuggest
      shouldRenderSuggestions={() => true}
      suggestions={select.suggestions}
      onSuggestionsFetchRequested={onSuggestionsUpdateRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(_, { suggestionValue }) =>
        selectFamilyChange(suggestionValue)
      }
      inputProps={inputProps}
      theme={{
        input: cx(
          'react-autosuggest__input',
          cssFn({
            fontSize: '14px',
            // @ts-ignore
            border: `1px solid ${useCustomTheme.colors.primary}`,
          }),
        ),
        suggestionsList: cx(
          'react-autosuggest__suggestions-list',
          cssFn({
            // @ts-ignore
            margin: `0 ${useCustomTheme.space[1]}px`,
          }),
        ),
        suggestionsContainer: cx(
          'react-autosuggest__suggestions-container',
          cssFn({
            // @ts-ignore
            background: useCustomTheme.colors.primary,
            // border: '1px solid',
            boxShadow: `0 0 3px ${universalHighlight(useCustomTheme)} inset`,
            // @ts-ignore
            borderColor: useCustomTheme.colors.background,
            borderRadius: 3,
            // @ts-ignore
            color: readableColor(useCustomTheme.colors.text),
            // @ts-ignore
            fontSize: useCustomTheme.fontSizes[0],
            // @ts-ignore
            margin: useCustomTheme.space[1],
            listStyle: 'none',
            position: 'absolute',
            zIndex: 1001,
            overflow: 'hidden',
            overflowY: 'scroll',
            maxHeight: '25vh',
            width: 'calc(100% - 7.5px)',
            left: 0,
          }),
        ),
        suggestion: cx(
          'react-autosuggest__suggestion',
          cssFn({
            // @ts-ignore
            color: readableColor(useCustomTheme.colors.text),
            // @ts-ignore
            padding: useCustomTheme.space[1],
            margin: 0,
          }),
        ),
        suggestionFocused: cx(
          'react-autosuggest__input--focused',
          cssFn({
            background: '#ffc',
            color: '#000',
          }),
        ),
      }}
    />
  );
};
export default FontSelectTool;
