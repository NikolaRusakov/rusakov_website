```typescript jsx
import { useState } from 'react';
import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
import { TypographyStyle, GoogleFont } from 'react-typography';

import FontWeightTool from './fontWeightTool';
import fontList from '../../fontList.json';

const typography = new Typography(altonTheme);
const [typo, setTypo] = useState(typography);
const [filterItalics, setFilterItalics] = useState(true);

let bodyFamily = fontList.find(
  font => font.family === typo.options.bodyFontFamily[0],
);

let headerFamily = fontList.find(
  font => font.family === typo.options.headerFontFamily[0],
);

<html>
  <head>
    <TypographyStyle typography={typo} />
    <GoogleFont typography={typo} />
  </head>
  <body>
    <FontWeightTool
      type="body"
      family={bodyFamily}
      weight={typo.options.bodyWeight}
      options={typo.options}
      filterOutItalics={filterItalics}
      onChange={newOptions =>
        setTimeout(() => {
          setTypo({ ...typography, options: newOptions });
        })
      }
    />

    <FontWeightTool
      type="header"
      family={headerFamily}
      weight={typo.options.headerWeight}
      options={typo.options}
      filterOutItalics={filterItalics}
      onChange={newOptions =>
        setTimeout(() => {
          setTypo({ ...typography, options: newOptions });
        })
      }
    />
    <h1>Why Do We Do That?</h1>
    <p>
      Typography is a complex system of interrelated styles. 100s of style
      declarations on dozens of elements must be in harmonious order. Trying one
      design change can mean making dozens of tedious recalculations and CSS
      value changes. Creating new Typography themes with CSS feels hard.
      Typography.js provides a vastly simpler way to define and explore
      typography designs. You provide configuration to the Typography.js JS api
      and it uses its Typography engine to generate CSS for block and inline
      elements. Typography.js makes it easy to create designs that are unique,
      personal, and custom to your project.
    </p>
  </body>
</html>;
```
