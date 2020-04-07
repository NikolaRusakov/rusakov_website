/** @jsx jsx */
import { jsx, Divider, Badge, Flex, Box } from 'theme-ui';
import React, { ReactNode } from 'react';
import { Lens } from 'monocle-ts';
import { SectionHeader } from '../section-header';
import { SectionBody } from '../section-body';
import { Section } from '../section';
import { SectionHeaderProps } from '../section-header/sectionHeader';
import { SectionBodyProps } from '../section-body/sectionBody';
import data from '../../data/linkedin';
import Futuretek from '../../data/futuretek.mdx';

export interface TagEntity {
  name: string;
  abbr: string;
  slug: string;
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
}> = ({ experience }) => (
  <React.Fragment>
    {experience.map(
      ({
        body: {
          children: { duration, employment, location, projects, tags },
        },
        header: { experience, externalProps },
      }) => (
        <Section variant="primary">
          <Flex
            sx={{
              flexDirection: ['column', 'column', 'row'],
              alignItems: 'baseline',
            }}>
            <Flex sx={{ maxWidth: '50%' }}>
              <SectionHeader
                experience={experience}
                externalProps={externalProps}>
                <Box sx={{ maxWidth: ['100%', '75%', '75%'] }}>
                  <Futuretek />
                </Box>
              </SectionHeader>
            </Flex>
            <Flex
              sx={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                '& > ol': {
                  textOverflow: 'ellipsis',
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-line',
                },
              }}>
              <Divider sx={{ visibility: ['visible', null, 'hidden'] }} />
              <Futuretek />
            </Flex>
          </Flex>
          <Divider />
          <SectionBody>
            {{
              location,
              duration,
              employment,
              projects,
              tags,
            }}
          </SectionBody>
        </Section>
      ),
    )}
  </React.Fragment>
);

export default SectionExperience;
