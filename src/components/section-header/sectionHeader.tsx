/** @jsx jsx */
import { Badge, Flex, Heading, Image, jsx } from 'theme-ui';
import React, { useEffect, useRef, useState } from 'react';

export interface ExperienceProps {
  employedDuration?: string;
  duration?: string;
  company?: string;
  employment?: string;
  companyLogo?: string;
  position?: string;
  location?: string;
  details?: string;
}

export interface SectionHeaderProps {
  experience: ExperienceProps;
  externalProps: {
    badges?: string[];
  };
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  experience,
  externalProps,
  children,
}) => {
  const [headHeight, setHeight] = useState({ clientHeight: 0, clientWidth: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current !== null) {
      // @ts-ignore
      const { clientHeight, clientWidth } = ref.current;
      setHeight({ clientHeight, clientWidth });
    }
  }, [ref]);
  return (
    <article
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Flex
        sx={{
          justifyContent: 'start',
          width: ['max-content', null, null],
        }}>
        <Image
          sx={{
            width: [
              `${headHeight.clientHeight}px`,
              'auto',
              `${headHeight.clientHeight}px`,
            ],
            height: [null, 'auto', 'auto'],
            mr: 1,
            mb: 1,
            borderRadius: 1,
          }}
          src={experience.companyLogo}
        />
        <Flex
          ref={ref}
          sx={{
            flexDirection: ['row', 'column', 'column'],
          }}>
          <Heading
            as="h2"
            sx={{
              letterSpacing: [0, '-1px', '-1px'],
              fontSize: [3, 4, 5],
              width: `${1 +
                (experience.position?.split(' ')[0].length ?? 0)}ch`,
            }}>
            {experience.position}
          </Heading>
          <Flex
            sx={{
              display: ['none', 'block', 'block'],
              py: 1,
              flexWrap: 'wrap',
            }}>
            {externalProps?.badges?.map?.(value => (
              <Badge variant="primary" px={1} my={1} mr={1}>
                {value}
              </Badge>
            ))}
          </Flex>
          {/*<Flex sx={{ justifyContent: 'flex-end' }}>*/}
          {/*  <p sx={{ fontStyle: 'italic' }}>{experience?.employedDuration}</p>*/}
          {/*</Flex>*/}
        </Flex>
      </Flex>

      <Flex
        sx={{
          fontSize: 'smaller',
          alignSelf: 'baseline',
          flexDirection: 'column',
        }}>
        <dl>
          <dt>
            {experience.employment && `${experience.employment.toUpperCase()}`}
          </dt>
          <dd> {experience.duration}</dd>
        </dl>
      </Flex>

      <Flex sx={{ flexDirection: ['column', 'row', 'row'] }}>
        {/*<Heading*/}
        {/*  sx={{*/}
        {/*    fontSize: [2, 2, 3],*/}
        {/*    whiteSpace: 'nowrap',*/}
        {/*  }}*/}
        {/*  as="h3">*/}
        {/*  {experience.company}*/}
        {/*</Heading>*/}
        <Flex
          sx={{
            display: ['flex', 'none', 'none'],
            py: 1,
            flexWrap: 'wrap',
          }}>
          {externalProps?.badges?.map?.(value => (
            <Badge variant="primary" px={1} my={1} mr={1}>
              {value}
            </Badge>
          ))}
        </Flex>
      </Flex>
      {children}
    </article>
  );
};
export { SectionHeader };
