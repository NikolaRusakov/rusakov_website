/** @jsx jsx */
import { jsx, Badge } from 'theme-ui';
import React from 'react';
import { ThemeProvider, Styled, Flex } from 'theme-ui';
import {
  base,
  // @ts-ignore
} from '@theme-ui/presets';
import merge from 'deepmerge';
// @ts-ignore
import { toTheme } from '@theme-ui/typography';
import typography from 'typography-theme-alton';
import { Helmet } from 'react-helmet';
import { ReactComponent as Me } from '../../static/svg/me.svg';

import { diffDaysInYears } from '../utils/utils';
import SocialSection from '../components/resume/socialSection';

export const CoverHeader: React.FC = () => (
  <React.Fragment>
    <section
      sx={{
        gridColumn: '2',
        gridRow: '1',
        flexDirection: 'column',
        alignItems: 'center',
        my: 3,
        p: [2, 4, 4],
        transform: [null, 'scale(0.9)', 'scale(0.9)'],
        display: 'flex',
        boxShadow: [
          null,
          '-10px -10px 30px 0 #00B0F0,' + '10px 10px 30px 0 #2200bb',
          '-10px -10px 30px 0 #00B0F0,' + '10px 10px 30px 0 #2200bb',
        ],
        borderRadius: '48px',
      }}>
      <Flex
        sx={{
          mb: 2,
          width: '192px',
          height: '192px',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          boxShadow:
            'inset 10px 10px 20px rgba(12, 98, 119, 0.5), inset -10px -10px 20px rgba(12, 0, 162, 0.5)',
          // 'inset 10px 10px 20px rgba(128, 128, 128, 0.5), inset -10px -10px 20px rgba(255, 255, 255, 0.5)',
        }}>
        <Me
          width={128}
          height={128}
          sx={{
            borderRadius: '64px',
            boxShadow:
              '2px 4px 16px 5px rgba(12, 98, 119, 0.96), -7px -4px 20px 7px rgba(12, 0, 162, 0.66)',
            // '10px 10px 20px rgba(128, 128, 128, 0.5), -10px -10px 20px rgba(255, 255, 255, 0.5)',
          }}
        />
      </Flex>
      <Flex
        sx={{
          py: 1,
          flexWrap: 'wrap',
          m: 3,
        }}>
        {['FE', 'BE', 'Cloud', 'Serverless'].map?.((value, i) => (
          <Badge
            variant="primary"
            px={1}
            my={1}
            mr={1}
            sx={{
              fontSize: 2,
              boxShadow:
                '-10px -10px 30px 0 #2200BB,' + '10px 10px 30px 0 #00B0F0',
            }}>
            {value}
          </Badge>
        ))}
      </Flex>
      <h1
        sx={{
          color: '#FFF2DF',
          mb: 2,
          fontSize: 5,
          textAlign: 'center',
        }}>
        Nikola Rusakov
      </h1>

      <span sx={{ color: 'primary', mb: 2, textAlign: 'center' }}>
        <h2 sx={{ color: '#00B0F0' }}>Passionate</h2>
        <h2 sx={{ color: 'primary', mb: 2, textAlign: 'center' }}>
          Software Developer
        </h2>
      </span>
      <footer
        sx={{
          mt: 3,
          background: 'transparent',
          borderRadius: '12px',
          p: 2,
          width: '90%',
          boxShadow:
            '-5px -5px 30px 0 #00B0F0,' +
            '5px 5px 30px 0 #2200bb,' +
            'inset -1px -1px 9px 0px #00B0F0,' +
            'inset 3px 7px 20px 0 #2200BB',
          // 'inset 10px 10px 30px 0 #00B0F0,' +
          // 'inset -10px -10px 30px 0 #2200BB',
        }}>
        <Flex
          sx={{
            p: 1,
            flexDirection: 'row',
            width: '100%',
            justifyContent: ['space-between', null, 'space-evenly'],
          }}>
          <Badge
            sx={{
              bg: '#2200bb',
              alignItems: 'center',
              mx: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              boxShadow:
                // '-10px -10px 30px 0 #00B0F0,' +
                // '10px 10px 30px 0 #2200bb,' +
                'inset 7px -8px 7px 0px #220c84',
            }}>
            <p
              sx={{
                textAlign: 'center',
                color: '#00B0F0',
                fontSize: 2,
              }}>
              Practical
            </p>
            <span sx={{ color: '#FFF2DF' }}>
              {diffDaysInYears(new Date('1.10.2011'))} | YOE{' '}
            </span>
          </Badge>
          <Badge
            sx={{
              bg: '#00B0F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mx: 2,
              p: 2,
              boxShadow:
                // '-10px -10px 30px 0 #00B0F0,' +
                // '10px 10px 30px 0 #2200bb,' +
                'inset -5px -5px 5px #0000005e,' + 'inset 5px 5px 5px #00B0F0',
              // 'inset 5px 5px 5px #FFF2DF',
            }}>
            <p
              sx={{
                textAlign: 'center',
                color: '#2200bb',
                fontSize: 2,
              }}>
              Professional
            </p>
            <span sx={{ color: '#FFF2DF' }}>
              {diffDaysInYears(new Date('1.7.2017'))} | YOE{' '}
            </span>
          </Badge>
        </Flex>

        <article
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}>
          <SocialSection styles={{ justifyContent: 'center' }} />
        </article>
      </footer>
    </section>
  </React.Fragment>
);

export default () => {
  return (
    <ThemeProvider
      theme={merge(base, {
        ...toTheme(typography),
        fonts: {
          ...toTheme(typography).fonts,
          body: 'JetBrains Mono, normal',
        },
      })}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nikola Rusakov Website</title>
        <link rel="canonical" href="http://rusakov.website/" />
        <meta
          name="description"
          content="Welcome to digital garden of Nikola Rusakov"
        />
        <html className="landing" />
      </Helmet>
      <Styled.root
        sx={{
          bg: '#121212',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          overflowY: 'hidden',
        }}>
        <Flex
          sx={{
            justifyContent: 'center',
            width: 'inherit',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <CoverHeader />
        </Flex>
      </Styled.root>
    </ThemeProvider>
  );
};
