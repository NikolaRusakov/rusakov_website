/** @jsx jsx */
import { Badge, Box, jsx } from 'theme-ui';
import { Maybe, TagEntity } from '../../../types/gatsby-graphql';

import { exists } from '../../utils/utils';
import HiddenCheckbox from '../checkbox/hiddenCheckbox';
import { transparentize } from 'polished';
import { Global } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';

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
      <div sx={{ m: 1 }}>
        <Global
          styles={theme => ({
            'input[type=checkbox]:checked + section': {
              borderRadius: 0,
              margin: `${theme.space[1]}px 0`,
              marginRight: `${theme.space[1]}px`,
              borderLeft: `6px solid ${theme.colors.secondary} !important`,
              '& > label > header > em': {
                width: 0,
                visibility: 'hidden',
                padding: 0,
                fontSize: '0px',
                opacity: 0,
                transition:
                  'width 0.05s ease-in-out 0.12s,' +
                  'padding 0.05s ease-in-out 0.15s,' +
                  'opacity 0.05s ease-in-out 0.05s,' +
                  'font-size 0.07s ease-in-out 0.05s,' +
                  'visibility 0.05s ease-in-out 0.12s',
              },
              border: 'none',
              '& > label > header': {
                justifyContent: 'center',
              },
              '& > article': {
                visibility: 'visible',
                maxHeight: '200px',
                maxWidth: '900px',
                backgroundColor: `${transparentize(
                  0.7,
                  theme.colors.secondary,
                )}`,
                padding: `${theme.space[1]}px 0`,
                opacity: 1,
                transition:
                  'opacity 0.2s ease-in-out 0.1s, max-width 0.1s ease-in-out, max-height 0.2s ease-in-out, visibility 0.25s ease-in-out 0.1s, all ease-in-out 0.3s',
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
            borderRadius: '48px',
            transition:
              'border 0.15s ease-in-out 0.1s, border-radius 0.15s ease-in-out 0.1s, max-height 0.15s ease-in-out, max-width 0.20s ease-in-out',
            border: theme => `1px solid ${theme.colors.primary}`,
          }}>
          <label htmlFor={`section-${sectionId}`}>
            {
              <header
                sx={{
                  width: '100%',
                  display: 'inline-flex',
                  justifyContent: 'center',
                }}>
                <span
                  sx={{
                    fontSize: 2,
                    padding: 1,
                    fontWeight: 'bold',
                    position: 'relative',
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                  }}>
                  {tags[0]?.name}
                </span>
                <em
                  sx={{
                    visibility: 'visible',
                    width: theme =>
                      `${theme.fontSizes[2] *
                        (tags.length / 10 < 1
                          ? 2
                          : Math.ceil(tags.length / 10) + 1)}px`,
                    transition:
                      'width 0.05s ease-in-out 0.12s,' +
                      'padding 0.05s ease-in-out 0.15s,' +
                      'opacity 0.05s ease-in-out 0.10s,' +
                      'font-size 0.05s ease-in-out 0.1s,' +
                      'visibility 0.05s ease-in-out 0.15s',
                    // transition: 'visibility 0.2s ease-in-out 0.2s',
                    fontSize: 2,
                    padding: 1,
                    fontWeight: 'bold',
                    opacity: 1,
                  }}>{`+ ${tags.length - 1}`}</em>
                {/*<em sx={{*/}
                {/*    fontSize: 2, padding: 1, fontWeight: 'bold'*/}
                {/*}}>*/}
                {/*  + {tags.length - 1}*/}
                {/*</em>*/}
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
