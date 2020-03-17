import React from 'react';
// import ThemeUIPrism from '@theme-ui/prism';
// import PrismCore from 'prismjs/components/prism-core';
import Codeblock from './codeblock';

export default {
  pre: props => props.children,
  code: Codeblock /*{
    // return <ThemeUIPrism {...props} Prism={PrismCore} copy={true}/>;
  },*/,
};
