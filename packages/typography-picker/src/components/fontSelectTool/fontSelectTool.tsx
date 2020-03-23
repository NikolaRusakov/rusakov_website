import React, { useEffect, useState, useLayoutEffect } from 'react';
import fontList from '../../fontList.json';
import { css, StyleSheet } from 'aphrodite';
import Autosuggest from 'react-autosuggest';
import { FontList, OptionsType } from '../..';
import { lighten } from 'polished';

interface FontSelectToolProps {
  type: 'header' | 'body';
  options: OptionsType;
  onSelectChange: (
    options: OptionsType,
    family: { category: string; family: string; weights: string[] },
  ) => void;
}

const styles = StyleSheet.create({
  input: {
    background:
      "url(\"data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='18' height='18' viewBox='0 0 24 24'><path fill='rgb(153, 153, 153)' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>\")",
    backgroundColor: lighten(10, '#AAE'),
    backgroundPosition: '100% 10%',
    backgroundRepeat: 'no-repeat',
    border: '1px solid',
    borderColor: lighten(10, '#FFC'),
    borderRadius: 3,
    color: '#000',
    fontSize: 12,
    width: '100%',
    padding: '2px 8px',
    marginBottom: 3.75,
  },
  suggestionsContainer: {
    background: '#AAE',
    border: '1px solid',
    borderColor: '#FFC',
    borderRadius: 3,
    color: '#000',
    fontSize: 12,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
    overflowY: 'scroll',
    maxHeight: '100px',
    width: '93%',
  },
  suggestion: {
    color: '#000',
    padding: '3.75px 7px',
    margin: 0,
  },
  suggestionFocused: {
    background: '#FFC',
    color: '#000',
  },
});

const options: { name: string }[] = fontList.map(font => ({
  name: font.family,
}));

const pickBoldStyle = (name: string) => (
  fontList: FontList[],
): number | undefined => {
  const family = fontList.find(({ family }) => family === name);

  let weights = family?.weights
    .map(weight => (weight === 'regular' ? 400 : parseInt(weight, 10)))
    .sort()
    .filter(weight => Number.isFinite(weight));
  console.log(weights?.includes(700) ? 700 : weights?.slice(-1)[0]);
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

// @ts-ignore
function getSuggestionValue(suggestion) {
  // when suggestion selected,  function tells
  return suggestion.name; // what should be the value of the input
}

// @ts-ignore
function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

const FontSelectTool: React.FC<FontSelectToolProps> = ({
  type,
  options: opts,
  onSelectChange,
}) => {
  const selectValue = (type: 'header' | 'body'): string | undefined =>
    type === 'header' ? opts?.headerFontFamily?.[0] : opts?.bodyFontFamily?.[0];

  const [select, setSelect] = useState<{
    value: string;
    suggestions: { name: string }[];
  }>({
    value: selectValue(type) || '',
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
      value: select.value,
      suggestions: select.suggestions,
    });
  },[select.value]);

  const onChange = (
    event: React.FormEvent<any>,
    { newValue: value }: Autosuggest.ChangeEvent,
  ) => {
    setSelect({
      value,
      suggestions: select.suggestions,
    });

    const family = fontList.find(font => font.family === value);
    const boldStyle = pickBoldStyle(value)(fontList);

    // @ts-ignore
    const newOpts: OptionsType = {
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
    // @ts-ignore
    return onSelectChange(newOpts, family);
  };

  const inputProps = {
    // placeholder: 'Type font family',
    value: select.value,
    // @ts-ignore
    onChange: (e, ee) => onChange(e, ee),
  };
  return (
    <Autosuggest
      shouldRenderSuggestions={() => true}
      suggestions={select.suggestions}
      // onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
      onSuggestionsFetchRequested={onSuggestionsUpdateRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        input: css(styles.input),
        suggestionsContainer: css(styles.suggestionsContainer),
        suggestion: css(styles.suggestion),
        suggestionFocused: css(styles.suggestionFocused),
      }}
    />
  );
};
export default FontSelectTool;
