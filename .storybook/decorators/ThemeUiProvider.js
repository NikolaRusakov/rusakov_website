/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import React, { useState, useEffect } from 'react';

import { ThemeProvider } from 'theme-ui';
import theme from '~/theme';
import { Checkbox, Flex } from 'theme-ui';

const TogglePanel = ({ children }) => {
  const [mode, setMode] = useColorMode();
  const [showToggableBg, toggleBg] = useState(false);

  return (
    <div>
      <Flex
        sx={{
          position: 'absolute',
          left: 'calc( 100vw - 3rem)',
          flexDirection: 'column',
        }}>
        <label>
          <span>{mode}</span>
          <Checkbox
            onClick={() => {
              const next = mode === 'dark' ? 'light' : 'dark';
              setMode(next);
            }}
          />
        </label>

        <br />

        <label>
          bg <br /> {showToggableBg ? 'shown' : 'hidden'}
          <Checkbox
            onClick={e => {
              const body = document.getElementsByClassName('sb-show-main');
              body[0].style.backgroundColor = showToggableBg
                ? null
                : 'transparent';
              toggleBg(!showToggableBg);
            }}
          />
        </label>
      </Flex>
      {children}
    </div>
  );
};

const ThemeUiProvider = storyFn => {
  return (
    <ThemeProvider theme={theme}>
      <TogglePanel children={storyFn()} />
    </ThemeProvider>
  );
};

export default ThemeUiProvider;
