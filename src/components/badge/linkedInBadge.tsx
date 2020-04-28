/** @jsx jsx */
import { jsx, Badge } from 'theme-ui';
import { TagEntity } from '../../../types/gatsby-graphql';
import React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';
import linkedInUrl, {
  ReactComponent as LinkedIn,
} from '../../../static/svg/linkedin.svg';

const LinkedInBadge: React.FC<{ tag: TagEntity }> = ({ tag: { count } }) => {
  // const {
  //   logo: {
  //     name,
  //     childImageSharp: { fluid },
  //   },
  // } = useStaticQuery(graphql`
  //   query getLinkedInIcon {
  //     logo: file(name: { eq: "linkedin" }) {
  //       name
  //       childImageSharp {
  //         fluid(fit: INSIDE) {
  //           aspectRatio
  //           sizes
  //           src
  //           srcSet
  //           srcWebp
  //           base64
  //         }
  //       }
  //     }
  //   }
  // `);

  return (
    <div
      sx={{
        // position: 'relative',
        borderRadius: '999px',
        width: '50px',
        margin: 'auto',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        // border: theme => `2px solid ${theme.colors.primary}`,
      }}>
      {/*<div*/}
      {/*  sx={{*/}
      {/*    position: 'absolute',*/}
      {/*    left: 0,*/}
      {/*    borderRadius: '50%',*/}
      {/*  }}>*/}
      <LinkedIn
        width={32}
        height={32}
        sx={{
          width: '14px',
          height: '21px',
          position: 'absolute',
          right: '3px',
          bottom: '2px',
        }}
        // fill={'#0073B1'}
      />
      <Badge
        variant="circle"
        // ml={-3}
        // mt={-2}
        sx={{
          borderRadius: 1,
          boxShadow:
            '-0.5px -0.5px 3px rgba(23, 174, 255, 0.82), 1px 1px 1px #0073B1, 1px 0px 1px #0073B1',
          bg: '#fff',
        }}>
        <span sx={{ color: '#0177b5' }}>+ {count} </span>
      </Badge>

      {/*<Img fluid={fluid} alt={name} objectFit="contain" />*/}
      {/*</div>*/}
    </div>
  );
};

export default LinkedInBadge;
