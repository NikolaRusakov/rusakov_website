/** @jsx jsx */
import { jsx, Flex, Heading, Divider } from 'theme-ui';
import React, { ReactNode } from 'react';
import { TagEntity } from '../section-experience/sectionExperience';

export interface SectionBodyProps<T extends ReactNode | TagEntity[]> {
  children: {
    duration?: string;
    employment?: string;
    projects: T;
    location?: string;
    tags: T;
  };
}

const iconMapper: Record<string, string> = {
  duration: 'clock1',
  employment: 'male-technologist',
  projects: 'bulb',
  location: 'map',
};

const SectionBody: React.FC<SectionBodyProps<ReactNode>> = ({ children }) => {
  return (
    <article>
      <Flex sx={{ flexDirection: 'column' }}>
        {children.duration}{' | '}
        {children.employment && `${children?.employment.toUpperCase()}`}
        {/*{Object.entries(children)*/}
        {/*  .filter(([key, _]) => key != 'tags')*/}
        {/*  .map(([key, value]) =>*/}
        {/*    value ? (*/}
        {/*      <Flex sx={{ flexDirection: 'row' }}>*/}
        {/*        /!*<Heading*!/*/}
        {/*        /!*  as="h3"*!/*/}
        {/*        /!*  sx={{*!/*/}
        {/*        /!*    // alignSelf: 'center',*!/*/}
        {/*        /!*    width: ['64px', '92px', '128px'],*!/*/}
        {/*        /!*    // textAlign: 'right',*!/*/}
        {/*        /!*    marginRight: theme => theme.space[1],*!/*/}
        {/*        /!*  }}>*!/*/}
        {/*        /!*  {key}*!/*/}
        {/*        /!*</Heading>*!/*/}
        {/*        {key !== 'projects' ? (*/}
        {/*          <span>{value}</span>*/}
        {/*        ) : (*/}
        {/*          <Flex>{value}</Flex>*/}
        {/*        )}*/}
        {/*      </Flex>*/}
        {/*    ) : null,*/}
        {/*  )}*/}
        {children?.tags ? (
          <React.Fragment>
            <Divider />
            <Flex>
              <Heading
                as="h4"
                sx={{
                  width: ['64px', '92px', '128px'],
                  alignSelf: 'baseline',
                  marginRight: theme => theme.space[1],
                }}>
                {'tags'}
              </Heading>
              <Flex sx={{ flexWrap: 'wrap' }}>{children.tags}</Flex>
            </Flex>
          </React.Fragment>
        ) : null}
      </Flex>
    </article>
  );
};
export { SectionBody };
