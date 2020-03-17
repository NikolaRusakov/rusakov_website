/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import { jsx, Button, Select, Flex } from 'theme-ui';

import React, { useState } from 'react';

import Highlight, { defaultProps } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/duotoneDark';
import dracula from 'prism-react-renderer/themes/dracula';
import duotoneDark from 'prism-react-renderer/themes/duotoneDark';
import duotoneLight from 'prism-react-renderer/themes/duotoneLight';
import github from 'prism-react-renderer/themes/github';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import nightOwlLight from 'prism-react-renderer/themes/nightOwlLight';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';
import palenight from 'prism-react-renderer/themes/palenight';
import shadesOfPurple from 'prism-react-renderer/themes/shadesOfPurple';
import ultramin from 'prism-react-renderer/themes/ultramin';
import vsDark from 'prism-react-renderer/themes/vsDark';

import styled from '@emotion/styled';
import Prism from 'prism-react-renderer/prism';
import dockerLang from 'refractor/lang/docker';
import rLang from 'refractor/lang/r';
import dartLang from 'refractor/lang/dart';

dockerLang(Prism);
rLang(Prism);
dartLang(Prism);

function getLineNoWidth(code) {
  return (
    0.5 + // Start with a base value
    code
      .split(/\r\n|\r|\n/) // Split by newlines
      .length // Get number of lines
      .toString().length * // Get number of digits
      // Reduce by 30%
      0.7
  );
}

const aliases = {
  js: 'javascript',
  sh: 'bash',
};

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
`;

const toggler = {
  dracula,
  duotoneDark,
  duotoneLight,
  github,
  nightOwl,
  nightOwlLight,
  oceanicNext,
  palenight,
  shadesOfPurple,
  ultramin,
  vsDark,
};

export default ({ children, className }) => {
  const [language] = className.replace(/language-/, '').split(' ');
  const lang = aliases[language] || language;
  const [themeStyle, changeTheme] = useState(dracula);

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={lang}
      theme={themeStyle}
      Prism={Prism}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          <Flex style={{ justifyContent: 'flex-end' }}>
            <Select
              my={2}
              mx={2}
              defaultValue={{ themeStyle }}
              onChange={e => {
                changeTheme(toggler[e.target.value]);
              }}>
              <option>dracula</option>
              <option>duotoneDark</option>
              <option>duotoneLight</option>
              <option>github</option>
              <option>nightOwl</option>
              <option>nightOwlLight</option>
              <option>oceanicNext</option>
              <option>palenight</option>
              <option>shadesOfPurple</option>
              <option>ultramin</option>
              <option>vsDark</option>
            </Select>
          </Flex>

          {tokens.map((line, i) => {
            // Remove the last empty line:
            let lineNumberElem;
            if (
              line.length === 1 &&
              line[0].empty === true &&
              i === tokens.length - 1
            ) {
              lineNumberElem = null;
            } else {
              lineNumberElem = <LineNo>{i + 1}</LineNo>;
            }

            return (
              <div key={i} {...getLineProps({ line, key: i })}>
                {lineNumberElem}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </Pre>
      )}
    </Highlight>
  );
};
