/** @jsx jsx */
import { jsx } from 'theme-ui';
import { action } from '@storybook/addon-actions';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import { transparentize } from 'polished';
import { ThemeUiStorybookProvider } from './decorators';

addDecorator(story => (
  <>
    <div
      style={{ padding: '3rem' }}
      sx={{
        transition: theme => theme.transitionProperty.default,
      }}>
      {story()}
    </div>
  </>
));
addDecorator(ThemeUiStorybookProvider);

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
  options: {
    panelPosition: 'right',
  },
  backgrounds: [
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
    { name: 'prototyping', value: '#CCCCCC' },
    { name: 'light prototyping', value: transparentize(0.56, '#E6E6E6') },
  ],
});

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
configure(loadStories, module);
