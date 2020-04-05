/** @jsx jsx */
import { jsx } from 'theme-ui';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { SectionHeader } from './index';

storiesOf('Section Header', module)
  .addDecorator(withKnobs)
  .add('with text', () => (
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
  ));
