/** @jsx jsx */
import { jsx, Badge } from 'theme-ui';
import React, { useState } from 'react';
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
import { useStaticQuery, graphql } from 'gatsby';
import { ReactComponent as Me } from '../../static/svg/me.svg';

import { useMorph } from 'react-morph';
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
          boxShadow:
            '-10px -10px 30px 0 #00B0F0,' +
            '10px 10px 30px 0 #2200bb,' +
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
              justifySelf: 'center',
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
              justifySelf: 'center',
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
  const landingMe = useStaticQuery(graphql`
    query LandingMe {
      avatar: file(relativePath: { eq: "landingme.jpg" }) {
        childImageSharp {
          fluid(
            background: "#2200BB"
            fit: INSIDE
            maxWidth: 800
            duotone: { highlight: "#E5E5E5", shadow: "#2200BB", opacity: 50 }
          ) {
            src
            srcSet
            base64
          }
        }
      }
    }
  `);

  const [toggle, setToggle] = useState(true);

  const morph = useMorph();

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
        {/*<body className="root" />*/}
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
          {/*<main*/}
          {/*  sx={{*/}
          {/*    bg: '#121212',*/}
          {/*    width: ['100%', '80%', '66.7%'],*/}
          {/*    height: '90%',*/}
          {/*    display: 'flex',*/}
          {/*    // borderRadius: '48px',*/}
          {/*    boxShadow: `-1px 1px 7px 0 #00B0F0, 1px -2px 10px 0px #2200bb`,*/}
          {/*    // `-1px 1px 15px 0 #00B0F0, 3px 4px 14px 0px #2200bb`,*/}
          {/*    // '-10px -10px 30px 0 #00B0F0,' + '10px 10px 30px 0 #2200bb',*/}
          {/*  }}>*/}

          {/*<Flex*/}
          {/*  sx={{*/}
          {/*    position: 'relative',*/}
          {/*    width: ['50%', '50%', '33%'],*/}
          {/*    height: ['40%', '75%', '100%'],*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent: 'center',*/}
          {/*  }}>*/}
          {/*  {landingMe?.avatar?.childImageSharp?.fluid && (*/}
          {/*    <Img*/}
          {/*      fluid={landingMe?.avatar?.childImageSharp?.fluid}*/}
          {/*      alt={'rusakov website avatar'}*/}
          {/*      style={{*/}
          {/*        // width: '35%',*/}
          {/*        width: '100%',*/}
          {/*        height: '100%',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  <h1*/}
          {/*    sx={{*/}
          {/*      display: 'inline',*/}
          {/*      position: 'absolute',*/}
          {/*      padding: '4px',*/}
          {/*      marginTop: ['7rem', '9rem', '12rem'],*/}
          {/*      textTransform: 'uppercase',*/}
          {/*      border: '2px solid #FFF2DF',*/}

          {/*      color: '#FFF2DF',*/}
          {/*    }}>*/}
          {/*    more*/}
          {/*  </h1>*/}
          {/*</Flex>*/}

          {/*<motion.div>
                <motion.svg
                  width="263"
                  height="182"
                  viewBox="0 0 263 182"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M0.00012207 16.7867C0.00012207 7.95019 7.16357 0.786743 16.0001 0.786743H411.636C420.473 0.786743 427.636 7.95019 427.636 16.7867V408.215C427.636 417.052 420.473 424.215 411.636 424.215H16.0001C7.16354 424.215 0.00012207 417.052 0.00012207 408.215V16.7867Z"
                        fill="#00B0F0"
                    />
                    <motion.path
                        d="M0 25.6072C0 16.7706 7.16344 9.60718 16 9.60718H411.636C420.473 9.60718 427.636 16.7706 427.636 25.6072V399.393C427.636 408.229 420.473 415.393 411.636 415.393H16C7.16342 415.393 0 408.229 0 399.393V25.6072Z"
                        fill="#121212"
                    />
                  <motion.path
                    d="M151.654 0.5H174.859V128.143H151.654V0.5ZM204.269 84.7295H197.314V62.327H203.225C206.819 62.327 210.442 62.5744 212.297 62.327C215.372 61.9168 217.76 60.8075 220.092 58.1569C222.087 55.8905 222.374 50.9136 222.721 49.182C223.084 46.5983 223.084 44.1812 223.084 40.8417C223.084 37.5022 221.845 33.1451 221.498 31.4135C220.727 29.1925 219.105 26.9306 218.178 26.0648C217.25 25.1991 214.514 23.7528 212.659 23.5054C210.921 23.258 208.417 22.7106 204.592 22.7106H197.314V0.5H215.222C223.451 0.5 230.116 1.36579 235.216 3.09738C240.316 4.82897 244.257 7.4882 247.039 11.0751C249.589 14.4146 251.269 18.558 252.081 23.5054C253.008 28.4528 253.472 34.8226 253.472 42.6147C253.472 52.6332 252.602 60.3635 250.864 65.8057C248.43 72.732 241.359 77.4321 235.216 80.2768L253.472 128.143H219.568L204.269 84.7295Z"
                    fill="#00B0F0"
                  />{' '}
                  <motion.path
                    d="M7.67284 61.6568V56.8743L32.0376 56.9672L99.8149 175.839V181.5H73.7467L7.67284 61.6568ZM78.9604 96.5913V56.9672H105.029V147.537L78.9604 96.5913ZM0.755798 85.2701L26.824 136.216V181.5H0.755798V85.2701Z"
                    fill="#2200bb"
                  />
                  <rect
                    x="142.244"
                    y="163.429"
                    width="120.636"
                    height="12.0476"
                    fill="#C4C4C4"
                  />
                  <rect
                    x="142.244"
                    y="169.452"
                    width="120.636"
                    height="12.0476"
                    fill="#868686"
                    fill-opacity="0.4"
                  />
                </motion.svg>
              </motion.div>*/}
          {/*</main>*/}
        </Flex>
      </Styled.root>
    </ThemeProvider>
  );
};
