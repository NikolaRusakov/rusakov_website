/** @jsx jsx */
import { Badge, Flex, jsx, Link, Styled, Grid } from 'theme-ui';
import Img from 'gatsby-image/withIEPolyfill';
import React from 'react';
import dayjs from 'dayjs';

import resumeProvider from './resumeProvider';
import { exists, lineClamp } from '../../utils/utils';
import { FluidObject } from 'gatsby-image';
import { Maybe } from '../../../types/gatsby-graphql';
import about from '../../data/local/about.json';
import { ReactComponent as Email } from '../../../static/svg/email.svg';
import { ReactComponent as Mobile } from '../../../static/svg/mobile.svg';
import { ReactComponent as Website } from '../../../static/svg/website.svg';
import { ReactComponent as Marker } from '../../../static/svg/marker.svg';
import relativeTime from 'dayjs/plugin/relativeTime';
import { readableColor } from 'polished';
dayjs.extend(relativeTime);

const diffDaysInYears = (start: Date) => dayjs().from(start, true);

const ContactItem: React.FC<{
  Cmp?: React.ComponentType<any>;
  href?: string;
  content: string;
  icon: JSX.Element;
}> = ({ icon, href, content, Cmp = Styled.div }) => {
  return (
    <Cmp
      sx={{
        my: 1,
        flexDirection: ['column', 'row', 'row'],
        alignItems: ['center', null, null],
        justifyContent: 'flex-start',
        display: 'grid',
        gridTemplateColumns: 'minmax(36px, auto) 1fr',
        width: '100%',
      }}
      {...href}>
      <div sx={{ display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div
        sx={{
          ...lineClamp('2'),
        }}>
        <span sx={{ p: 1 }}>{content}</span>
      </div>
    </Cmp>
  );
};

export interface ResumeHeroProps {
  name?: string;
  experience?: { professional: string; practical: string };
  role?: string;
}

export const ResumeHero: React.FC<ResumeHeroProps> = ({
  name,
  experience,
  role,
}) => {
  const avatar: Maybe<FluidObject> = resumeProvider();

  return (
    <section
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: ['column-reverse', 'row', 'row'],
        position: 'relative',
      }}>
      <address
        sx={{
          display: ['grid', 'flex', 'flex'],
          justifyContent: 'center',
          alignItems: 'center',
          width: ['100%', null, null],
          margin: ['auto', null, 0],
        }}>
        <Grid sx={{gridGap:['0.25rem','0.375rem','1rem']}}>
          {about.basics.phone && (
            <ContactItem
              Cmp={Link}
              href={`tel:${about.basics.phone}`}
              content={about.basics.phone}
              icon={<Mobile sx={{ width: '1.5rem', color: 'primary' }} />}
            />
          )}
          {about.basics.email && (
            <ContactItem
              Cmp={Link}
              href={`mailto:${about.basics.email}`}
              content={about.basics.email}
              icon={<Email sx={{ width: '1.5rem', color: 'primary' }} />}
            />
          )}
          {about.basics.website && (
            <ContactItem
              Cmp={Link}
              href={about.basics.website}
              content={about.basics.website}
              icon={
                <Website
                  sx={{
                    color: 'primary',
                    width: '1.5rem',
                    alignSelf: 'center',
                  }}
                />
              }
            />
          )}
          {about.basics.location.city && (
            <ContactItem
              icon={<Marker sx={{ width: '1rem', color: 'primary' }} />}
              content={`${about.basics.location.city}, ${about.basics.location.region}`}
            />
          )}
        </Grid>
      </address>
      <div
        sx={{
          bg: 'primary',
          minHeight: '100%',
          minWidth: '3px',
          mx: 2,
        }}
      />
      <Flex
        sx={{
          alignItems: 'center',
          my: 3,
          flexDirection: 'column',
          width: ['100%', null, null],
          margin: ['auto', null, null],
        }}>
        {exists(avatar) && (
          <Img
            fluid={avatar}
            alt={about.basics.name}
            objectFit="contain"
            style={{ minWidth: '10em', borderRadius: '50%' }}
          />
        )}
        <h2 sx={{ mb: 2, fontSize: 5, textAlign: 'center' }}>
          {about.basics.name}
        </h2>
        <h3 sx={{ mb: 2 }}>{about.basics.label}</h3>

        <Flex
          sx={{
            py: 1,
            flexDirection: 'row',
            width: ['50%', '100%', '100%'],
            justifyContent: ['space-between', null, 'space-evenly'],
          }}>
          <Badge variant="primary" sx={{ justifySelf: 'center' }}>
            <p sx={{ textAlign: 'center' }}>Practical</p>
            {diffDaysInYears(new Date('1.10.2011'))} <span> | YOE </span>
          </Badge>
          <Badge
            variant="secondary"
            sx={{
              justifySelf: 'center',
              color: theme => readableColor(theme.colors.primary),
            }}>
            <p sx={{ textAlign: 'center' }}>Professional</p>
            {diffDaysInYears(new Date('1.7.2017'))} <span> | YOE </span>
          </Badge>
        </Flex>
      </Flex>
    </section>
  );
};

export default ResumeHero;
