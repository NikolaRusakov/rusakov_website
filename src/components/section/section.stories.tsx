/** @jsx jsx */
import { jsx, Divider, Badge } from 'theme-ui';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Section } from './index';
import { SectionHeader } from '../section-header';
import { SectionBody } from '../section-body';

storiesOf('Section', module)
  .addDecorator(withKnobs)
  .add('with Content', () => (
    <Section variant="primary">
      <SectionHeader
        experience={{
          employedDuration: 'Feb 2019 – Present',
          duration: '1 yr 3 mos',
          company: 'FlowUp',
          employment: 'Full-time',
          companyLogo:
            'https://media-exp1.licdn.com/dms/image/C560BAQE7e-hDDBtsWQ/company-logo_100_100/0?e=1594252800&v=beta&t=-seyyQEA_aICq3KHhwZLMeXgORZU7vcXmvtYVXYRbn8',
          position: 'Frontend Engineer',
          location: 'Location Brno',
        }}
        externalProps={{ badges: ['FE', 'BE', 'Serverless'] }}
      />
      <Divider />
      <SectionBody>
        {{
          duration: '1 yr 3 mos',
          employment: 'Full-time',
          location: 'Location Brno',
          projects: [
            { name: 'Veronica Inside', abbr: 'VI', slug: 'veronicaInside' },
            {
              name: 'Hart Van Nederland',
              abbr: 'HVN',
              slug: 'hartVanNederland',
            },
          ].map(({ slug, abbr }) => (
            <Badge variant="outline" py={1} m={1}>
              {abbr}
            </Badge>
          )),
          tags: new Array(7)
            .fill({
              name: 'Typescript',
              abbr: 'TS',
              slug: 'typescript',
            })
            .map(({ slug }, index) => (
              <Badge
                key={`tag-${slug}-${+index}`}
                variant="outline"
                py={1}
                m={1}>
                <code>{slug}</code>
              </Badge>
            )),
        }}
      </SectionBody>
    </Section>
  ));
