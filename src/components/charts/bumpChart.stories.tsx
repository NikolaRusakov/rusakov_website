/** @jsx jsx */
import { jsx } from 'theme-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import MyResponsiveAreaBump from "./bumpChart";

storiesOf('Bump Chart', module)
    .addDecorator(withKnobs)
    .add('', () => (<MyResponsiveAreaBump data={} /> ))
