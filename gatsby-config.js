module.exports = {
  siteMetadata: {
    title: 'Nikola Rusakov',
    description: 'Rusakov Web Page',
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-graphql-codegen`,
    //   options: {
    //     fileName: `./types/gatsby-graphql.ts`,
    //   },
    // },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-offline`,
      // options: {
      //   precachePages: [`/en/*`, `/cs/*`],
      // },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `cs`],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/ko` when connecting `/`
        redirect: true,
      },
    },
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@mdx': 'src/data/mdx',
          '@posts': 'content/posts',
        },
        extensions: ['mdx', 'md'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/generated`,
        name: `generated`,
      },
    },
    /*{
      resolve: 'gatsby-plugin-react-axe',
      options: {
        showInProduction: false,
        // Options to pass to axe-core.
        // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
        axeOptions: {
          // Your axe-core options.
        },
      },
    },*/
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typography`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `experienceDetails`,
        path: `${__dirname}/src/data/mdx/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'logo',
        path: `${__dirname}/static/logo/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/src/pages/about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `test`,
        path: `${__dirname}/src/pages/test`,
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages/about`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          about: require.resolve('./src/layouts/about-layout.tsx'),
          // highlight: require.resolve('./src/components/highlight-layout.js'),
          // posts: require.resolve('./src/components/posts-layout.js'),
          // default: require.resolve('./src/components/default-page-layout.js'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Work+Sans', 'Quattrocento+Sans:400,400i,700'],
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        include: /svg/,
        prettier: true, // use prettier to format JS code output (default)
        svgo: true, // use svgo to optimize SVGs (default)
        svgoConfig: {
          removeViewBox: true, // remove viewBox when possible (default)
          cleanupIDs: true, // remove unused IDs and minify remaining IDs (default)
        },
      },
    },
    /*{
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    }*/
  ],
};
