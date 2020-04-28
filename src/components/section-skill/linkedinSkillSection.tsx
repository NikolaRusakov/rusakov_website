/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import i18next from 'i18next';
import { graphql, useStaticQuery } from 'gatsby';
import {
  LinkedInSkills,
  LinkedInSkillsSection,
  TagEntity,
} from '../../../types/gatsby-graphql';
import { exists, isNonEmptyArray } from '../../utils/utils';
import { toBadge } from '../badge/badgeList';
import { Section } from '../section';
import LinkedInBadge from '../badge/linkedInBadge';

const LinkedInSkillSection: React.FC = () => {
  const locale = i18next.language;

  const {
    linkedInSkills: { skills },
  }: { linkedInSkills: LinkedInSkills } = useStaticQuery(graphql`
    query LinkedInSkills {
      linkedInSkills {
        skills {
          locale
          data {
            topSkills {
              skills {
                count
                heading
                key
                name
                slug
              }
            }
            otherSkills {
              sections
              skills {
                abbr
                count
                heading
                key
                slug
                name
              }
            }
          }
        }
      }
    }
  `);

  const skill: LinkedInSkillsSection | undefined = isNonEmptyArray(skills)
    ? skills.find(({ locale: loc }) => loc === locale)
    : undefined;

  const otherSkills =
    skill?.data?.otherSkills?.skills?.reduce<Record<string, TagEntity[]>>(
      (acc, cur) => {
        if (exists(acc)) {
          const heading = cur?.heading ?? '';
          return {
            ...acc,
            [heading]: [
              ...(heading in acc ? [...acc?.[heading]] : []),
              cur ?? {},
            ],
          };
        }
        return acc;
      },
      {},
    ) ?? {};

  const tagSortedByDesc = Object.entries(otherSkills).sort(([, a], [, b]) =>
    a?.length === b?.length ? 0 : a?.length > b?.length ? -1 : 1,
  );

  return (
    <div
      sx={{
        height: '100%',
        width: ['90vw', null, '40vw'],
        backgroundColor: 'white',
      }}>
      {tagSortedByDesc &&
        tagSortedByDesc.map(([sectionName, value]) => (
          <Section>
            {<h3>{sectionName}</h3>}
            <Flex sx={{ flexWrap: 'wrap' }}>
              {value.map(tag => (
                <div>
                  {toBadge(tag)}
                  {Number(tag?.count) > 0 && <LinkedInBadge tag={tag} />}
                </div>
              ))}
            </Flex>
          </Section>
        ))}
    </div>
  );
};

export default LinkedInSkillSection;
