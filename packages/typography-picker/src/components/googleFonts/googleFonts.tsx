import React from 'react';
import { OptionsType, GoogleFontsType } from '../..';

const Font = ({ font }: { font: GoogleFontsType }) => (
  <div
    style={{
      marginBottom: 7.5,
    }}>
    {font.name} — {font.styles.length} styles
  </div>
);

const GoogleFontsTool: React.FC<{ options: OptionsType }> = ({ options }) => (
  <div>
    {options?.googleFonts?.map(font => (
      <Font font={font} />
    ))}
  </div>
);

export default GoogleFontsTool;
