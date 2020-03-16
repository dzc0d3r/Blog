module.exports = {
  siteMetadata: {
    title: `The Minimalist`,
    name: `The Minimalist`,
    siteUrl: `https://the-minimalist.now.sh`,
    description: `A place to share thoughts, ideas and pretty much anything`,
    hero: {
      heading: `A place to share thoughts, ideas and pretty much anything.`,
      maxWidth: 800,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/Ashwin-op`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/bsashwin/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
