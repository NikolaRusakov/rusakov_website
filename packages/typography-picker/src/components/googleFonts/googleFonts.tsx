import React from 'react';
import {GoogleFont, TypographyOptions} from '@saltit/typography-picker';

const Font = ({ font }: { font: GoogleFont }) => (
  <div
    style={{
      marginBottom: 7.5,
    }}>
    {font.name} — {font.styles.length} styles
  </div>
);

const GoogleFontsTool: React.FC<{ options: TypographyOptions }> = ({ options }) => (
  <div>
    {options?.googleFonts?.map(font => (
      <Font font={font} />
    ))}
  </div>
);

export default GoogleFontsTool;
