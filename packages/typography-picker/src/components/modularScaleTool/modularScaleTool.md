```typescript jsx
import { useState } from 'react';

const [scale, setScale] = useState(8 / 5);

<ModularScaleTool
  key="scale"
  scaleRatio={scale}
  onChange={newScale => {
    setTimeout(() => setScale(newScale));
  }}
/>;
```
