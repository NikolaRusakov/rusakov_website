/** @jsx jsx */
import { jsx } from 'theme-ui';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Chip } from './chip';

const DEFAULT_STYLE = 'background: none;';

storiesOf('Chip', module)
  .addDecorator(withKnobs)
  .add('with text', () => (
    <Chip
      onClick={action('clicked')}
      disabled={boolean('Disabled', false)}
      sx={{
        color: 'primary',
        fontFamily: 'heading',
        borderRadius: 4,
        fontSize: [2, 3, 5],
        px: 3,
        py: 2,
        borderWidth: 6,
        borderColor: 'highlight',
        transition: theme => theme.transitionProperty.default,
      }}
      css={text('CSS', DEFAULT_STYLE)}>
      {text('Label', 'Hello Storybook')}
    </Chip>
  ));
