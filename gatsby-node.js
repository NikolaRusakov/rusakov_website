const path = require(`path`);
const locales = require(`./config/i18n`);
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`);
const i18nConfig = require('./config/i18n');
console.log(i18nConfig);
exports.createSchemaCustomization = ({ actions: { createTypes }, schema }) => {
  createTypes([
    `
    type TagEntity implements Node {
      key: String
      name: String
      count: String
      heading: String
    }
    
    type TagEntityEntries implements Node{
      data: [TagEntity]
    }

    type ContentfulSubSection implements Node {
      title: String
    }

    union TagEntityUnion =  TagEntity | TagEntityEntries  

    type SkillTagSection implements Node {
      section: String!
      tags: [TagEntityUnion]
          @link(from: "tags___NODE")
    }
    
    type CompanyTagSections implements Node {
      shortKey: String!
      sections: [SkillTagSection]
    }
    
    type SkillCompanySection implements Node {
      locale: String!
      data: [CompanyTagSections]
    }
    
    type CompanySections implements Node {
      skills: [SkillCompanySection]
    }
  `,
  ]);
};

// type AllSkillTagSections implements node {
//   data: [SkillTagSections]
// }
//
// type SkillCompanySections implements Node {
//   locale: String!
//       data : AllSkillTagSections
// }
// exports.createResolvers = ({ createResolvers }) => {
//   const fullName = {
//     type: 'String',
//     resolve(source, args, context, info) {
//       return source.firstName + ' ' + source.name;
//     },
//   };
//   const resolvers = {
//     Query: {
//       AllSkillTagSection: {
//         type: ['SkillTagSections'],
//         resolve(source, args, context, info) {
//           return context.nodeModel.getAllNodes({ type: 'SkillTagSections' });
//         },
//       },
//     },
//     // AuthorJson: {
//     //   fullName,
//     // },
//     // ContributorJson: {
//     //   fullName,
//     // },
//   };
//   createResolvers(resolvers);
// };

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, getCache },
  config,
) => {
  const { createNode } = actions;
  Object.keys(i18nConfig).map(locale => {
    const { default: parsedTags } = import(
      `./src/data/generated/parsed-tags.${locale}.json`
    );
    const companies = parsedTags.map(({ sections, shortKey }) => ({
      shortKey,
      sections: sections.map(({ section, tags }) => ({
        section,
        tags: tags.map(tag => (Array.isArray(tag) ? { data: tag } : tag)),
      })),
    }));

    const skillCompanySection = { locale, data: companies };
    const node = {
      ...skillCompanySection,
      id: createNodeId(`parsed-tags-${locale}`),
      internal: {
        type: 'SkillCompanySection',
        contentDigest: createContentDigest(skillCompanySection),
      },
    };
    createNode(node);
  });

  // contentDigest: createContentDigest(nodeData);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  console.log(node.internal.type);
  // Check for "Mdx" type so that other files (e.g. images) are exluded
  if (node.internal.type === `Mdx`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.fileAbsolutePath, `.mdx`);

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "en")
    const isDefault = name === `index`;

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true);

    // Files are defined with "name-with-dashes.lang.mdx"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1];

    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
  }
};

// exports.onCreatePage = ({ page, actions }) => {
//     const { createPage, deletePage } = actions
//
//     // First delete the incoming page that was automatically created by Gatsby
//     // So everything in src/pages/
//     // deletePage(page)
//
//     // Grab the keys ('en' & 'de') of locales and map over them
//     Object.keys(locales).map(lang => {
//         // Use the values defined in "locales" to construct the path
//         const localizedPath = locales[lang].default
//             ? page.path
//             : `${locales[lang].path}${page.path}`
//
//         return createPage({
//             // Pass on everything from the original page
//             ...page,
//             // Since page.path returns with a trailing slash (e.g. "/de/")
//             // We want to remove that
//             path: removeTrailingSlash(localizedPath),
//             // Pass in the locale as context to every page
//             // This context also gets passed to the src/components/layout file
//             // This should ensure that the locale is available on every page
//             context: {
//                 ...page.context,
//                 locale: lang,
//                 dateFormat: locales[lang].dateFormat,
//             },
//         })
//     })
// }

exports.createPages = async ({ page, graphql, actions }, pluginOptions) => {
  const { createPage } = actions;

  const testTemplate = require.resolve(`./src/layouts/about-layout.tsx`);

  const result = await graphql(`
    {
      blog: allFile(filter: { sourceInstanceName: { eq: "about" } }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              body
              fields {
                locale
                isDefault
              }
              frontmatter {
                title
                templateKey
                path
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    return;
  }

  const postList = result.data.blog.edges;
  const paths = postList.map(({ node: { childMdx: pl } }) => ({
    locale: pl.fields.locale,
    templateKey: pl.frontmatter.templateKey,
  }));
  console.log(paths);
  postList.forEach(async node => {
    const { node: post } = node;
    const locale = post.childMdx.fields.locale;
    const isDefault = post.childMdx.fields.isDefault;

    const slug = post.childMdx.frontmatter.templateKey;
    const title = post.childMdx.frontmatter.title;

    // Use the fields created in exports.onCreateNode

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: testTemplate,
      children: post.childMdx.body,
      context: {
        // Pass both the "title" and "locale" to find a unique file
        // Only the title would not have been sufficient as articles could have the same title
        // in different languages, e.g. because an english phrase is also common in german
        children: post.childMdx.body,
        locale,
        title,
        slug,
        paths,
      },
    });
  });
};
