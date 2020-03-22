import React from 'react';
import { parseUnit } from '../../util/parseUnit';
import { OptionsType, GoogleFontsType } from '../..';
import { contramap, getMonoid, ordNumber } from 'fp-ts/lib/Ord';
import { sort } from 'fp-ts/lib/Array';
import { fold } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';
import Select from '../select/select';

interface FontWeightToolsProps {
  type: 'header' | 'body' | 'bold';
  family: { category: string; family: string; weights: string[] };
  weight: Pick<OptionsType, 'headerWeight' | 'bodyWeight' | 'boldWeight'>;
  options: OptionsType;
  onChange: (options: OptionsType) => void;
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
  weights: string[];
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
  weights: string[];
  weight: Pick<OptionsType, 'headerWeight' | 'bodyWeight' | 'boldWeight'>;
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
  const newOptions: OptionsType = {
    ...props.options,
    ...(props.type && {
      [`${props.type}Weight`]: isNaN(+newWeight) ? newWeight : +newWeight,
    }),
  };

  const googleFont: GoogleFontsType = newOptions.googleFonts?.find(
    font => font.name === props.family.family,
  ) || { name: '', styles: [] };

  const newGoogleFonts = [
    ...googleFont?.styles,
    newWeight,
    ...(props.type === 'body' || props.type === 'bold'
      ? [`${newWeight}i`]
      : []),
  ].filter(style => parseUnit(style)[0].toString() !== props.weight.toString());

  props.onChange({
    ...newOptions,
    googleFonts: [
      ...newOptions?.googleFonts?.filter(font => font.name !== googleFont.name),
      { ...googleFont, styles: [...new Set(newGoogleFonts)] },
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
