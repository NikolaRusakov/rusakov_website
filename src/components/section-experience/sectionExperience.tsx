/** @jsx jsx */
import { Badge, Box, Divider, Flex, Heading, jsx } from 'theme-ui';
import React, { ReactNode, useState } from 'react';
import { useMorphList } from 'react-morph';
import i18next from 'i18next';
import { Lens } from 'monocle-ts';
import { SectionHeader } from '../section-header';
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
import badgeList, { toBadge } from '../badge/badgeList';

const renderMdx = (content: string) => (
  <React.Fragment>
    <MDXRenderer>{content}</MDXRenderer>
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
    allHighlight: { nodes: highlight },
    allSummary: { nodes: summary },
    allDetails: { nodes: details },
    companySections,
  }: {
    allHighlight: FileConnection;
    allSummary: FileConnection;
    allDetails: FileConnection;
    companySections: CompanySections;
  } = useStaticQuery(graphql`
    query HighlightPerSection {
      allHighlight: allFile(
        filter: {
          extension: { eq: "mdx" }
          relativeDirectory: { eq: "highlight" }
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

      allSummary: allFile(
        filter: {
          extension: { eq: "mdx" }
          relativeDirectory: { eq: "summary" }
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

    const highlights = highlight.filter(
      highlight => highlight.name == `${tmpCompanyKey}.${i18next.language}`,
    )[0];
    const detail = details.filter(
      detail => detail.name == `${tmpCompanyKey}.${i18next.language}`,
    )[0];

    const summaries = summary.filter(
      summary => summary.name == `${tmpCompanyKey}.${i18next.language}`,
    )[0];

    const companySection = companySections?.skills
      ?.filter(skill => skill?.locale == locale)[0]
      ?.data?.filter(section => section?.shortKey == tmpCompanyKey)[0];

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
          summary:
            summaries?.childMdx?.body && renderMdx(summaries.childMdx.body),
          detail: detail?.childMdx?.body && renderMdx(detail.childMdx.body),
          highlight:
            highlights?.childMdx?.body && renderMdx(highlights.childMdx.body),
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

  const [hideDetails, setSummary] = useState(
    expList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: true,
      }),
      {},
    ),
  );

  return (
    <div
      sx={{
        width: '100vw',
        // border: theme => `2px solid ${theme.colors.secondary}`,
        padding: 2,
        margin: 'auto',
      }}>
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
                summary,
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
          <div
            // variant="primary"
            sx={{}}>
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
                    <Box sx={{ maxWidth: ['100%', '80%', '80%'] }}>
                      {highlight}
                    </Box>
                  )}
                  {!hideDetails[expList[index]] && (
                    <div
                      sx={theme => ({
                        borderRadius: 2,
                        maxWidth: ['100%', '100%', '90%'],
                        bg: 'muted',
                        boxShadow: `0 0 2px ${theme.colors.secondary} inset`,
                        padding: '0.5em',
                        display: 'flex',
                        flexDirection: 'column',
                        // borderRadius: '2%',
                      })}>
                      <h2
                        sx={{
                          alignSelf: 'center',
                          padding: '0 5%',
                          borderBottom: theme =>
                            `3px solid ${theme.colors.primary}`,
                        }}>
                        {t('My opportunities')}
                      </h2>
                      {tagSections?.map(section => (
                        <Flex
                          sx={{
                            flexDirection: 'column',
                          }}>
                          <header
                            sx={{
                              display: 'flex',
                              width: '95%',
                              alignSelf: 'center',
                              borderBottom: theme =>
                                `1px solid ${theme.colors.text}`,
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
                                  : exists(tag.name) && toBadge(tag.name)),
                            )}
                          </Flex>
                        </Flex>
                      ))}
                      {/*<section*/}
                      {/*  {...morphs[index]}*/}
                      {/*  sx={{ maxWidth: ['100%', '70%', '70%'] }}>*/}
                      {/*  {skills}*/}
                      {/*</section>*/}
                    </div>
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
                            setSummary({
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
                      '&::-webkit-scrollbar': {
                        width: '0.8rem',
                        height: '0.5em',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: theme =>
                          `linear-gradient(180deg,${theme.colors.primary},${theme.colors.secondary})`,
                        borderRadius: '999px',
                        boxShadow:
                          'inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25)',
                      },
                      bg: 'muted',
                      boxShadow: theme =>
                        `inset 2px 2px 2px ${theme.colors.primary}, inset -2px -2px 2px ${theme.colors.secondary}`,
                      // border: theme =>
                      //   `2px solid ${
                      //     hideDetails[expList[index]]
                      //       ? theme.colors.primary
                      //       : theme.colors.secondary
                      //   }`,
                    }}>
                    {hideDetails[expList[index]] ? summary : detail}
                  </div>
                </Flex>
                {/*{skills && (*/}
                {/*  <Flex sx={{ flexDirection: 'column' }}>*/}
                {/*    {hideDetails[expList[index]] && (*/}
                {/*      // @ts-ignore*/}
                {/*      <section {...morphs[index]}>{skills}</section>*/}
                {/*    )}*/}
                {/*  </Flex>*/}
                {/*)}*/}
              </Flex>
            </Flex>
            <Divider sx={{ marginTop: 3, bg: 'primary' }} />
            {/*<SectionBody>*/}
            {/*  {{*/}
            {/*    location,*/}
            {/*    duration,*/}
            {/*    employment,*/}
            {/*    projects,*/}
            {/*    tags,*/}
            {/*  }}*/}
            {/*</SectionBody>*/}
          </div>
        ),
      )}
    </div>
  );
};

export default SectionExperience;
