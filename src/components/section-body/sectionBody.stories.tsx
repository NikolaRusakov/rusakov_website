/** @jsx jsx */
import { jsx, Badge } from 'theme-ui';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { SectionBody } from './index';

storiesOf('Section Body', module)
  .addDecorator(withKnobs)
  .add('Body with tags', () => (
    <SectionBody>
      {{
        duration: '1 yr 3 mos',
        employment: 'Full-time',
        location: 'Location Brno',
        projects: [
          { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
          { name: 'Hart Van Nederland', abbr: 'HVN', slug: 'hartVanNederland' },
        ].map(({ slug, abbr }) => (
          <Badge variant="outline" py={0} m={0}>
            {abbr}
          </Badge>
        )),
        tags: new Array(10)
          .fill({
            name: 'Typescript',
            abbr: 'TS',
            slug: 'typescript',
          })
          .map(({ slug }, index) => (
            <Badge key={`tag-${slug}-${+index}`} variant="outline" py={0} m={0}>
              <code>{slug}</code>
            </Badge>
          )),
      }}
    </SectionBody>
  ));
