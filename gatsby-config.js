module.exports = {
  siteMetadata: {
    title: 'Nikola Rusakov',
    description: 'Rusakov Web Page',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/en/*`, `/cs/*`],
      },
    },
    `gatsby-transformer-json`,
    'gatsby-plugin-theme-ui',
    // fixme to be removed as soon as typography-picker will be i18n'd & configurable
    'gatsby-plugin-aphrodite',
    // 'gatsby-plugin-loadable-components-ssr',
    // {
    //   resolve: `gatsby-plugin-loadable-components-ssr`,
    //   options: {
    //     // Whether replaceHydrateFunction should call ReactDOM.hydrate or ReactDOM.render
    //     // Defaults to ReactDOM.render on develop and ReactDOM.hydrate on build
    //     useHydrate: true,
    //   },
    // },
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
    {
      resolve: `gatsby-transformer-json`,
      // options: {
      //   typeName: ({ node, object, isArray }) => isArray,
      // },
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
    /*
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },*/
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
          // highlights: require.resolve('./src/components/highlights-layout.js'),
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
