import React from 'react';
// import ThemeUIPrism from '@theme-ui/prism';
// import PrismCore from 'prismjs/components/prism-core';
import Codeblock from './codeblock';
import wrapTypography from 'typography-design-tools';
import githubTheme from 'typography-theme-github';

export default {
  pre: props => props.children,
  DesignTool: wrapTypography(githubTheme),
  code: Codeblock /*{
    // return <ThemeUIPrism {...props} Prism={PrismCore} copy={true}/>;
  },*/,
};
