/** @jsx jsx */
import { Badge, Box, Flex, Heading, Image, jsx } from 'theme-ui';
import React from 'react';

export interface ExperienceSectionProps {
  employedDuration?: string;
  duration?: string;
  company?: string;
  employment?: string;
  companyLogo?: string;
  position?: string;
  location?: string;
}

const SectionHeader: React.FC<{
  experience: ExperienceSectionProps;
  externalProps: {
    badges?: string[];
  };
}> = ({ children, experience, externalProps }) => {
  return (
    <section
      sx={{
        display: 'flex',
        // display: 'grid',
        // 'grid-template-columns':
        //   'minmax(min-content, 100px) repeat(auto-fill,60px)',
        // gridGap: '0.5rem',
        // 'grid-auto-rows': 'minmax(0.5rem, auto)',
      }}>
      <Box
        mx={3}
        sx={{
          // gridColumn: '1',
          // gridRow: '1 / 3',
          width: ['64px', '92px', '128px'],
        }}>
        <Image src={experience.companyLogo} />
      </Box>
      <Flex sx={{ flexDirection: 'column' }}>
        <Heading
          as="h2"
          sx={{
            letterSpacing: [0, '-1px', '-1px'],
            fontSize: [4, 5, 7],
          }}>
          {experience.position}
        </Heading>
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
          <Heading
            sx={{
              fontSize: [2, 4, 4],
            }}
            as="h3">
            {experience.company}
          </Heading>
          <Box>
            {externalProps?.badges?.map?.(value => (
              <Badge
                variant="primary"
                px={[0, 2, 2]}
                py={[0, 1, 1]}
                ml={[0, 1, 1]}>
                {value}
              </Badge>
            ))}
          </Box>
        </Flex>
        <Flex sx={{ justifyContent: 'flex-end' }}>
          <p sx={{ fontStyle: 'italic' }}>{experience?.employedDuration}</p>
        </Flex>
      </Flex>
    </section>
  );
};
export { SectionHeader };
