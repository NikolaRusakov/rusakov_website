/** @jsx jsx */
import { jsx, Flex, Heading, Divider } from 'theme-ui';
import React, { ReactNode } from 'react';

const SectionBody: React.FC<{
  children: {
    duration?: string;
    employment?: string;
    location?: string;
    projects: ReactNode;
    tags: ReactNode;
  };
}> = ({ children }) => {
  return (
    <article>
      <Flex sx={{ flexDirection: 'column' }}>
        {Object.entries(children)
          .filter(([key, _]) => key != 'tags')
          .map(([key, value]) =>
            value ? (
              <Flex>
                <Heading
                  as="h4"
                  sx={{
                    alignSelf: 'center',
                    width: ['64px', '92px', '128px'],
                    textAlign: 'right',
                    marginRight: theme => theme.space[1],
                  }}>
                  {key}
                </Heading>
                {key !== 'projects' ? <p>{value}</p> : <Flex>{value}</Flex>}
              </Flex>
            ) : null,
          )}

        {children?.tags ? (
          <React.Fragment>
            <Divider />
            <Flex>
              <Heading
                as="h4"
                sx={{
                  width: ['64px', '92px', '128px'],
                  textAlign: 'right',
                  flex: 'none',
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
