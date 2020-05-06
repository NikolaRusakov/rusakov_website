/** @jsx jsx */
import React, { useState } from 'react';
import { exists } from '../../utils/utils';
import badgeList, { toBadge } from '../badge/badgeList';
import { Flex, Box, jsx } from 'theme-ui';
import { useExperienceList } from './experienceList.hook';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Maybe, TagEntity } from '../../../types/gatsby-graphql';
import { Global } from '@emotion/core';
import { motion } from 'framer-motion';

// @ts-ignore
const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// @ts-ignore
export const MenuToggle = ({ toggle }) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const badgeOrList = (tag: Maybe<TagEntity>) =>
  (exists(tag) &&
    (exists(tag?.tags) ? (
      <Flex sx={{ flexDirection: 'row' }}>
        {badgeList(tag?.tags, {
          width: 'fit-content',
          display: 'flex',
          // flexDirection: 'column',
        })}
      </Flex>
    ) : (
      exists(tag.name) && toBadge(tag.name, { width: 'fit-content' })
    ))) || <></>;

const button = {
  rest: {
    scale: 1,
    fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
  hover: {
    scale: 1.1,
    fill: 'currentColor',
    d:
      'M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z',
  },
  tap: {
    scale: 0.95,
    fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
};

const toggles = {
  rest: {
    fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
  hover: {
    fill: 'currentColor',
    d:
      'M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z',
  },
  tap: {
    fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
};

const ExperienceList: React.FC<{ company: string }> = ({
  company,
  children,
}) => {
  const experience = useExperienceList(company);
  const expSections = experience?.sections
    .filter(exists)
    .map<string>(({ section }) => section);

  const [sections, toggleSection] = useState(
    expSections?.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: true,
      }),
      {},
    ),
  );

  const expCount =
    experience?.sections.reduce<number>(
      (totalCount, section) => totalCount + (section?.tags?.length ?? 0),
      0,
    ) ?? 0;

  const tagsCount = children?.toString().split(',').length ?? 0;

  const totalWithCount = expCount - tagsCount;

  return (
    <details>
      <summary>
        <span>
          <h6 style={{ display: 'inline', textTransform: 'uppercase' }}>
            {'Highlight: '}
          </h6>
          <p style={{ display: 'inline' }}>{children}</p>
          <em>{` + ${totalWithCount > 0 && totalWithCount}`}</em>
        </span>
      </summary>
      <Flex
        sx={{
          flexDirection: 'column',
          width: 'fit-content',
        }}>
        <Global
          styles={{
            '.tagSection': {
              display: 'flex',
              flexWrap: 'wrap',

              // flexDirection: 'column',
              position: 'relative',
            },
          }}
        />
        {experience &&
          experience?.sections.map((section, sectionIndex) => (
            <section sx={{ width: 'fit-content' }}>
              <header
                sx={{
                  display: 'flex',
                  width: '95%',
                  alignSelf: 'center',
                  borderBottom: theme => `1px solid ${theme.colors.text}`,
                }}>
                <Box
                  sx={{
                    marginBottom: 0,
                    px: 1,
                    fontWeight: 'bold',
                    color: 'background',
                    bg: 'text',
                    textTransform: 'uppercase',
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                  }}
                  px={1}
                  my={1}
                  mr={1}>
                  <h4> {section?.section}</h4>
                  <MenuToggle
                    sx={{
                      position: 'relative',
                      width: '48px',
                      height: '20px',
                      outline: 'none',
                      border: 'none',
                      '-webkit-user-select': 'none',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '18px',
                      left: '15px',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'transparent',
                    }}
                    toggle={() => {
                      const sectionExists = exists(sections)
                        ? section?.section ?? ''
                        : '';
                      const toggleableSection = {
                        [sectionExists]:
                          (exists(sections) &&
                            sectionExists in sections &&
                            !sections?.[section?.section ?? '']) ??
                          true,
                      };
                      toggleSection({
                        ...sections,
                        ...toggleableSection,
                      });
                    }}
                  />
                </Box>
              </header>
              <Flex
                sx={{
                  flexWrap: 'wrap',
                  py: 1,
                  alignItems: 'baseline',
                }}>
                <Flipper
                  flipKey={`expList-${sections?.[section?.section ?? '']}`}
                  spring={{ stiffness: 280, damping: 22 }}
                  // spring="veryGentle"
                  element="section"
                  className="tagSection"
                  staggerConfig={{
                    default: {
                      reverse: sections?.[section?.section ?? ''] === true,
                      speed: 0.5,
                    },
                    namedStagger: { speed: 0.2 },
                  }}>
                  {section?.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <div>{badgeOrList(tag)}</div>
                  ))}
                  {section?.tags?.slice(3).map((tag, tagIndex) =>
                    sections?.[section?.section ?? ''] === true ? (
                      <Flipped
                        stagger
                        flipId={`expList-item-${sectionIndex}-${section?.section ??
                          ''}-${tagIndex}`}
                        onComplete={el => (el.style.visibility = 'hidden')}
                        onStartImmediate={el =>
                          (el.style.visibility = 'visible')
                        }>
                        <div
                          sx={{
                            position: 'absolute',
                            opacity: '0',
                            visibility: 'hidden',
                          }}>
                          <Flipped
                            inverseFlipId={`expList-item-${sectionIndex}-${section?.section ??
                              ''}-${tagIndex}`}
                            scale>
                            {badgeOrList(tag)}
                          </Flipped>
                        </div>
                      </Flipped>
                    ) : (
                      <Flipped
                        stagger
                        flipId={`expList-item-${sectionIndex}-${section?.section ??
                          ''}-${tagIndex}`}>
                        {badgeOrList(tag)}
                      </Flipped>
                    ),
                  )}
                  {/*<motion.div*/}
                  {/*  style={{*/}
                  {/*    padding: '10px',*/}
                  {/*    position: 'absolute',*/}
                  {/*    background: 'rgba(0, 0, 0, 0.4)',*/}
                  {/*    borderRadius: '10px',*/}
                  {/*    width: '48px',*/}
                  {/*    height: '20px',*/}
                  {/*    top: '10px',*/}
                  {/*    right: '10px',*/}
                  {/*    display: 'flex',*/}
                  {/*    justifyContent: 'center',*/}
                  {/*    alignItems: 'center',*/}
                  {/*    cursor: 'pointer',*/}
                  {/*  }}*/}
                  {/*  variants={toggles}*/}
                  {/*  // initial="compress"*/}
                  {/*  // whileHover="hover"*/}
                  {/*  // whileTap="expand"*/}
                  {/*  onClick={() => {*/}
                  {/*    const sectionExists = exists(sections)*/}
                  {/*      ? section?.section ?? ''*/}
                  {/*      : '';*/}
                  {/*    const toggleableSection = {*/}
                  {/*      [sectionExists]:*/}
                  {/*        (exists(sections) &&*/}
                  {/*          sectionExists in sections &&*/}
                  {/*          !sections?.[section?.section ?? '']) ??*/}
                  {/*        true,*/}
                  {/*    };*/}
                  {/*    toggleSection({*/}
                  {/*      ...sections,*/}
                  {/*      ...toggleableSection,*/}
                  {/*    });*/}
                  {/*  }}>*/}
                  {/*  <motion.svg*/}
                  {/*    width="16"*/}
                  {/*    height="16"*/}
                  {/*    xmlns="http://www.w3.org/2000/svg"*/}
                  {/*    // variants={toggles}*/}
                  {/*    // viewBox="0 0 50 50"*/}
                  {/*    style={{ width: '24px', height: '24px' }}*/}
                  {/*    aria-hidden="true"*/}
                  {/*    focusable="true"*/}
                  {/*    data-prefix="fas"*/}
                  {/*    variants={toggles}*/}
                  {/*    // initial="expand"*/}
                  {/*    whileHover="hover"*/}
                  {/*    whileTap="compress"*/}
                  {/*    data-icon="expand-arrows-alt"*/}
                  {/*    role="img"*/}
                  {/*    viewBox="0 0 448 512">*/}
                  {/*    <motion.path*/}
                  {/*      // fill="currentColor"*/}
                  {/*      fill="#FF0"*/}
                  {/*      strokeWidth="2"*/}
                  {/*      stroke={'EE0'}*/}
                  {/*      variants={toggles}*/}
                  {/*      initial="expand"*/}
                  {/*      // whileHover="hover"*/}
                  {/*      // whileTap="compress"*/}
                  {/*      strokeDasharray="0 1"*/}
                  {/*      // d="M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z"*/}
                  {/*    />*/}
                  {/*    /!*<motion.path*!/*/}
                  {/*    /!*  d="M12.8 5.1541V2.5a.7.7 0 0 1 1.4 0v5a.7.7 0 0 1-.7.7h-5a.7.7 0 0 1 0-1.4h3.573c-.7005-1.8367-2.4886-3.1-4.5308-3.1C4.8665 3.7 2.7 5.85 2.7 8.5s2.1665 4.8 4.8422 4.8c1.3035 0 2.523-.512 3.426-1.4079a.7.7 0 0 1 .986.9938C10.7915 14.0396 9.2186 14.7 7.5422 14.7 4.0957 14.7 1.3 11.9257 1.3 8.5s2.7957-6.2 6.2422-6.2c2.1801 0 4.137 1.1192 5.2578 2.8541z"*!/*/}
                  {/*    /!*  // d="M17,17 L33,33"*!/*/}
                  {/*  </motion.svg>*/}
                  {/*  /!*{!sections?.[section?.section ?? ''] ? (*!/*/}
                  {/*  /!*  <Expand />*!/*/}
                  {/*  /!*) : (*!/*/}
                  {/*  /!*  <Compress />*!/*/}
                  {/*  /!*)}*!/*/}
                  {/*</motion.div>*/}
                </Flipper>
              </Flex>
            </section>
          ))}
      </Flex>
    </details>
  );
};

export default ExperienceList;
