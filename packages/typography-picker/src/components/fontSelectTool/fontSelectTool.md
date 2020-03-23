```typescript jsx
import { useState } from 'react';
import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
import { TypographyStyle, GoogleFont } from 'react-typography';

const typography = new Typography(altonTheme);
const [typo, setTypo] = useState(typography);
console.log(typo.options.bodyFontFamily);

<html>
  <head>
    <TypographyStyle typography={typo} />
    <GoogleFont typography={typo} />
  </head>
{/*{typo.toString()}*/}
  <body>
    <FontSelectTool
      type="body"
      options={typo.options}
      onSelectChange={(options, headerFamily) => {
          setTypo({ ...typography, options: options });
        console.log(typo);
      }}
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
