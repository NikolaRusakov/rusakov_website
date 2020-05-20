/** @jsx jsx */
import { Badge, Divider, Flex, Image, jsx } from 'theme-ui';
import React, { ReactNode, useState } from 'react';
import i18next from 'i18next';
import { Lens } from 'monocle-ts';
import { SectionHeaderProps } from '../section-header/sectionHeader';
import { SectionBodyProps } from '../section-body/sectionBody';
import data from '../../data/linkedin';
import Checkbox from '../checkbox/checkbox';
import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FileConnection, TagEntity } from '../../../types/gatsby-graphql';
import { lineClamp } from '../../utils/utils';

import { Flipped, Flipper } from 'react-flip-toolkit';
import { Global } from '@emotion/core';
import { useCompanySections } from './experienceList.hook';
import ExperienceList from './experienceList';
import { useTranslation } from 'react-i18next';

const SummaryArticle: React.FC<{ children: ReactNode }> = ({ children }) => (
  <article
    sx={{
      p: 1,
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
  const companySections = useCompanySections();

  const {
    allHighlight: { nodes: highlight },
    allSummary: { nodes: summary },
    allDetails: { nodes: details },
  }: {
    allHighlight: FileConnection;
    allSummary: FileConnection;
    allDetails: FileConnection;
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

    const companySection = companySections?.companySections?.skills
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
}> = ({ index, header: { experience, externalProps } }) => {
  return (
    <>
      <Flex
        sx={{
          gridColumn: 1,
          gridRow: 1,
          alignItems: ['center', 'center', 'flex-start'],
          flexDirection: 'column',
          position: 'relative',
          p: 2,
        }}>
        <Flex
          sx={{
            alignItems: ['flex-start', 'center', 'center'],
            flexDirection: ['column', 'row', 'row'],
          }}>
          <Flex
            sx={{
              minWidth: ['48px', null, '64px'],
              m: 1,
              position: 'relative',
            }}>
            <Flipped flipId={`companyLogo-${index}-${experience.company}`}>
              <Image
                src={experience.companyLogo}
                variant="avatar"
                sx={{
                  height: ['48px', null, '64px'],
                  width: ['48px', null, '64px'],
                }}
              />
            </Flipped>
            <div
              sx={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                margin: '0 auto',
                width: ['48px', null, '64px'],
              }}>
              <Flipped flipId={`yoe-badge-${index}-${experience.company}`}>
                <Badge
                  sx={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    maxWidth: ['48px', null, '64px'],
                    textAlign: 'center',
                    p: 0,
                    fontSize: theme => `calc(${theme.fontSizes[0]}px *0.7)`,
                  }}
                  variant="primary">
                  {experience.duration}
                </Badge>
              </Flipped>
            </div>
          </Flex>
          <Flipped flipId={`company-${index}-${experience.company}`}>
            <Flex sx={{ alignSelf: 'center' }}>
              <h4
                sx={{
                  ml: 1,
                  margin: '0px',
                  ...lineClamp(['1', '2', '2']),
                }}>
                {experience.company}
              </h4>
            </Flex>
          </Flipped>
        </Flex>
        {/*<Flex*/}
        {/*  sx={{*/}
        {/*    // py: 1,*/}
        {/*    flexDirection: 'column',*/}
        {/*    position: 'absolute',*/}
        {/*    top: '100%',*/}
        {/*    zIndex: '1001',*/}
        {/*  }}>*/}
        {/*  {externalProps?.badges?.map?.((value, i) => (*/}
        {/*    <Flipped flipId={`badge-${index}-${experience.company}-${i}`}>*/}
        {/*      <Badge variant="primary" px={1} my={1} mr={1}>*/}
        {/*        {value}*/}
        {/*      </Badge>*/}
        {/*    </Flipped>*/}
        {/*  ))}*/}
        {/*</Flex>*/}
      </Flex>
      <Flex sx={{ gridColumn: 2, gridRow: 1, flexDirection: 'column' }}>
        <Flipped flipId={`title-${index}-${experience.company}`}>
          <h2 sx={{ mb: 1 }}>{experience.position}</h2>
        </Flipped>
        <Flex
          sx={{
            top: '100%',
            zIndex: '1001',
            justifyContent: 'center',
          }}>
          {externalProps?.badges?.map?.((value, i) => (
            <Flipped flipId={`badge-${index}-${experience.company}-${i}`}>
              <Badge variant="primary" px={1} my={1} mr={1}>
                {value}
              </Badge>
            </Flipped>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export const HiddenHeaderSection: React.FC<{
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
      <Flipped flipId={`detail-${index}-${header.experience.company}`}>
        <section />
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
    <ExperienceList
      company={header?.experience?.company?.split(' ')[0].toLowerCase() ?? ''}>
      {children?.tagSections
        ?.slice(0, 5)
        ?.map(sections => sections?.tags?.[0]?.name)
        ?.join(', ')}
    </ExperienceList>
  </Flex>
);

const SectionExperience: React.FC<{
  experience: {
    header: SectionHeaderProps;
    body: SectionBodyProps<ReactNode>;
  }[];
}> = ({ experience }) => {
  const expUUID = 'experience-section';
  const expList = experience.map((_, index) => `${expUUID}-${index}`);
  const { t } = useTranslation();

  const [hideDetail, toggleDetail] = useState(
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
              //todo refactor to a component
              '.checkbox > input[type=checkbox]': {
                visibility: 'hidden',
                width: '100px',
              },
              '.checkbox': {
                position: 'relative',
                display: 'block',
                width: '60px',
                height: '26px',
                margin: '0 auto',
                background: '#FFF',
                border: '1px solid #2E2E2E',
                borderRadius: '2px',
                '&:after': {
                  opacity: 0,
                },
                transition: 'opacity 0.2s ease-in-out 0.1s',
              },
              '.checkbox label': {
                position: 'absolute',
                display: 'block',
                top: '2px',
                left: '2px',
                width: '20px',
                height: '20px',
                background: '#2E2E2E',
                transition: 'all 0.2s ease-in-out',
                borderRadius: '2px',
                zIndex: 1,
              },
              '.checkbox input[type=checkbox]:checked': {
                transition: 'opacity 0.2s ease-in-out 0.1s',

                '&:before': {
                  opacity: 0,
                },
                '&:after': {
                  opacity: 1,
                },
                '& + label': { left: '36px' },
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
                position: 'relative',
                variant: 'styles.header',
              }}>
              <div
                sx={{
                  gridColumn: '3',
                  gridRow: '1',
                  display: 'flex',
                  alignSelf: 'self-start',
                  flexDirection: 'row-reverse',
                  justifySelf: 'flex-end',
                  m: 2,
                }}>
                <label
                  className="checkbox"
                  css={theme => ({
                    position: 'absolute',
                    cursor: 'pointer',
                    '&:after': {
                      position: 'absolute',
                      right: '0',
                      display: 'contents',
                      // content: `"${naming.show}"`,
                      color: theme.colors.primary,
                      font: '12px/26px Arial, sans-serif',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      zIndex: 0,
                    },
                    '&:before': {
                      position: 'absolute',
                      top: '3px',
                      left: '0',
                      // content: `"${naming.hide}"`,
                      color: theme.colors.secondary,
                      font: '12px/26px Arial, sans-serif',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      zIndex: 0,
                    },
                  })}>
                  <input
                    id={`experienceToggle-${header.experience.company}`}
                    type="checkbox"
                    value={expList[index] ? 0 : 1}
                    checked={!hideDetail[expList[index]]}
                    onClick={() =>
                      toggleDetail({
                        ...hideDetail,
                        [expList[index]]: !hideDetail[expList[index]],
                      })
                    }
                  />
                  <label
                    htmlFor={`experienceToggle-${header.experience.company}`}
                  />
                  <span
                    sx={{
                      textAlign: 'end',
                      left: '10%',
                      position: 'relative',
                    }}>
                    {hideDetail[expList[index]]
                      ? t('typography:show')
                      : t('typography:hide')}
                  </span>
                </label>

                {/*<Checkbox*/}
                {/*  onClick={() =>*/}
                {/*    toggleDetail({*/}
                {/*      ...hideDetail,*/}
                {/*      [expList[index]]: !hideDetail[expList[index]],*/}
                {/*    })*/}
                {/*  }*/}
                {/*/>*/}
              </div>
              {hideDetail[expList[index]] ? (
                <HiddenHeaderSection index={index} header={header} />
              ) : (
                <ExpandedHeaderSection index={index} header={header} />
              )}
            </header>
            <div
              sx={{
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
