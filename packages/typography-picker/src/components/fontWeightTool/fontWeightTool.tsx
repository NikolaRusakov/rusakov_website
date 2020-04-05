import React from 'react';
import { parseUnit } from '../..';
import { contramap, getMonoid, ordNumber } from 'fp-ts/lib/Ord';
import { sort } from 'fp-ts/lib/Array';
import { fold } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';
import Select from '../select/select';
import { TypographyOptions } from 'typography';
import { FontList, GoogleFont } from '@saltit/typography-picker';

export interface FontWeightToolsProps {
  type: 'header' | 'body' | 'bold';
  family: FontList;
  weight: number | string;
  options: TypographyOptions;
  onChange: (options: TypographyOptions) => void;
  filterOutItalics?: boolean;
}

const WeightMapper: Record<string, string> = {
  regular: '400',
  italic: '400italic',
};

const M = getMonoid<string>();

export const prepareFamilyWeights = ({
  weights = [],
  filterOutItalics = true,
}: {
  weights?: string[];
  filterOutItalics?: boolean;
}): string[] => {
  const newWeights = weights
    .map((weight: string): string => WeightMapper[weight] || weight)
    .filter(weight => !(filterOutItalics && parseUnit(weight)[1] === 'italic'));
  const byNumber = pipe(
    ordNumber,
    contramap((p: string): number => parseUnit(p)[0]),
  );
  const O1 = fold(M)([byNumber]);

  return sort(O1)(newWeights);
};

const pickFamilyWeightValue = ({
  weights = [],
  weight,
  filterOutItalics = true,
}: {
  weights?: string[];
  weight: number | string;
  filterOutItalics?: boolean;
}) =>
  prepareFamilyWeights({ weights, filterOutItalics }).indexOf(
    weight.toString(),
  );

const onChange = (value: string) => (props: FontWeightToolsProps) => {
  const weights = prepareFamilyWeights({
    weights: props.family.weights,
    filterOutItalics: props.filterOutItalics,
  });
  const newWeight = weights[+value];
  const newOptions: TypographyOptions = {
    ...props.options,
    ...(props.type && {
      [`${props.type}Weight`]: isNaN(+newWeight) ? newWeight : +newWeight,
    }),
  };

  const googleFont: GoogleFont = newOptions.googleFonts?.find(
    (font: GoogleFont) => font.name === props.family.family,
  ) || { name: '', styles: [] };

  props.onChange({
    ...newOptions,
    googleFonts: [
      ...newOptions?.googleFonts?.filter(
        (font: GoogleFont) => font.name !== googleFont.name && font.name !== '',
      ),
    ],
  });
};

const FontWeightTool: React.FC<FontWeightToolsProps> = props => (
  <Select
    options={prepareFamilyWeights({
      weights: props.family.weights,
      filterOutItalics: props.filterOutItalics,
    })}
    value={pickFamilyWeightValue({
      weights: props.family.weights,
      weight: props.weight,
      filterOutItalics: props.filterOutItalics,
    })}
    style={{
      width: '100%',
    }}
    onChange={value => onChange(value)(props)}
  />
);

export default FontWeightTool;
