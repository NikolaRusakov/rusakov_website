// Type definitions for typography 0.16
// Project: https://github.com/KyleAMathews/typography.js
// Definitions by: Boye <https://github.com/boyeborg>
//                 Krzysztof Żuraw <https://github.com/krzysztofzuraw>
//                 Dominic Fallows <https://github.com/dominicfallows>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export interface BaseLine {
  fontSize: string;
  lineHeight: string;
}

export interface VerticalRhythm {
  rhythm: (value: number) => string;
  scale: (value: number) => BaseLine;
  adjustFontSizeTo: (value?: number | string) => object;
  linesForFontSize: (fontSize: number) => number;
  establishBaseline: () => BaseLine;
}

export interface GoogleFont {
  name: string;
  styles: string[];
}

export interface TypographyOptions {
  baseFontSize?: string;
  baseLineHeight?: number;
  scaleRatio?: number;
  googleFonts?: GoogleFont[];
  headerFontFamily?: string[];
  headerLineHeight?: number;
  bodyFontFamily?: string[];
  headerColor?: string;
  bodyColor?: string;
  headerWeight?: number | string;
  bodyWeight?: number | string;
  boldWeight?: number | string;
  blockMarginBottom?: number;
  includeNormalize?: boolean;
  overrideStyles?: (
      VerticalRhythm: VerticalRhythm,
      options: TypographyOptions,
      styles: any
  ) => object;
  overrideThemeStyles?: (
      VerticalRhythm: VerticalRhythm,
      options: TypographyOptions,
      styles: any
  ) => object;
  plugins?: any[];
}

declare class Typography {
  constructor(opts: TypographyOptions);
  options: TypographyOptions;
  createStyles(): string;
  toJSON(): object;
  injectStyles(): void;
  rhythm: VerticalRhythm["rhythm"];
  scale: VerticalRhythm["scale"];
  adjustFontSizeTo: VerticalRhythm["adjustFontSizeTo"];
  linesForFontSize: VerticalRhythm["linesForFontSize"];
  establishBaseline: VerticalRhythm["establishBaseline"];
}


export interface TypographyState {
  theme: number;
  typography: Typography;
  bodyFamily: FontList;
  headerFamily: FontList;
}

export default Typography;


/*
export type GoogleFontsType = { name: string; styles: string[] };
export type VerticalRhythmType = {
  rhythm: (value: number) => string;
  scale: (value: number) => Object;
  adjustFontSizeTo: (value?: number | string) => Object;
};

export type OptionsType = {
  title: string;
  baseFontSize?: string;
  baseLineHeight?: number;
  scaleRatio?: number;
  googleFonts?: GoogleFontsType[];
  headerFontFamily?: string[];
  bodyFontFamily?: string[];
  headerColor?: string;
  bodyColor?: string;
  headerWeight?: number | string;
  bodyWeight?: number | string;
  boldWeight?: number | string;
  blockMarginBottom?: number;
  includeNormalize?: boolean;
  overrideStyles?: (
    verticalRhythm: VerticalRhythmType, // TODO Create flow type for compass-vertical-rhythm and import here.
    options: OptionsType,
    styles: any,
  ) => Object;
  overrideThemeStyles?: (
    verticalRhythm: VerticalRhythmType, // TODO Create flow type for compass-vertical-rhythm and import here.
    options: OptionsType,
    styles: any,
  ) => Object;
  plugins?: any[];
};

*/
export interface FontList {
  category: string;
  family: string;
  weights?: string[];
}
