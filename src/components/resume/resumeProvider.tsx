import { graphql, useStaticQuery } from 'gatsby';

const resumeProvider = () => {
  const image = useStaticQuery(graphql`
    query ResumProviderImage {
      avatar: file(relativePath: { eq: "me.jpeg" }) {
        childImageSharp {
          fluid(fit: INSIDE, maxWidth: 640, maxHeight: 480) {
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
  `);
  return image?.avatar?.childImageSharp?.fluid;
};
export default resumeProvider;
