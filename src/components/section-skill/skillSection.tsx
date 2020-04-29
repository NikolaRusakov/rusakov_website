/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import hardSkill from '../../data/generated/hard-skills.json';

const SkillSection: React.FC = () => {
  const {
    logos: { edges },
  } = useStaticQuery(graphql`
    {
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

  const imageExists = (name: string) => name in logoMap;

  const skills: {
    section: string;
    items: { [key: number]: { name: string }[] };
  }[] = hardSkill.data.map(({ section, items }) => ({
    section,
    items: items.reduce((acc, { name, position }) => {
      return {
        ...acc,
        [position]: [...(position in acc ? acc[position] : []), { name }],
      };
    }, {}),
  }));

  return (
    <Flex sx={{ bg: 'secondary' }}>
      <div sx={{ width: ['90vw', null, '40vw'], backgroundColor: 'white' }}>
        {skills.map(({ section, items }) => (
          <div sx={{ display: 'flex', flexDirection: 'column' }}>
            <div
              sx={{
                bg: theme =>
                  theme.colors.highlight ||
                  theme.colors.accent ||
                  theme.colors.muted,
              }}>
              <h1
                sx={{
                  alignSelf: 'center',
                  margin: '0 !important',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                {section}
              </h1>
            </div>
            <section
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                border: theme => `1px solid ${theme.colors.background}`,
              }}>
              {Object.entries(items).map(([_, skillItems], index) => (
                <Flex
                  sx={{
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                  }}>
                  {skillItems.map(({ name }, index, array) => {
                    const nameId = name.toLowerCase().replace('.', '');
                    return (
                      <div
                        sx={{
                          display: 'flex',
                          flex: 'auto',
                          flexDirection: 'column',
                          alignItems: 'center',
                          flexWrap: 'wrap-reverse',
                          py: 1,
                          ...(array.length === 1 && {
                            flexDirection: 'row',
                            justifyContent: 'center',
                            fontSize: 4,
                          }),
                        }}>
                        <span sx={{ color: 'black' }}>{name}</span>
                        {imageExists(nameId) && (
                          <Img
                            fluid={logoMap[nameId].childImageSharp.fluid}
                            alt={logoMap[nameId]?.name}
                            objectFit="contain"
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                            sx={{
                              width: 28,
                              height: 28,
                              ...(array.length === 1 && {
                                m: 1,
                                width: 42,
                                height: 42,
                              }),
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  <hr
                    sx={{ width: '80%', marginBottom: ['4px', '6px', '8px'] }}
                  />
                </Flex>
              ))}
            </section>
          </div>
        ))}
      </div>
    </Flex>
  );
};
export default SkillSection;
