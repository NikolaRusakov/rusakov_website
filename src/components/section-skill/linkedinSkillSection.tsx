/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import i18next from 'i18next';
import { graphql, useStaticQuery } from 'gatsby';
import { LinkedInSkillsQuery, TagEntity } from '../../../types/gatsby-graphql';
import { exists, isNonEmptyArray, pickBadgeName } from '../../utils/utils';
import { toBadge } from '../badge/badgeList';
import Img from 'gatsby-image/withIEPolyfill';
import LinkedInBadge from '../badge/linkedInBadge';

const nameId = (name: string) => name.toLowerCase().replace('.', '');

const imageByKeyOrAbbr = (keys: string[]) => (logoMap: any) => {
  return keys.map(key => nameId(key) in logoMap && logoMap[nameId(key)])[0];
};

const toGatsbyImage = (tag: TagEntity) => (logoMap: any) => {
  const searchIndexes = [tag?.abbr, tag?.key].filter(exists);
  const image = imageByKeyOrAbbr(searchIndexes)(logoMap);
  //fixme Types
  // @ts-ignore
  return (
    // @ts-ignore
    exists(image?.childImageSharp?.fluid) && (
      <Img
        // @ts-ignore
        fluid={image.childImageSharp.fluid}
        objectFit="contain"
        alt={nameId(tag.name ?? '')}
        sx={{
          height: ['2rem', '3rem', '4rem'],
          width: ['2rem', '3rem', '4rem'],
        }}
      />
    )
  );
};

const SkillContent: React.FC<{ tag: TagEntity; logoMap: any }> = ({
  tag,
  logoMap,
}) => (
  <React.Fragment>
    {exists(tag?.key) && toGatsbyImage(tag)(logoMap)}
    {Number(tag?.count) > 0 && (
      <Flex
        sx={{
          bottom: '-4%',
          transform: 'scale(0.7)',
          right: 'auto',
        }}>
        <LinkedInBadge tag={tag} />
      </Flex>
    )}
    {toBadge(pickBadgeName(tag, true), {
      whiteSpace: 'pre-wrap',
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': ' 2',
      margin: [0, '2px', '4px'],
    })}
  </React.Fragment>
);

const LinkedInSkillSection: React.FC = () => {
  const locale = i18next.language;

  const {
    linkedInSkills,
    logos: { edges },
  }: LinkedInSkillsQuery = useStaticQuery(graphql`
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
                abbr
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

      logos: allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }) {
        edges {
          node {
            base
            name
            childImageSharp {
              fluid(fit: INSIDE) {
                aspectRatio
                sizes
                src
                srcSet
                srcWebp
                base64
              }
            }
          }
        }
      }
    }
  `);

  const logoMap = edges.reduce(
    (acc, { node }) => ({
      ...acc,
      [node.name]: { ...node },
    }),
    {},
  );

  const linkedInskills = isNonEmptyArray(linkedInSkills?.skills)
    ? linkedInSkills?.skills.find(({ locale: loc }) => loc === locale)?.data
    : undefined;

  const otherSkills =
    linkedInskills?.otherSkills?.skills?.reduce<Record<string, TagEntity[]>>(
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
      <Flex sx={{ justifyContent: 'space-evenly' }}>
        {linkedInskills?.topSkills?.skills?.map(
          tag =>
            exists(tag) && (
              <Flex
                sx={{
                  position: 'relative',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <SkillContent tag={tag} logoMap={logoMap} />
              </Flex>
            ),
        )}
      </Flex>
      {tagSortedByDesc &&
        tagSortedByDesc.map(([sectionName, value]) => (
          <section>
            <h3>{sectionName}</h3>
            <Flex sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
              {value.map(tag => (
                <Flex
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    maxWidth: '25%',
                  }}>
                  <SkillContent tag={tag} logoMap={logoMap} />
                </Flex>
              ))}
            </Flex>
            <hr />
          </section>
        ))}
    </div>
  );
};

export default LinkedInSkillSection;
