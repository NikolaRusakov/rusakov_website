// require("prismjs/themes/prism-solarizedlight.css")
// require('prismjs/plugins/command-line/prism-command-line.css');
// require("prismjs/plugins/line-numbers/prism-line-numbers.css")
import React from 'react';
import Prism from 'prism-react-renderer/prism';

import './src/theme/global.css';
import './src/theme/mono.css';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-csharp');
