/** @jsx jsx */
import { Badge, Box, Divider, Flex, Heading, jsx } from 'theme-ui';
import React, { ReactNode, useState } from 'react';
import { useMorphList } from 'react-morph';
import i18n from 'i18next';
import i18next from 'i18next';
import { Lens } from 'monocle-ts';
import { SectionHeader } from '../section-header';
import { Section } from '../section';
import { SectionHeaderProps } from '../section-header/sectionHeader';
import { SectionBodyProps } from '../section-body/sectionBody';
import data from '../../data/linkedin';
import Checkbox from '../checkbox/checkbox';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useTranslation } from 'react-i18next';
import {
  CompanySections,
  FileConnection,
  TagEntity,
} from '../../../types/gatsby-graphql';
import { exists } from '../../utils/utils';
import badgeList, { toBadge } from '../badge-list/badgeList';

const renderMdx = (highlight: string) => (
  <React.Fragment>
    <MDXRenderer>{highlight}</MDXRenderer>
  </React.Fragment>
);

const renderBadges = ({
  tags,
  badge,
  variant,
}: {
  tags: TagEntity[];
  badge: keyof TagEntity;
  variant: 'primary' | 'outline' | 'muted';
}) =>
  tags.map((entity, index) => (
    <Badge key={`tag-${entity.name}-${index}`} variant={variant} py={0} m={1}>
      <span>{entity[badge]}</span>
    </Badge>
  ));

//TODO: data fetching will be combined with StaticQuery from automated JSON
export const SectionExperienceHOC = () => {
  const locale = i18next.language;
  const {
    allHighlights: { nodes: highlights },
    allDetails: { nodes: details },
    companySections,
  }: {
    allHighlights: FileConnection;
    allDetails: FileConnection;
    companySections: CompanySections;
  } = useStaticQuery(graphql`
    query HighlightPerSection {
      allHighlights: allFile(
        filter: {
          extension: { eq: "mdx" }
          relativeDirectory: { eq: "highlights" }
        }
      ) {
        nodes {
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
        nodes {
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
        nodes {
          relativeDirectory
          name
          base
          extension
          childMdx {
            body
          }
        }
      }

      companySections {
        skills {
          locale
          data {
            shortKey
            sections {
              section
              tags {
                name
                key
                count
                heading
                tags {
                  name
                  key
                  count
                  heading
                }
              }
            }
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
      highlight => highlight.name == `${tmpCompanyKey}.${i18n.language}`,
    )[0];
    const detail = details.filter(
      detail => detail.name == `${tmpCompanyKey}.${i18n.language}`,
    )[0];

    const companySection = companySections?.skills
      ?.filter(skill => skill?.locale == locale)[0]
      ?.data?.filter(section => section?.shortKey == tmpCompanyKey)[0];
    // const mapTagSections = (skills: Array<Maybe<SkillCompanySection>>) =>
    //   skills
    //     ?.filter(skill => skill?.locale == locale)
    //     .map(companySection => {
    //       companySection?.data
    //         ?.filter(section => section?.shortKey == tmpCompanyKey)
    //         .map(value => value?.sections);
    //     });
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
          projects: renderBadges({
            tags: body.children.projects,
            variant: 'outline',
            badge: 'abbr',
          }),
          highlight:
            highlight?.childMdx?.body && renderMdx(highlight.childMdx.body),
          detail: detail?.childMdx?.body && renderMdx(detail.childMdx.body),
          tagSections:
            companySection?.sections != null
              ? companySection.sections
              : undefined,
          tags: renderBadges({
            tags: body.children.tags,
            variant: 'outline',
            badge: 'slug',
          }),
          skills:
            body.children.skills &&
            renderBadges({
              tags: body.children.skills,
              variant: 'outline',
              badge: 'name',
            }),
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
                tagSections,
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
                  {hideDetails[expList[index]] && (
                    <Box sx={{ maxWidth: ['100%', '70%', '70%'] }}>
                      {highlight}
                    </Box>
                  )}
                  {!hideDetails[expList[index]] && (
                    <React.Fragment>
                      {tagSections?.map(section => (
                        <Flex
                          sx={{
                            flexDirection: 'column',
                            bg: 'muted',
                            maxWidth: ['100%', '100%', '90%'],
                          }}>
                          <header
                            sx={{
                              display: 'flex',
                              width: '95%',
                              alignSelf: 'center',
                              borderBottom: theme =>
                                `1px solid ${theme.colors.primary}`,
                            }}>
                            <Box
                              sx={{
                                marginBottom: 0,
                                px: 1,
                                fontWeight: 'bold',
                                color: 'background',
                                bg: 'text',
                                textTransform: 'uppercase',
                                borderTopLeftRadius: 1,
                                borderTopRightRadius: 1,
                              }}
                              px={1}
                              my={1}
                              mr={1}>
                              {section?.section}
                            </Box>
                          </header>
                          <Flex
                            sx={{
                              flexWrap: 'wrap',
                              py: 1,
                              alignItems: 'baseline',
                            }}>
                            {section?.tags?.map(
                              tag =>
                                exists(tag) &&
                                (exists(tag?.tags)
                                  ? badgeList(tag?.tags)
                                  : toBadge(tag)),
                            )}
                          </Flex>
                        </Flex>
                      ))}
                      <section
                        {...morphs[index]}
                        sx={{ maxWidth: ['100%', '70%', '70%'] }}>
                        {skills}
                      </section>
                    </React.Fragment>
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
