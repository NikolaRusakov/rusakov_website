// require("prismjs/themes/prism-solarizedlight.css")
// require('prismjs/plugins/command-line/prism-command-line.css');
// require("prismjs/plugins/line-numbers/prism-line-numbers.css")
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from "prism-react-renderer/prism";
import theme from "prism-react-renderer/themes/nightOwl";

(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-kotlin");
require("prismjs/components/prism-csharp");
