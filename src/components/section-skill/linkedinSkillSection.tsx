/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React, { ReactNode } from 'react';
import i18next from 'i18next';
import { graphql, useStaticQuery } from 'gatsby';
import { LinkedInSkillsQuery, TagEntity } from '../../../types/gatsby-graphql';
import { exists, isNonEmptyArray, pickBadgeName } from '../../utils/utils';
import { toBadge } from '../badge/badgeList';
import Img, {
  GatsbyImageWithIEPolyfillProps,
} from 'gatsby-image/withIEPolyfill';
import LinkedInBadge from '../badge/linkedInBadge';

const nameId = (name: string) => name.toLowerCase().replace('.', '');

const imageByKeyOrAbbr = (keys: string[]) => (logoMap: any) => {
  return keys.map(key => nameId(key) in logoMap && logoMap[nameId(key)])[0];
};

const toGatsbyImageProps = (tag: TagEntity) => (
  logoMap: any,
): GatsbyImageWithIEPolyfillProps | undefined => {
  const searchIndexes = [tag?.abbr, tag?.key].filter(exists);
  const image = imageByKeyOrAbbr(searchIndexes)(logoMap);
  //fixme Types
  // @ts-ignore
  return exists(image?.childImageSharp?.fluid)
    ? {
        fluid: image.childImageSharp.fluid,
        objectFit: 'contain',
        alt: nameId(tag.name ?? ''),
      }
    : undefined;
};

interface Arguments {
  img?: GatsbyImageWithIEPolyfillProps;
  head: ReactNode;
}

const SkillContent: React.FC<{
  tag: TagEntity;
  logoMap: any;
  children: (args: Arguments) => JSX.Element;
}> = ({ tag, logoMap, children }) =>
  children({
    img: toGatsbyImageProps(tag)(logoMap),
    head: (
      <React.Fragment>
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
      </React.Fragment>
    ),
  });

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
              sections
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
    <Flex
      as="section"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '100%',
        // width: ['90vw', null, '40vw'],
        backgroundColor: 'white',
      }}>
      <Flex
        sx={{
          justifyContent: 'space-evenly',
          width: '90%',
          flexDirection: 'column',
        }}>
        <h2 sx={{ color: '#000', margin: theme => `${theme.space[2]}px auto` }}>
          {linkedInskills?.topSkills?.sections?.join(',')}
        </h2>
        <Flex
          sx={{
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
          }}>
          {linkedInskills?.topSkills?.skills?.map(
            tag =>
              exists(tag) && (
                <Flex
                  sx={{
                    position: 'relative',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <SkillContent tag={tag} logoMap={logoMap}>
                    {({ head, img }) => {
                      return (
                        <React.Fragment>
                          {exists(img) && (
                            <Img
                              {...img}
                              sx={{ width: ['5rem', null, '6rem'] }}
                            />
                          )}
                          {head}
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
                    }}
                  </SkillContent>
                </Flex>
              ),
          )}
        </Flex>
        <hr />
      </Flex>
      {tagSortedByDesc &&
        tagSortedByDesc.map(([sectionName, value]) => (
          <Flex
            sx={{
              width: value.length > 4 ? '100%' : '50%',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            <section
              sx={{
                flexDirection: 'column',
                display: 'flex',
              }}>
              <h2
                sx={{
                  color: '#000',
                  margin: theme => `${theme.space[2]}px auto`,
                }}>
                {sectionName}
              </h2>
              <Flex
                sx={{
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                }}>
                {value.map(tag => (
                  <Flex
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                      maxWidth: value.length === 1 ? '100%' : '25%',
                      m: 2,
                    }}>
                    <SkillContent tag={tag} logoMap={logoMap}>
                      {({ head, img }) => {
                        return (
                          <React.Fragment>
                            <Img
                              {...img}
                              sx={{
                                width: ['4rem', null, '3rem'],
                                height: ['4rem', null, '3rem'],
                              }}
                            />
                            {head}
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
                      }}
                    </SkillContent>
                  </Flex>
                ))}
              </Flex>
              <hr />
            </section>
          </Flex>
        ))}
    </Flex>
  );
};

export default LinkedInSkillSection;
