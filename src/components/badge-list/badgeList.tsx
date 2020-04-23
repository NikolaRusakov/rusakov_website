/** @jsx jsx */
import { Badge, Box, jsx } from 'theme-ui';
import { Maybe, TagEntity } from '../../../types/gatsby-graphql';

import { exists, isNonEmptyArray } from '../../utils/utils';
import HiddenCheckbox from '../checkbox/hiddenCheckbox';
import { Global } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';

const calculatedWidth = (tags: TagEntity[]) =>
  tags.length / 10 <= 1 ? 2 : Math.ceil(tags.length / 10);

export const toBadge = (tag: TagEntity, styles = {}) =>
  tag.name && (
    <Badge
      key={`badge- ${uuidv4()}`}
      variant="muted"
      sx={{ ...styles }}
      py={0}
      m={1}>
      <span>{tag.name}</span>
    </Badge>
  );

const badgeList = (tags: Maybe<Maybe<TagEntity>[]>) => {
  const sectionId = uuidv4();
  if (exists(tags)) {
    return tags?.length > 3 ? (
      <div sx={{ m: 1, maxWidth: '97%', position: 'relative' }}>
        <Global
          styles={theme => {
            console.log({
              accent: theme.colors.accent,
              muted: theme.colors.muted,
            });
            return {
              'input[type=checkbox]:checked + section': {
                margin: `${theme.space[1]}px 0`,
                marginRight: `${theme.space[1]}px`,
                borderLeft: `6px solid ${theme.colors.secondary} !important`,
                borderRadius: 0,
                border: 'none',
                transition:
                  'border-radius 0.1s ease-in-out 0.05s, border 0.05s ease-in-out 0.1s',

                '& > label > header': {
                  display: 'flex',
                  justifyContent: 'center',
                  transition: 'justify-content 0.15 ease-in-out 0.1s',
                  '& span': {
                    fontWeight: 'bold',
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
                  maxHeight: '900px',
                  maxWidth: '900px',
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
            };
          }}
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
            borderRadius: '48px',
            transition:
              'border 0.15s ease-in-out 0.1s, border-radius 0.15s ease-in-out 0.1s, max-height 0.15s ease-in-out, max-width 0.20s ease-in-out',
            border: theme => `1px solid ${theme.colors.primary}`,
          }}>
          <label htmlFor={`section-${sectionId}`}>
            {
              <header
                sx={{
                  maxWidth: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 4px',
                }}>
                <span
                  sx={{
                    fontSize: 0,
                    padding: 1,
                    position: 'relative',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    whiteSpace: 'nowrap',
                  }}>
                  {tags[0]?.name}
                </span>
                <em
                  sx={{
                    visibility: 'visible',
                    width: theme =>
                      (isNonEmptyArray(tags) &&
                        `
                        ${
                          // theme.fontSizes[2] *
                          calculatedWidth(tags)
                        }rem`) ||
                      `${theme.fontSizes[2]}rem`,
                    // : theme.fontSizes[2],
                    transition:
                      'width 0.05s ease-in-out 0.12s,' +
                      'padding 0.05s ease-in-out 0.15s,' +
                      'opacity 0.05s ease-in-out 0.10s,' +
                      'font-size 0.05s ease-in-out 0.1s,' +
                      'visibility 0.05s ease-in-out 0.15s',
                    // textAlign: 'end',
                    fontSize: 0,
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
                  exists(childTag) && toBadge(childTag, { bg: 'highlight' }),
              )}
          </article>
        </Box>
      </div>
    ) : (
      tags?.map(childTag => exists(childTag) && toBadge(childTag))
    );
  }
  return <></>;
};

export default badgeList;
