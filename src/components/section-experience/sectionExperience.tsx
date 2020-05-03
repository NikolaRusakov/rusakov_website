/** @jsx jsx */
import { Badge, Box, Divider, Flex, Heading, Image, jsx } from 'theme-ui';
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
import { transparentize } from 'polished';
import anime from 'animejs';

import { Flipper, Flipped, spring } from 'react-flip-toolkit';
import { Global } from '@emotion/core';

const SummaryArticle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <article
    sx={{
      mx: 2,
      mt: 2,
      // mb: 2,
      color: 'text',
      bg: 'background',
      '& details summary::-webkit-details-marker': {
        display: 'none',
      },
      'details > summary:before': {
        ml: 2,
        position: 'absolute',
        content: '"+"',
        display: 'flex',
        alignItems: 'center',
        color: 'secondary',
        justifyContent: 'center',
        border: theme => `2px solid ${theme.colors.primary}`,
        borderRadius: 3,
        fontWeight: 'bold',
        width: theme => theme.fontSizes[4],
        height: theme => theme.fontSizes[4],
        fontSize: theme => theme.fontSizes[4],
      },
      'details[open] > summary:before': {
        position: 'absolute',
        content: '"-"',
        display: 'flex',
        alignItems: 'center',
        color: 'primary',
        justifyContent: 'center',
        fontWeight: 'bold',
        borderRadius: 3,
        width: theme => theme.fontSizes[4],
        border: theme => `2px solid ${theme.colors.secondary}`,
        height: theme => theme.fontSizes[4],
        fontSize: theme => theme.fontSizes[4],
      },
      'details > summary h2': {
        textAlign: 'center',
        color: 'primary',
        margin: theme => `${theme.space[2]}px ${theme.space[4]}px`,
      },
      h2: {
        textAlign: 'center',
        color: 'primary',
        margin: theme => `${theme.space[2]}px ${theme.space[4]}px`,
      },
    }}>
    {children}
  </article>
);

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

const ExpandedHeaderSection: React.FC<{
  header: SectionHeaderProps;
  index: number;
}> = ({ index, header: { experience } }) => {
  return (
    <>
      <Flex
        sx={{
          gridColumn: 1,
          gridRow: 1,
          alignItems: ['flex-start', 'center', 'center'],
          flexDirection: ['column', 'row', 'row'],
        }}>
        <Flipped flipId={`companyLogo-${index}-${experience.company}`}>
          <Flex sx={{ minWidth: '48px', m: 1 }}>
            <Image
              src={experience.companyLogo}
              variant="avatar"
              sx={{
                height: ['36px', null, '48px'],
                width: ['36px', null, '48px'],
              }}
            />
          </Flex>
        </Flipped>
        <Flipped flipId={`company-${index}-${experience.company}`}>
          <Flex>
            <h3
              sx={{
                ml: 1,
                margin: '0px',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': ' 2',
              }}>
              {experience.company}
            </h3>
          </Flex>
        </Flipped>
      </Flex>
      <Flex sx={{ gridColumn: 2, gridRow: 1 }}>
        <Flipped flipId={`title-${index}-${experience.company}`}>
          <h2>{experience.position}</h2>
        </Flipped>
      </Flex>
    </>
  );
};

const HiddenHeaderSection: React.FC<{
  header: SectionHeaderProps;
  index: number;
}> = ({ index, header: { experience, externalProps } }) => (
  <>
    <Flex
      sx={{
        gridColumn: '2',
        gridRow: '1',
        flexDirection: 'column',
        alignItems: 'center',
        my: 3,
      }}>
      <Flipped flipId={`company-${index}-${experience.company}`}>
        <h2>{experience.company}</h2>
      </Flipped>
      <Flipped flipId={`companyLogo-${index}-${experience.company}`}>
        <Image
          src={experience.companyLogo}
          variant="avatar"
          sx={{
            height: ['64px', null, '96px'],
            width: ['64px', null, '96px'],
          }}
        />
      </Flipped>
      <Flex
        sx={{
          py: 1,
          flexWrap: 'wrap',
        }}>
        {externalProps?.badges?.map?.((value, i) => (
          <Flipped flipId={`badge-${index}-${experience.company}-${i}`}>
            <Badge variant="primary" px={1} my={1} mr={1}>
              {value}
            </Badge>
          </Flipped>
        ))}
      </Flex>
      <Flipped flipId={`title-${index}-${experience.company}`}>
        <h2>{experience.position}</h2>
      </Flipped>
      <Flipped flipId={`yoe-badge-${index}-${experience.company}`}>
        <Badge variant="primary" sx={{ justifySelf: 'center' }}>
          {experience.duration} <span> | YOE </span>
        </Badge>
      </Flipped>
    </Flex>
  </>
);

const HiddenSectionBody: React.FC<{
  index: number;
  children: SectionBodyProps<ReactNode>;
  header: SectionHeaderProps;
}> = ({
  index,
  children: {
    children: { summary, highlight },
  },
  header: { experience },
}) => (
  <div>
    <Flipped flipId={`summary-${index}-${experience.company}`}>
      <div>
        <SummaryArticle>{summary}</SummaryArticle>
      </div>
    </Flipped>
    <Flipped
      flipId={`detail-${index}-${experience.company}`}
      stagger={`summary-${index}-${experience.company}`}
      delayUntil={`summary-${index}-${experience.company}`}>
      <div>
        <SummaryArticle>{highlight}</SummaryArticle>
      </div>
    </Flipped>
  </div>
);

const ExpandedSectionBody: React.FC<{
  index: number;
  children: SectionBodyProps<ReactNode>;
  header: SectionHeaderProps;
}> = ({ index, children: { children }, header }) => (
  <Flex sx={{ flexDirection: 'column' }}>
    <Flex
      sx={{
        flexDirection: 'column',
        position: 'relative',
      }}>
      <Flipped flipId={`yoe-badge-${index}-${header.experience.company}`}>
        <Badge variant="primary" sx={{ alignSelf: 'center' }}>
          {header.experience.duration} <span> | YOE </span>
        </Badge>
      </Flipped>
      <Flex
        sx={{
          // py: 1,
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          zIndex: '1001',
        }}>
        {header.externalProps?.badges?.map?.((value, i) => (
          <Flipped flipId={`badge-${index}-${header.experience.company}-${i}`}>
            <Badge variant="primary" px={1} my={1} mr={1}>
              {value}
            </Badge>
          </Flipped>
        ))}
      </Flex>
      <Flipped flipId={`detail-${index}-${header.experience.company}`}>
        <section>'## This is it'</section>
      </Flipped>
    </Flex>
    <Flipped flipId={`summary-${index}-${header.experience.company}`}>
      <div
        sx={{
          '& p, li ': { fontSize: 'smaller' },
          '&  strong': {
            fontWeight: 'bolder',
            color: 'primary',
          },
        }}>
        {children.detail}
      </div>
    </Flipped>
  </Flex>
);

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

  const [hideDetail, toggleDetail] = useState(
    expList.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: true,
      }),
      {},
    ),
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
      {experience.map(({ body: { children }, header }, index) => (
        <Flipper
          flipKey={hideDetail[expList[index]]}
          spring={{ stiffness: 280, damping: 22 }}
          // spring="veryGentle"
        >
          <Global
            styles={theme => ({
              '.hidden': {
                margin: 'auto',
                transition: 'all 0.3s ease-in-out',
              },
              '.expanded': {
                margin: 'auto',
                width: '90vw !important',
                transition: 'all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
              },
            })}
          />
          <div
            className={hideDetail[expList[index]] ? 'hidden' : 'expanded'}
            sx={{
              width: ['80vw', '80vw', '50vw'],
              margin: 'auto',
              bg: 'muted',
            }}>
            <header
              sx={{
                display: 'grid',
                gridGap: 1,
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                variant: 'styles.header',
              }}>
              <label
                sx={{
                  gridColumn: '3',
                  gridRow: '1',
                  display: 'flex',
                  alignSelf: 'self-start',
                  flexDirection: 'row-reverse',
                }}>
                <Checkbox
                  onClick={() =>
                    toggleDetail({
                      ...hideDetail,
                      [expList[index]]: !hideDetail[expList[index]],
                    })
                  }
                />
              </label>
              {hideDetail[expList[index]] ? (
                <HiddenHeaderSection index={index} header={header} />
              ) : (
                <ExpandedHeaderSection index={index} header={header} />
              )}
            </header>
            <div
              sx={{
                // width: theme =>
                //   hideDetail[expList[index]]
                //     ? ['80vw', '80vw', '50vw']
                //     : '80vw',
                maxWidth: hideDetail[expList[index]] ? '100%' : '80%',
                margin: 'auto',
                bg: 'muted',
              }}>
              <Flex
                sx={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                  bg: 'muted',
                }}>
                <section
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    //        '& article': {
                    //          boxShadow: theme =>
                    //            `0px 2px 2px 2px ${theme.colors.background}`,
                    //        },
                    //        '& article:not(:last-child)': {
                    //          boxShadow: theme =>
                    //            `0px 2px 2px 2px ${theme.colors.background}
                    // ,0px 4px 2px 0px ${theme.colors.secondary}`,
                    //        },
                    '& article:last-child': {
                      mb: 2,
                    },
                  }}>
                  {hideDetail[expList[index]] ? (
                    <HiddenSectionBody
                      index={index}
                      children={{ children: children }}
                      header={header}
                    />
                  ) : (
                    <ExpandedSectionBody
                      index={index}
                      children={{ children: children }}
                      header={header}
                    />
                  )}
                </section>
              </Flex>
              <Divider
                sx={{
                  marginTop: 3,
                  bg: 'primary',
                }}
              />
            </div>
          </div>
        </Flipper>
      ))}
    </div>
  );
};

export default SectionExperience;

{
  /*<SectionHeader*/
}
{
  /*  experience={experience}*/
}
{
  /*  externalProps={externalProps}>*/
}
{
  /*  {hideDetails[expList[index]] && (*/
}
{
  /*    <Box sx={{ maxWidth: ['100%', '80%', '80%'] }}>*/
}
{
  /*      {highlight}*/
}
{
  /*    </Box>*/
}
{
  /*  )}*/
}
{
  /*  {!hideDetails[expList[index]] && (*/
}
{
  /*    <div*/
}
{
  /*      sx={theme => ({*/
}
{
  /*        borderRadius: 2,*/
}
{
  /*        maxWidth: ['100%', '100%', '90%'],*/
}
{
  /*        bg: 'muted',*/
}
{
  /*        boxShadow: `0 0 2px ${theme.colors.secondary} inset`,*/
}
{
  /*        padding: '0.5em',*/
}
{
  /*        display: 'flex',*/
}
{
  /*        flexDirection: 'column',*/
}
{
  /*        // borderRadius: '2%',*/
}
{
  /*      })}>*/
}
{
  /*      <h2*/
}
{
  /*        sx={{*/
}
{
  /*          alignSelf: 'center',*/
}
{
  /*          padding: '0 5%',*/
}
{
  /*          borderBottom: theme =>*/
}
{
  /*            `3px solid ${theme.colors.primary}`,*/
}
{
  /*        }}>*/
}
{
  /*        {t('My opportunities')}*/
}
{
  /*      </h2>*/
}
{
  /*      {tagSections?.map(section => (*/
}
{
  /*        <Flex*/
}
{
  /*          sx={{*/
}
{
  /*            flexDirection: 'column',*/
}
{
  /*          }}>*/
}
{
  /*          <header*/
}
{
  /*            sx={{*/
}
{
  /*              display: 'flex',*/
}
{
  /*              width: '95%',*/
}
{
  /*              alignSelf: 'center',*/
}
{
  /*              borderBottom: theme =>*/
}
{
  /*                `1px solid ${theme.colors.text}`,*/
}
{
  /*            }}>*/
}
{
  /*            <Box*/
}
{
  /*              sx={{*/
}
{
  /*                marginBottom: 0,*/
}
{
  /*                px: 1,*/
}
{
  /*                fontWeight: 'bold',*/
}
{
  /*                color: 'background',*/
}
{
  /*                bg: 'text',*/
}
{
  /*                textTransform: 'uppercase',*/
}
{
  /*                borderTopLeftRadius: 1,*/
}
{
  /*                borderTopRightRadius: 1,*/
}
{
  /*              }}*/
}
{
  /*              px={1}*/
}
{
  /*              my={1}*/
}
{
  /*              mr={1}>*/
}
{
  /*              {section?.section}*/
}
{
  /*            </Box>*/
}
{
  /*          </header>*/
}
{
  /*          <Flex*/
}
{
  /*            sx={{*/
}
{
  /*              flexWrap: 'wrap',*/
}
{
  /*              py: 1,*/
}
{
  /*              alignItems: 'baseline',*/
}
{
  /*            }}>*/
}
{
  /*            {section?.tags?.map(*/
}
{
  /*              tag =>*/
}
{
  /*                exists(tag) &&*/
}
{
  /*                (exists(tag?.tags)*/
}
{
  /*                  ? badgeList(tag?.tags)*/
}
{
  /*                  : exists(tag.name) && toBadge(tag.name)),*/
}
{
  /*            )}*/
}
{
  /*          </Flex>*/
}
{
  /*        </Flex>*/
}
{
  /*      ))}*/
}
{
  /*      /!*<section*!/*/
}
{
  /*      /!*  {...morphs[index]}*!/*/
}
{
  /*      /!*  sx={{ maxWidth: ['100%', '70%', '70%'] }}>*!/*/
}
{
  /*      /!*  {skills}*!/*/
}
{
  /*      /!*</section>*!/*/
}
{
  /*    </div>*/
}
{
  /*  )}*/
}
{
  /*</SectionHeader>*/
}
{
  /*</Flex>*/
}
{
  /*<Flex*/
}
{
  /*  sx={{*/
}
{
  /*    width: 'fit-content',*/
}
{
  /*    flexDirection: 'column',*/
}
{
  /*    alignSelf: 'flex-start',*/
}
{
  /*    flexGrow: 1,*/
}
{
  /*    '& > ol': {*/
}
{
  /*      textOverflow: 'ellipsis',*/
}
{
  /*      wordWrap: 'break-word',*/
}
{
  /*      whiteSpace: 'pre-line',*/
}
{
  /*    },*/
}
{
  /*    '& > h1, & > h2': {*/
}
{
  /*      textAlign: 'right',*/
}
{
  /*    },*/
}
{
  /*    '& > h3, & > h4, & > h5, & > h6': {*/
}
{
  /*      textAlign: 'right',*/
}
{
  /*      marginTop: '1ch',*/
}
{
  /*      paddingLeft: '2ch',*/
}
{
  /*    },*/
}
{
  /*  }}>*/
}
{
  /*  <Flex*/
}
{
  /*    sx={{*/
}
{
  /*      flexDirection: 'column',*/
}
{
  /*      alignItems: 'flex-end',*/
}
{
  /*      maxWidth: ['45%', '50%', '50%'],*/
}
{
  /*      alignSelf: 'flex-end',*/
}
{
  /*    }}>*/
}
{
  /*    <Heading*/
}
{
  /*      sx={{*/
}
{
  /*        fontSize: [2, 2, 3],*/
}
{
  /*        width: '14ch',*/
}
{
  /*        textAlign: 'end',*/
}
{
  /*        borderBottom: theme =>*/
}
{
  /*          `2px solid ${theme.colors.primary}`,*/
}
{
  /*      }}*/
}
{
  /*      as="h3">*/
}
{
  /*      {experience.company}*/
}
{
  /*    </Heading>*/
}
{
  /*  </Flex>*/
}
{
  /*  <Flex sx={{ flexDirection: 'column' }}>*/
}
{
  /*    <Flex sx={{ mt: 2, alignSelf: 'flex-end' }}>*/
}
{
  /*      <label sx={{ display: 'flex' }}>*/
}
{
  /*        <Flex*/
}
{
  /*          sx={{*/
}
{
  /*            flexDirection: 'column',*/
}
{
  /*            mr: 2,*/
}
{
  /*            alignItems: 'flex-end',*/
}
{
  /*          }}>*/
}
{
  /*          <Flex>*/
}
{
  /*            {hideDetails[expList[index]] && (*/
}
{
  /*              <span*/
}
{
  /*                {...toggleMorphs[index]}*/
}
{
  /*                sx={{*/
}
{
  /*                  '&:before': {*/
}
{
  /*                    content: "'\\21A0'",*/
}
{
  /*                    color: 'primary',*/
}
{
  /*                  },*/
}
{
  /*                }}*/
}
{
  /*              />*/
}
{
  /*            )}*/
}
{
  /*            <span>{t('about:Summary')}</span>*/
}
{
  /*          </Flex>*/
}

{
  /*          <Flex>*/
}
{
  /*            {!hideDetails[expList[index]] && (*/
}
{
  /*              <span*/
}
{
  /*                {...toggleMorphs[index]}*/
}
{
  /*                sx={{*/
}
{
  /*                  '&:before': {*/
}
{
  /*                    content: "'\\21A0'",*/
}
{
  /*                    color: 'secondary',*/
}
{
  /*                  },*/
}
{
  /*                }}*/
}
{
  /*              />*/
}
{
  /*            )}*/
}
{
  /*            <span>{t('about:Detailed Overview')}</span>*/
}
{
  /*          </Flex>*/
}
{
  /*        </Flex>*/
}
{
  /*        <Flex>*/
}
{
  /*          <Checkbox*/
}
{
  /*            onClick={() =>*/
}
{
  /*              setSummary({*/
}
{
  /*                ...hideDetails,*/
}
{
  /*                [expList[index]]: !hideDetails[expList[index]],*/
}
{
  /*              })*/
}
{
  /*            }*/
}
{
  /*          />*/
}
{
  /*        </Flex>*/
}
{
  /*      </label>*/
}
{
  /*    </Flex>*/
}

{
  /*    <div*/
}
{
  /*      sx={{*/
}
{
  /*        transition:*/
}
{
  /*          'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',*/
}
{
  /*        maxHeight: ['25em', '35em', '50em'],*/
}
{
  /*        marginTop: 2,*/
}
{
  /*        borderRadius: 2,*/
}
{
  /*        padding: 1,*/
}
{
  /*        overflowY: 'scroll',*/
}
{
  /*        '&::-webkit-scrollbar': {*/
}
{
  /*          width: '0.8rem',*/
}
{
  /*          height: '0.5em',*/
}
{
  /*        },*/
}
{
  /*        '&::-webkit-scrollbar-thumb': {*/
}
{
  /*          background: theme =>*/
}
{
  /*            `linear-gradient(180deg,${theme.colors.primary},${theme.colors.secondary})`,*/
}
{
  /*          borderRadius: '999px',*/
}
{
  /*          boxShadow:*/
}
{
  /*            'inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25)',*/
}
{
  /*        },*/
}
{
  /*        bg: 'muted',*/
}
{
  /*        boxShadow: theme =>*/
}
{
  /*          `inset 2px 2px 2px ${theme.colors.primary}, inset -2px -2px 2px ${theme.colors.secondary}`,*/
}
{
  /*        // border: theme =>*/
}
{
  /*        //   `2px solid ${*/
}
{
  /*        //     hideDetails[expList[index]]*/
}
{
  /*        //       ? theme.colors.primary*/
}
{
  /*        //       : theme.colors.secondary*/
}
{
  /*        //   }`,*/
}
{
  /*      }}>*/
}
{
  /*      {hideDetails[expList[index]] ? summary : detail}*/
}
{
  /*    </div>*/
}
{
  /*  </Flex>*/
}
{
  /*  /!*{skills && (*!/*/
}
{
  /*  /!*  <Flex sx={{ flexDirection: 'column' }}>*!/*/
}
{
  /*  /!*    {hideDetails[expList[index]] && (*!/*/
}
{
  /*  /!*      // @ts-ignore*!/*/
}
{
  /*  /!*      <section {...morphs[index]}>{skills}</section>*!/*/
}
{
  /*  /!*    )}*!/*/
}
{
  /*  /!*  </Flex>*!/*/
}
{
  /*  /!*)}*!/*/
}
{
  /*</Flex>*/
}

{
  /*<SectionBody>*/
}
{
  /*  {{*/
}
{
  /*    location,*/
}
{
  /*    duration,*/
}
{
  /*    employment,*/
}
{
  /*    projects,*/
}
{
  /*    tags,*/
}
{
  /*  }}*/
}
{
  /*</SectionBody>*/
}
