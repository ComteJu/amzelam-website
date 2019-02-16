require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: "Amzelam",
    titleAlt: "Amz",
    shortName: "Amz",
    author: "mrniature",
    siteLanguage: "fr",
    pathPrefix: "/",
    logo: "src/images/amz_icon.png",
    banner: "src/images/amz_icon.png",
    url: "https://amzelam.com",
    description:
      "Site officiel de Amzelam, musiques des balkans."
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Amzelam",
        short_name: "Amz",
        start_url: "/",
        background_color: "#FFF",
        theme_color: "#000",
        display: "minimal-ui",
        icon: "src/images/amz_icon.png",
        banner: "src/images/amz_icon.png"
      }
    }, 
    "gatsby-transformer-remark",
    "gatsby-plugin-offline",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-styled-components`
  ]
};
