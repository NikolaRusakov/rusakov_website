/** @jsx jsx */
import { jsx, Flex } from 'theme-ui';
import { TagEntity } from '../../../types/gatsby-graphql';
import React from 'react';
import { ReactComponent as LinkedIn } from '../../../static/svg/linkedin.svg';

const LinkedInBadge: React.FC<{ tag: TagEntity }> = ({ tag: { count } }) => {
  return (
    <div
      sx={{
        borderRadius: '999px',
        margin: 'auto',
        display: 'flex',
        position: 'relative',
        padding: '0 4px',
      }}>
      <Flex
        sx={{
          alignItems: 'flex-end',
          borderRadius: 1,
          boxShadow:
            '-0.5px -0.5px 3px rgba(23, 174, 255, 0.82), 1px 1px 1px #0073B1, 1px 0px 1px #0073B1',
          bg: '#fff',
          fontSize: 1,
          fontWeight: 'bold',
          width: '3.5em',
          padding: '0 2px',
        }}>
        <span
          sx={{
            color: '#0177b5',
            flex: '1',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
          + {count}{' '}
        </span>
        <LinkedIn
          width={32}
          height={32}
          sx={{
            width: theme => `${theme.fontSizes[1] * 1.2}px`,
            height: theme => `${theme.fontSizes[1] * 1.2}px`,
            alignSelf: 'center',
          }}
          // fill={'#0073B1'}
        />
      </Flex>
    </div>
  );
};

export default LinkedInBadge;
