/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import { Global } from '@emotion/core';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import HiddenCheckbox from './hiddenCheckbox';
import Checkbox from './checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('toggle', () => (
    <label sx={{ display: 'flex' }}>
      <Flex sx={{ flexDirection: 'column' }}>
        <span>{'Highlight'}</span>
        <span>{'Detailed'}</span>
      </Flex>
      <Flex>
        <Checkbox />
      </Flex>
    </label>
  ))
  .add('with options', () => (
    <div>
      <label>
        <Global
          styles={{
            '.toggle': {
              boxSizing: 'border-box',
              width: '2px',
            },
            '.toggle-bg': {
              position: 'absolute',
              left: '50%',
              width: '1px',
              boxSizing: 'border-box',
            },
            '.toggle-container': {
              position: 'relative',
              maxWidth: '200px',
            },
            'input[type=checkbox]:checked + div': {
              color: '#f00',
            },
          }}
        />
        <HiddenCheckbox type="checkbox" />
        {/*<input type="checkbox" />*/}
        {/*<CheckboxContainer>*/}
        <Flex className="toggle-container">
          <h2>Overview</h2>
          <div className="toggle-bg" />
          <div
            className="toggle"
            sx={{
              bg: 'primary',
              mx: 1,
            }}
          />
          <h2>Detailed</h2>
          {/*</CheckboxContainer>*/}
        </Flex>
      </label>
    </div>
  ));
