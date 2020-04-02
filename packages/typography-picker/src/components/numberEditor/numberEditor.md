```typescript jsx
import { parseUnit } from '../../util/parseUnit';
import { useState } from 'react';

const [font, setFont] = useState('16px');
<>
  <NumberEditor
    unit="px"
    value={parseUnit(font)[0]}
    min={9}
    max={100}
    step={0.25}
    onValueChange={value => {
      setTimeout(() => {
        setFont(`${value}px`);
      });
    }}
  />
  <br />
  <span>Unit: {parseUnit(font)[1]}</span>
</>;
```
