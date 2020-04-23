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
      <div>
        <Global
          styles={theme => ({
            'input[type=checkbox]:checked + section': {
              borderRadius: 0,
              margin: `${theme.space[1]}px 0`,
              marginRight: `${theme.space[1]}px`,
              borderLeft: `6px solid ${theme.colors.secondary} !important`,
              '& > header > span': {
                fontWeight: 'bolder',
              },
              border: 'none',
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
                  'opacity 0.2s ease-in-out,max-width 0.1s ease-in-out,max-height 0.2s ease-in-out, visibility 0.25s ease-in-out 0.1s',
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
            transition: 'max-height 0.15s ease-in',
            border: theme => `1px solid ${theme.colors.primary}`,
          }}>
          <label htmlFor={`section-${sectionId}`}>
            {
              <header sx={{ width: '100%', display: 'inline-flex' }}>
                <span sx={{ fontSize: 2, padding: 1, fontWeight: 'bold' }}>
                  {tags[0]?.name}
                </span>
                <em sx={{ fontSize: 2, padding: 1, fontWeight: 'bold' }}>
                  + {tags.length - 1}
                </em>
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
