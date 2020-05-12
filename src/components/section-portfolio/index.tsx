/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image/withIEPolyfill';
import i18next from 'i18next';

import PortfolioCard from '../portfolio-card';
import { toGatsbyImageProps } from '../section-skill/linkedinSkillSection';
import { Badge } from 'theme-ui';
const PortfolioSection: React.FC = () => {
  const locale = i18next.language;

  const req = useStaticQuery(graphql`
    query rusakovRepositories {
      logos: allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }) {
        edges {
          node {
            base
            name
            childImageSharp {
              fluid(fit: INSIDE) {
                aspectRatio
                sizes
                src
                srcSet
                srcWebp
                base64
              }
            }
          }
        }
      }

      github {
        viewer {
          repositories(
            isFork: false
            privacy: PUBLIC
            affiliations: OWNER
            first: 100
            orderBy: { field: CREATED_AT, direction: DESC }
          ) {
            totalCount
            edges {
              node {
                name
                nameWithOwner
                url
                repositoryTopics(first: 10) {
                  nodes {
                    url
                    resourcePath
                    topic {
                      name
                    }
                  }
                }
                ... on GitHub_Repository {
                  languages(first: 50) {
                    totalCount
                    edges {
                      node {
                        color
                        name
                      }
                    }
                  }
                  primaryLanguage {
                    name
                    color
                  }
                  ... on GitHub_RepositoryInfo {
                    createdAt
                    homepageUrl
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const logoMap = req?.logos?.edges.reduce(
    (acc, { node }) => ({
      ...acc,
      [node.name]: { ...node },
    }),
    {},
  );

  const imageProps = toGatsbyImageProps({
    tags: ['hartvannederland'],
    name: 'Hart Van Nederland',
  })(logoMap);

  return (
    <React.Fragment>
      {
        <PortfolioCard
          image={
            <Img
              {...imageProps}
              style={{ width: '12em', marginTop: '2em', marginBottom: '1em' }}
            />
          }
          // title="Hart Van Nederland"
          platform="APP"
          sx={{ maxWidth: '250px' }}>
          {({ body }) => (
            <div
              sx={{
                width: '250px',
                background: '#4FB5F2',
                borderRadius: 3,
              }}>
              {body}
              <Badge>
                <span>Testing</span>
              </Badge>
              <Badge>
                <span>Testing</span>
              </Badge>
              <Badge>
                <span>Testing</span>
              </Badge>
            </div>
          )}
        </PortfolioCard>
      }
    </React.Fragment>
  );
};

export default PortfolioSection;
