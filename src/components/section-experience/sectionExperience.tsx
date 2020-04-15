/** @jsx jsx */
import { jsx, Divider, Badge, Flex, Box, Heading } from 'theme-ui';
import React, { ReactNode, useState } from 'react';
import { useMorphList } from 'react-morph';

// @ts-ignore
import loadable from '@loadable/component';

import { Lens } from 'monocle-ts';
import { SectionHeader } from '../section-header';
import { Section } from '../section';
import { SectionHeaderProps } from '../section-header/sectionHeader';
import { SectionBodyProps } from '../section-body/sectionBody';
import data from '../../data/linkedin';
import Checkbox from '../checkbox/checkbox';

export interface TagEntity {
  name: string;
  abbr?: string;
  slug?: string;
  count?: string;
}

const renderBadges = (tags: TagEntity[], badge: keyof TagEntity) =>
  tags.map((entity, index) => (
    <Badge key={`tag-${entity.slug}-${index}`} variant="outline" py={0} m={1}>
      <code>{entity[badge]}</code>
    </Badge>
  ));

//TODO: data fetching will be combined with StaticQuery from automated JSON
export const SectionExperienceHOC = () => {
  const preparedData: {
    header: SectionHeaderProps;
    body: SectionBodyProps<ReactNode>;
  }[] = data.experience.map(({ header, body }) => ({
    header: Lens.fromPath<SectionHeaderProps>()([
      'experience',
      'company',
    ]).modify(
      company => company?.replace(header.experience.employment ?? '', '') ?? '',
    )(header),
    body: {
      ...body,
      children: {
        ...body.children,
        ...header.experience,
        projects: renderBadges(body.children.projects, 'abbr'),
        tags: renderBadges(body.children.tags, 'slug'),
        skills:
          body.children.skills && renderBadges(body.children.skills, 'name'),
      },
    },
  }));
  return <SectionExperience experience={preparedData} />;
};

const SectionExperience: React.FC<{
  experience: {
    header: SectionHeaderProps;
    body: SectionBodyProps<ReactNode>;
  }[];
}> = ({ experience }) => {
  const expUUID = 'experience-section';
  const expList = experience.map((_, index) => `${expUUID}-${index}`);
  const toggleList = experience.map((_, index) => `${expUUID}-toggle-${index}`);

  const toggleMorphs = useMorphList(toggleList);

  const morphs = useMorphList(
    expList /*, {
    spring: {
      restDisplacementThreshold: 0.05,
      overshootClamping: false,
    },
  }*/,
  );

  const [showHighlight, setHighlight] = useState(
    expList.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: true,
      };
    }, {}),
  );

  //fixme maybe consider pattern like https://reacttraining.com/react-router/web/example/route-config
  const Highlight = loadable(props => import(`@mdx/highlights/futuretek`));

  return (
    <React.Fragment>
      {experience.map(
        (
          {
            body: {
              children: {
                duration,
                employment,
                location,
                projects,
                skills,
                tags,
              },
            },
            header: { experience, externalProps },
          },
          index,
        ) => (
          <Section variant="primary" sx={{ width: '90vw', margin: 'auto' }}>
            <Flex
              sx={{
                flexDirection: ['column', 'column', 'row'],
                alignItems: 'baseline',
              }}>
              <Flex sx={{ maxWidth: ['100%', '50%', '50%'] }}>
                <SectionHeader
                  experience={experience}
                  externalProps={externalProps}>
                  <Box sx={{ maxWidth: ['100%', '75%', '75%'] }}>
                    <Highlight />
                  </Box>
                  {!showHighlight[expList[index]] && (
                    <section
                      {...morphs[index]}
                      sx={{ maxWidth: ['100%', '75%', '75%'] }}>
                      <Divider />
                      {skills}
                    </section>
                  )}
                </SectionHeader>
              </Flex>
              <Flex
                sx={{
                  width: 'fit-content',
                  flexDirection: 'column',
                  alignSelf: 'flex-start',
                  '& > ol': {
                    textOverflow: 'ellipsis',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                  },
                  '& > h1, & > h2': {
                    textAlign: 'right',
                  },
                  '& > h3, & > h4, & > h5, & > h6': {
                    textAlign: 'right',
                    marginTop: '1ch',
                    paddingLeft: '2ch',
                  },
                }}>
                <Flex
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    maxWidth: ['45%', '50%', '50%'],
                    alignSelf: 'flex-end',
                  }}>
                  <Heading
                    sx={{
                      fontSize: [2, 2, 3],
                      width: '14ch',
                      textAlign: 'end',
                      borderBottom: theme =>
                        `2px solid ${theme.colors.primary}`,
                    }}
                    as="h3">
                    {experience.company}
                  </Heading>
                </Flex>
                <Flex sx={{ flexDirection: 'column' }}>
                  <Flex sx={{ mt: 2, alignSelf: 'flex-end' }}>
                    <label sx={{ display: 'flex' }}>
                      <Flex
                        sx={{
                          flexDirection: 'column',
                          mr: 2,
                          alignItems: 'flex-end',
                        }}>
                        <Flex>
                          {showHighlight[expList[index]] && (
                            <span
                              {...toggleMorphs[index]}
                              sx={{
                                '&:before': {
                                  content: "'\\21A0'",
                                  color: 'primary',
                                },
                              }}
                            />
                          )}
                          <span>{'Highlight'}</span>
                        </Flex>

                        <Flex>
                          {!showHighlight[expList[index]] && (
                            <span
                              {...toggleMorphs[index]}
                              sx={{
                                '&:before': {
                                  content: "'\\21A0'",
                                  color: 'secondary',
                                },
                              }}
                            />
                          )}
                          <span>{'Detailed'}</span>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Checkbox
                          onClick={() =>
                            setHighlight({
                              ...showHighlight,
                              [expList[index]]: !showHighlight[expList[index]],
                            })
                          }
                        />
                      </Flex>
                    </label>
                  </Flex>
                  <Highlight />
                </Flex>
                {skills && (
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Divider sx={{ width: '100%' }} />
                    {showHighlight[expList[index]] && (
                      // @ts-ignore
                      <section {...morphs[index]}>{skills}</section>
                    )}
                  </Flex>
                )}
              </Flex>
            </Flex>
            <Divider />
            {/*<SectionBody>*/}
            {/*  {{*/}
            {/*    location,*/}
            {/*    duration,*/}
            {/*    employment,*/}
            {/*    projects,*/}
            {/*    tags,*/}
            {/*  }}*/}
            {/*</SectionBody>*/}
          </Section>
        ),
      )}
    </React.Fragment>
  );
};

export default SectionExperience;
