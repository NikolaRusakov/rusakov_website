/** @jsx jsx */
import {
  Badge,
  Flex,
  jsx,
  Link,
  Styled,
  Grid,
  Divider,
  useThemeUI,
} from 'theme-ui';
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
import { ReactComponent as Portfolio } from '../../../static/svg/portfolio.svg';
import github, {
  ReactComponent as Github,
} from '../../../static/svg/github.svg';
import linkedin, {
  ReactComponent as LinkedIn,
} from '../../../static/svg/linkedin.svg';
import twitter, {
  ReactComponent as Twitter,
} from '../../../static/svg/twitter.svg';
import stackblitz, {
  ReactComponent as StackBlitz,
} from '../../../static/svg/stackblitz.svg';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const diffDaysInYears = (start: Date) => dayjs().from(start, true);

const socialsMap = {
  github: github,
  linkedin: linkedin,
  twitter: twitter,
  stackblitz: stackblitz,
};
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
      href={href}>
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
  const { theme: themeSet } = useThemeUI();

  const socialIcon = (icon: string) => {
    switch (icon) {
      case 'github':
        return <Github width={24} height={24} fill={themeSet?.colors?.text} />;
        break;
      case 'linkedin':
        return (
          <LinkedIn width={24} height={24} />
        );
        break;
      case 'twitter':
        return <Twitter width={24} height={24} fill={themeSet?.colors?.text} />;
        break;
      case 'stackblitz':
        return (
          <StackBlitz width={24} height={24} fill={themeSet?.colors?.text} />
        );
      default:
        <> </>;
        return <> </>;
    }
  };
  return (
    <section
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: ['column-reverse', 'row', 'row'],
        position: 'relative',
      }}>
      <Flex sx={{ flexDirection: 'column', width: '100%' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <address
            sx={{
              display: ['grid', 'flex', 'flex'],
              justifyContent: 'center',
              alignItems: 'center',
              width: ['100%', null, null],
              margin: ['auto', null, 0],
            }}>
            <Grid sx={{ gridGap: ['0.25rem', '0.375rem', '1rem'] }}>
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
              {about.basics.website && (
                <ContactItem
                  Cmp={Link}
                  href={about.basics.portfolio}
                  content={`${about.basics.portfolio} (🚧)`}
                  icon={
                    <Portfolio
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
          <Divider sx={{ alignSelf: 'center', width: '80%' }} />
          <article
            sx={{
              justifyItems: 'center',
              gridTemplateColumns: '1fr 1fr',
              // gridTemplateColumns: 'repeat(auto-fill, 1fr)',
              display: 'grid',
              alignSelf: 'center',
              // width: '80%',
            }}>
            {about.basics.profiles.map(({ network, url, username }) => (
              <Flex sx={{ width: '100%' }}>
                <a
                  href={url}
                  sx={{
                    textAlign: 'center',
                    my: 1,
                    flexDirection: ['column', 'row', 'row'],
                    alignItems: ['center', null, null],
                    justifyContent: 'flex-start',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(36px, auto) 1fr',
                    position: 'relative',
                  }}>
                  {socialIcon(network.toLowerCase())}
                </a>
              </Flex>
            ))}
          </article>
        </Flex>
      </Flex>
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
        <h3 sx={{ mb: 2, textAlign: 'center' }}>{about.basics.label}</h3>

        <Flex
          sx={{
            py: 1,
            flexDirection: 'row',
            width: 'max-content',
            justifyContent: ['space-between', null, 'space-evenly'],
          }}>
          <Badge
            variant="primary"
            sx={{ justifySelf: 'center', mx: [1, '0', '0'] }}>
            <p sx={{ textAlign: 'center' }}>Practical</p>
            <span>{diffDaysInYears(new Date('1.10.2011'))} | YOE </span>
          </Badge>
          <Badge
            variant="secondary"
            sx={{
              justifySelf: 'center',
              mx: 1,
            }}>
            <p sx={{ textAlign: 'center' }}>Professional</p>
            <span>{diffDaysInYears(new Date('1.7.2017'))} | YOE </span>
          </Badge>
        </Flex>
      </Flex>
    </section>
  );
};

export default ResumeHero;