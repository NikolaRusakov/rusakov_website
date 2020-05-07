/** @jsx jsx */
import React, { useState } from 'react';
import {
  calculatedWidth,
  exists,
  isNonEmptyArray,
  pickBadgeName,
} from '../../utils/utils';
import { toBadge } from '../badge/badgeList';
import { Flex, Box, jsx, useThemeUI } from 'theme-ui';
import { useExperienceList } from './experienceList.hook';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Maybe, TagEntity } from '../../../types/gatsby-graphql';
import { Global } from '@emotion/core';
import { motion } from 'framer-motion';
import { readableColor } from 'polished';
import { ReactComponent as Compress } from '../../../static/svg/compress.svg';
import { ReactComponent as Expand } from '../../../static/svg/expand.svg';

const button = {
  rest: {
    scale: 1,
    // fill: 'currentColor',
    // d:
    //   'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
  hover: {
    scale: 1.1,
    // fill: 'currentColor',
    // d:
    //   'M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z',
  },
  tap: {
    scale: 0.95,
    // fill: 'currentColor',
    // d:
    //   'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
};

const svgs = {
  rest: {
    scale: 1,
    // fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
  hover: {
    scale: 1.1,
    // fill: 'currentColor',
    d:
      'M200 288H88c-21.4 0-32.1 25.8-17 41l32.9 31-99.2 99.3c-6.2 6.2-6.2 16.4 0 22.6l25.4 25.4c6.2 6.2 16.4 6.2 22.6 0L152 408l31.1 33c15.1 15.1 40.9 4.4 40.9-17V312c0-13.3-10.7-24-24-24zm112-64h112c21.4 0 32.1-25.9 17-41l-33-31 99.3-99.3c6.2-6.2 6.2-16.4 0-22.6L481.9 4.7c-6.2-6.2-16.4-6.2-22.6 0L360 104l-31.1-33C313.8 55.9 288 66.6 288 88v112c0 13.3 10.7 24 24 24zm96 136l33-31.1c15.1-15.1 4.4-40.9-17-40.9H312c-13.3 0-24 10.7-24 24v112c0 21.4 25.9 32.1 41 17l31-32.9 99.3 99.3c6.2 6.2 16.4 6.2 22.6 0l25.4-25.4c6.2-6.2 6.2-16.4 0-22.6L408 360zM183 71.1L152 104 52.7 4.7c-6.2-6.2-16.4-6.2-22.6 0L4.7 30.1c-6.2 6.2-6.2 16.4 0 22.6L104 152l-33 31.1C55.9 198.2 66.6 224 88 224h112c13.3 0 24-10.7 24-24V88c0-21.3-25.9-32-41-16.9z',
  },
  tap: {
    scale: 0.95,
    // fill: 'currentColor',
    d:
      'M448 344v112a23.94 23.94 0 0 1-24 24H312c-21.39 0-32.09-25.9-17-41l36.2-36.2L224 295.6 116.77 402.9 153 439c15.09 15.1 4.39 41-17 41H24a23.94 23.94 0 0 1-24-24V344c0-21.4 25.89-32.1 41-17l36.19 36.2L184.46 256 77.18 148.7 41 185c-15.1 15.1-41 4.4-41-17V56a23.94 23.94 0 0 1 24-24h112c21.39 0 32.09 25.9 17 41l-36.2 36.2L224 216.4l107.23-107.3L295 73c-15.09-15.1-4.39-41 17-41h112a23.94 23.94 0 0 1 24 24v112c0 21.4-25.89 32.1-41 17l-36.19-36.2L263.54 256l107.28 107.3L407 327.1c15.1-15.2 41-4.5 41 16.9z',
  },
};

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
  <motion.button
    onClick={toggle}
    whileTap="tap"
    whileHover="hover"
    variants={button}>
    <motion.svg
      width="48"
      height="23"
      viewBox="0 0 23 23"
      d={svgs.rest}
      variants={svgs}>
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          hover: { d: 'M 2 2.5 L 20 2.5' },
          tap: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          hover: { opacity: 1 },
          tap: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          hover: { d: 'M 2 16.346 L 20 16.346' },
          tap: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </motion.svg>
  </motion.button>
);

const badgeBlockList = (
  tags: Maybe<Maybe<TagEntity>[]>,
  sectionTagIndex: string,
) => {
  const [hideBlock, toggleBlock] = useState(true);
  const { theme: themeSet } = useThemeUI();

  const getReadableColor = (
    defaultColor = themeSet?.colors?.primary ?? '#fff',
  ) =>
    readableColor(
      exists(tags?.[0]?.color) ? tags?.[0]?.color ?? '#fff' : defaultColor,
    );
  const detailBadge = (childTag: TagEntity) =>
    toBadge(pickBadgeName(childTag), {
      borderRadius: '0px !important',
      borderWidth: '2px',
      borderStyle: 'solid',
      background: 'transparent',
      // textShadow: `0px 0px ${getReadableColor(themeSet?.colors?.background)}`,
      color: exists(tags?.[0]?.color)
        ? tags?.[0]?.color
        : themeSet?.colors?.primary,
      borderColor: exists(tags?.[0]?.color)
        ? tags?.[0]?.color
        : themeSet?.colors?.primary,
      ...(exists(childTag?.color) ? { color: childTag.color } : {}),
    });

  return exists(tags) ? (
    <React.Fragment>
      <motion.button
        variants={button}
        onClick={() => toggleBlock(!hideBlock)}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        style={{
          fontSize: `calc(${themeSet.fontSizes?.[0]}px * 0.9)`,
          background: exists(tags?.[0]?.color)
            ? tags?.[0]?.color
            : themeSet?.colors?.primary,
          fontWeight: 'normal',
          height: 'min-content',
          border: `1px solid ${themeSet?.colors?.secondary}`,
          boxShadow: `0 0 1px 0 ${themeSet?.colors?.secondary}`,
          position: 'relative',
          borderRadius: 3,
          // color: themeSet?.colors?.background,
          color: getReadableColor(
            exists(tags?.[0]?.color)
              ? tags?.[0]?.color
              : themeSet?.colors?.primary,
          ),
          margin: `0.25rem 0.5rem`,
          transition:
            'border 0.15s ease-in-out 0.1s, border-radius 0.15s ease-in-out 0.1s, max-height 0.15s ease-in-out, max-width 0.20s ease-in-out',
        }}>
        <header
          sx={{
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <span
            sx={{
              fontSize: 0,
              paddingRight: '0 !important',
              padding: 1,
              position: 'relative',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              wordWrap: 'break-word',
              whiteSpace: 'nowrap',
              maxWidth: hideBlock ? '85%' : '100%',
              transition: 'max-width 0.10s ease-in-out 0.05s,',
              fontWeight: 'bold',
            }}>
            {tags[0]?.name}
          </span>
          <em
            sx={{
              visibility: hideBlock ? 'visible' : 'hidden',
              width: theme =>
                hideBlock
                  ? (isNonEmptyArray(tags) && `${calculatedWidth(tags)}rem`) ||
                    `${theme.fontSizes[2]}rem`
                  : '0px',
              fontSize: theme =>
                hideBlock ? `${theme.fontSizes[0]}px` : '0px',
              transition:
                'width 0.05s ease-in-out 0.10s,' +
                'padding 0.05s ease-in-out 0.10s,' +
                'opacity 0.05s ease-in-out 0.05s,' +
                'font-size 0.07s ease-in-out 0.05s,' +
                'visibility 0.05s ease-in-out 0.10s',
              marginLeft: '0 !important',
              margin: 1,
              fontWeight: 'bold',
              opacity: 1,
              letterSpacing: '-1px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}>{`+ ${tags.length - 1}`}</em>
        </header>
      </motion.button>

      <Flipper
        flipKey={hideBlock}
        spring={{ stiffness: 280, damping: 22 }}
        // spring="veryGentle"
        element="article"
        staggerConfig={{
          default: {
            reverse: hideBlock === true,
            speed: 0.5,
          },
          namedStagger: { speed: 0.2 },
        }}
        sx={{ display: 'contents' }}>
        {tags.slice(1).map((childTag, index) => {
          return hideBlock === true ? (
            <Flipped
              stagger
              flipId={`${sectionTagIndex}-${index}`}
              onComplete={el => (el.style.visibility = 'hidden')}
              onStartImmediate={el => {
                el.style.visibility = 'visible';
              }}>
              <div
                sx={{
                  position: 'absolute',
                  opacity: '0',
                  visibility: 'hidden',
                }}>
                <Flipped
                  inverseFlipId={`${sectionTagIndex}-${index}`}
                  stagger
                  scale>
                  {exists(childTag) && detailBadge(childTag)}
                </Flipped>
              </div>
            </Flipped>
          ) : (
            <Flipped stagger flipId={`${sectionTagIndex}-${index}`}>
              {exists(childTag) && detailBadge(childTag)}
            </Flipped>
          );
        })}
      </Flipper>
    </React.Fragment>
  ) : (
    <></>
  );
};

const badgeOrList = (tag: Maybe<TagEntity>, sectionIndex: string) =>
  (exists(tag) &&
    (exists(tag?.tags) ? (
      <React.Fragment>{badgeBlockList(tag?.tags, sectionIndex)}</React.Fragment>
    ) : (
      exists(tag.name) &&
      toBadge(tag.name, { borderRadius: 0, width: 'fit-content' })
    ))) || <></>;

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
          <em>
            {totalWithCount > 0 && ` + ${totalWithCount > 0 && totalWithCount}`}
          </em>
        </span>
      </summary>
      <Flex
        sx={{
          width: 'fit-content',
          flexFlow: 'row wrap',
        }}>
        <Global
          styles={{
            '.tagSection': {
              display: 'flex',
              flexWrap: 'wrap',
              position: 'relative',
            },
          }}
        />
        {experience &&
          experience?.sections.map((section, sectionIndex) => (
            <section
              sx={{
                width: 'fit-content',
                flex: ['1 0 100%', '1 0 50%', '1 0 50%'],
              }}>
              <header
                sx={{
                  display: 'flex',
                  alignSelf: 'center',
                  borderBottom: theme => `1px solid ${theme.colors.text}`,
                }}>
                <motion.label
                  whileTap="tap"
                  whileHover="hover"
                  variants={button}
                  sx={{
                    '&:hover': {
                      outline: theme => `1px solid ${theme.colors.primary}`,
                    },
                    '&:active': {
                      outline: theme => `2px solid ${theme.colors.secondary}`,
                    },
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
                      display: 'flex',
                      alignContent: 'center',
                    }}
                    px={1}
                    my={1}
                    mr={1}>
                    <Flex>
                      <h4 sx={{ alignSelf: 'center' }}> {section?.section}</h4>
                    </Flex>
                    <div
                      sx={{
                        position: 'relative',
                      }}>
                      <input
                        type="checkbox"
                        onClick={() => {
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
                        sx={{
                          boxSizing: 'border-box',
                          minWidth: '0px',
                          position: 'absolute',
                          opacity: '0',
                          zIndex: '-1',
                          width: '1px',
                          height: '1px',
                          margin: '0px',
                          overflow: 'hidden',
                        }}
                      />
                      {(section?.tags?.length ?? 0) > 3 && (
                        <Flex
                          sx={{
                            ml: 2,
                            width: theme => theme.fontSizes[1],
                            height: theme => theme.fontSizes[1] * 1.2,
                          }}>
                          {sections?.[section?.section ?? ''] === true ? (
                            <Expand
                              sx={{
                                width: theme => theme.fontSizes[1],
                                height: theme => theme.fontSizes[1],
                              }}
                            />
                          ) : (
                            <Compress
                              sx={{
                                width: theme => theme.fontSizes[1],
                                height: theme => theme.fontSizes[1],
                              }}
                            />
                          )}
                        </Flex>
                      )}
                    </div>
                  </Box>
                </motion.label>
                {section?.tags && section?.tags?.length - 3 >= 1 && (
                  <span
                    sx={{
                      transform: `scale(${
                        sections?.[section?.section ?? ''] === true ? '1' : '0'
                      })`,
                      transition: 'transform 0.1s ease-in-out',
                      alignSelf: 'center',
                    }}>
                    {' '}
                    <em>{`+ ${section?.tags?.length - 3}`}</em>
                  </span>
                )}
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
                    <React.Fragment
                      key={`expList-highlight-${sectionIndex}-${section?.section ??
                        ''}-${tagIndex}`}>
                      {badgeOrList(
                        tag,
                        `expList-highlight-${sectionIndex}-${section?.section ??
                          ''}-${tagIndex}`,
                      )}
                    </React.Fragment>
                  ))}
                  {section?.tags?.slice(3).map((tag, tagIndex) => {
                    const sectionTagIndex = `expList-item-${sectionIndex}-${section?.section ??
                      ''}-${tagIndex}`;
                    return sections?.[section?.section ?? ''] === true ? (
                      <Flipped
                        stagger
                        flipId={sectionTagIndex}
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
                          <Flipped inverseFlipId={sectionTagIndex} scale>
                            {badgeOrList(tag, sectionTagIndex)}
                          </Flipped>
                        </div>
                      </Flipped>
                    ) : (
                      <Flipped stagger flipId={sectionTagIndex}>
                        {badgeOrList(tag, sectionTagIndex)}
                      </Flipped>
                    );
                  })}
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
