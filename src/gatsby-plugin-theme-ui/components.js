import React from 'react';
// import ThemeUIPrism from '@theme-ui/prism';
// import PrismCore from 'prismjs/components/prism-core';
import Codeblock from './codeblock';
import wrapTypography from 'typography-design-tools';
import githubTheme from 'typography-theme-github';
import Typography from 'typography';

const typography = new Typography(githubTheme);
export default {
  pre: props => props.children,
  DesignTool: wrapTypography(typography),
  code: Codeblock /*{
    // return <ThemeUIPrism {...props} Prism={PrismCore} copy={true}/>;
  },*/,
};
