/** @jsx jsx */
import { jsx, Divider, Badge, Flex, Box, Heading } from 'theme-ui';
import React, { ReactNode, useState } from 'react';
import { useMorphList } from 'react-morph';
import i18n from 'i18next';
import { Lens } from 'monocle-ts';
import { SectionHeader } from '../section-header';
import { Section } from '../section';
import { SectionHeaderProps } from '../section-header/sectionHeader';
import { SectionBodyProps } from '../section-body/sectionBody';
import data from '../../data/linkedin';
import Checkbox from '../checkbox/checkbox';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTranslation } from 'react-i18next';

export interface TagEntity {
  name: string;
  abbr?: string;
  slug?: string;
  count?: string;
}

const renderMdx = (highlight: string) => (
  <React.Fragment>
    <MDXRenderer>{highlight}</MDXRenderer>
  </React.Fragment>
);

const renderBadges = (tags: TagEntity[], badge: keyof TagEntity) =>
  tags.map((entity, index) => (
    <Badge key={`tag-${entity.slug}-${index}`} variant="outline" py={0} m={1}>
      <span>{entity[badge]}</span>
    </Badge>
  ));

//TODO: data fetching will be combined with StaticQuery from automated JSON
export const SectionExperienceHOC = () => {
  const {
    allHighlights: { highlights },
    allDetails: { details },
  } = useStaticQuery(graphql`
    query HighlightPerSection {
      allHighlights: allFile(
        filter: {
          extension: { eq: "mdx" }
          relativeDirectory: { eq: "highlights" }
        }
      ) {
        highlights: nodes {
          relativeDirectory
          name
          base
          extension
          childMdx {
            body
          }
        }
      }

      allDetails: allFile(
        filter: {
          extension: { eq: "mdx" }
          relativeDirectory: { eq: "details" }
        }
      ) {
        details: nodes {
          relativeDirectory
          name
          base
          extension
          childMdx {
            body
          }
        }
      }
      localTags: allFile(
        filter: {
          extension: { eq: "json" }
          relativeDirectory: { eq: "generated" }
        }
      ) {
        details: nodes {
          relativeDirectory
          name
          base
          extension
          childMdx {
            body
          }
        }
      }
    }
  `);

  const preparedData: {
    header: SectionHeaderProps;
    body: SectionBodyProps<ReactNode>;
  }[] = data.experience.map(({ header, body }) => {
    const tmpCompanyKey = header?.experience?.company
      ?.split(' ')[0]
      .toLocaleLowerCase();
    const highlight = highlights.filter(
      // @ts-ignore
      highlight => highlight.name == `${tmpCompanyKey}.${i18n.language}`,
    )[0];
    const detail = details.filter(
      // @ts-ignore
      detail => detail.name == `${tmpCompanyKey}.${i18n.language}`,
    )[0];

    return {
      header: Lens.fromPath<SectionHeaderProps>()([
        'experience',
        'company',
      ]).modify(
        company =>
          company?.replace(header.experience.employment ?? '', '') ?? '',
      )(header),
      body: {
        ...body,
        children: {
          ...body.children,
          ...header.experience,
          projects: renderBadges(body.children.projects, 'abbr'),
          highlight:
            highlight?.childMdx?.body && renderMdx(highlight.childMdx.body),
          detail: detail?.childMdx?.body && renderMdx(detail.childMdx.body),
          tags: renderBadges(body.children.tags, 'slug'),
          skills:
            body.children.skills && renderBadges(body.children.skills, 'name'),
        },
      },
    };
  });
  return <SectionExperience experience={preparedData} />;
};

const SectionExperience: React.FC<{
  experience: {
    header: SectionHeaderProps;
    body: SectionBodyProps<ReactNode>;
  }[];
}> = ({ experience }) => {
  const { t } = useTranslation();

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

  const [hideDetails, setHighlight] = useState(
    expList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: false,
      }),
      {},
    ),
  );

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
                highlight,
                detail,
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
                  <Box sx={{ maxWidth: ['100%', '70%', '70%'] }}>
                    {highlight}
                  </Box>
                  {!hideDetails[expList[index]] && (
                    <section
                      {...morphs[index]}
                      sx={{ maxWidth: ['100%', '70%', '70%'] }}>
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
                  flexGrow: 1,
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
                          {hideDetails[expList[index]] && (
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
                          <span>{t('about:Summary')}</span>
                        </Flex>

                        <Flex>
                          {!hideDetails[expList[index]] && (
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
                          <span>{t('about:Detailed Overview')}</span>
                        </Flex>
                      </Flex>
                      <Flex>
                        <Checkbox
                          onClick={() =>
                            setHighlight({
                              ...hideDetails,
                              [expList[index]]: !hideDetails[expList[index]],
                            })
                          }
                        />
                      </Flex>
                    </label>
                  </Flex>

                  <div
                    sx={{
                      transition:
                        'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
                      maxHeight: ['25em', '35em', '50em'],
                      marginTop: 2,
                      borderRadius: 2,
                      padding: 1,
                      overflowY: 'scroll',
                      bg: 'muted',
                      border: theme =>
                        `2px solid ${
                          hideDetails[expList[index]]
                            ? theme.colors.primary
                            : theme.colors.secondary
                        }`,
                      // boxShadow: theme =>
                      //   `0 0 4px 0 ${theme.colors.secondary} inset, 0 0 2px 0 ${theme.colors.primary}`,
                    }}>
                    {hideDetails[expList[index]] ? highlight : detail}
                  </div>
                </Flex>
                {skills && (
                  <Flex sx={{ flexDirection: 'column' }}>
                    {hideDetails[expList[index]] && (
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
