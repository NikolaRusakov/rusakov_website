/** @jsx jsx */
import { Badge, Box, jsx } from 'theme-ui';
import { Maybe, TagEntity } from '../../../types/gatsby-graphql';

import { exists, isNonEmptyArray, pickBadgeName } from '../../utils/utils';
import HiddenCheckbox from '../checkbox/hiddenCheckbox';
import { Global } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';

const calculatedWidth = (tags: TagEntity[]) =>
  tags.length / 10 <= 1 ? 2 : Math.ceil(tags.length / 10);

export const toBadge = (tagName: string, styles = {}) =>
  tagName && (
    <Badge
      key={`badge- ${uuidv4()}`}
      sx={{
        color: 'background',
        whiteSpace: 'normal',
        ...styles,
      }}
      py={0}
      m={1}>
      <span sx={{ fontWeight: 'normal', color: 'background' }}>{tagName}</span>
    </Badge>
  );

const badgeList = (tags: Maybe<Maybe<TagEntity>[]>, styles = {}) => {
  const sectionId = uuidv4();
  if (exists(tags)) {
    return tags?.length > 3 ? (
      <div sx={{ m: 1, maxWidth: '97%', position: 'relative', ...styles }}>
        <Global
          styles={theme => ({
            'input[type=checkbox]:checked + section': {
              margin: `${theme.space[1]}px 0`,
              marginRight: `${theme.space[1]}px`,
              borderLeft: `5px solid ${theme.colors.secondary} !important`,
              borderRadius: 0,
              border: 'none',
              transition:
                'border-radius 0.1s ease-in-out 0.05s, border 0.05s ease-in-out 0.1s',

              '& > label > header': {
                display: 'flex',
                justifyContent: 'center',
                transition: 'justify-content 0.15 ease-in-out 0.05s',
                '& span': {
                  whiteSpace: 'normal',
                  fontWeight: 'bolder',
                },
                '& em': {
                  width: 0,
                  visibility: 'hidden',
                  padding: 0,
                  fontSize: '0px',
                  opacity: 0,
                  transition:
                    'width 0.05s ease-in-out 0.10s,' +
                    'padding 0.05s ease-in-out 0.10s,' +
                    'opacity 0.05s ease-in-out 0.05s,' +
                    'font-size 0.07s ease-in-out 0.05s,' +
                    'visibility 0.05s ease-in-out 0.10s',
                },
              },
              '& > article': {
                visibility: 'visible',
                maxHeight: '1900px',
                maxWidth: '1900px',
                backgroundColor:
                  theme.colors.highlight ||
                  theme.colors.accent ||
                  theme.colors.muted,
                padding: `${theme.space[1]}px 0`,
                opacity: 1,
                transition:
                  'opacity 0.2s ease-in-out 0.1s, max-width 0.1s ease-in-out, max-height 0.2s ease-in-out, visibility 0.25s ease-in-out 0.1s',
              },
            },
          })}
        />
        <HiddenCheckbox
          type="checkbox"
          id={`section-${sectionId}`}
          name="badgeToggle"
        />
        <Box
          as="section"
          variant="badges.muted"
          sx={{
            position: 'relative',
            borderRadius: 3,
            color: theme => `${theme.colors.background} !important`,
            // borderRadius: theme => theme.space[2] * 1.5,
            transition:
              'border 0.15s ease-in-out 0.1s, border-radius 0.15s ease-in-out 0.1s, max-height 0.15s ease-in-out, max-width 0.20s ease-in-out',
          }}>
          <label htmlFor={`section-${sectionId}`}>
            {
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
                    maxWidth: '85%',
                    fontWeight: 'bold',
                  }}>
                  {tags[0]?.name}
                </span>
                <em
                  sx={{
                    visibility: 'visible',
                    width: theme =>
                      (isNonEmptyArray(tags) &&
                        `
                        ${calculatedWidth(tags)}rem`) ||
                      `${theme.fontSizes[2]}rem`,
                    transition:
                      'width 0.05s ease-in-out 0.12s,' +
                      'padding 0.05s ease-in-out 0.15s,' +
                      'opacity 0.05s ease-in-out 0.10s,' +
                      'font-size 0.05s ease-in-out 0.1s,' +
                      'visibility 0.05s ease-in-out 0.15s',
                    fontSize: 0,
                    marginLeft: '0 !important',
                    margin: 1,
                    fontWeight: 'bold',
                    opacity: 1,
                    letterSpacing: '-1px',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}>{`+ ${tags.length - 1}`}</em>
              </header>
            }
          </label>

          <article
            sx={{
              visibility: 'hidden',
              maxHeight: 0,
              maxWidth: 0,
              fontWeight: 'normal',
              transition:
                'opacity 0.15s ease-in-out,max-width 0.30s ease-in-out, max-height 0.20s ease-in-out, visibility 0.2s ease-in-out',
              opacity: 0,
            }}>
            {tags
              .slice(1)
              .map(
                childTag =>
                  exists(childTag) && toBadge(pickBadgeName(childTag), styles),
              )}
          </article>
        </Box>
      </div>
    ) : (
      tags?.map(
        childTag =>
          exists(childTag) && toBadge(pickBadgeName(childTag), styles),
      )
    );
  }
  return <></>;
};

export default badgeList;
