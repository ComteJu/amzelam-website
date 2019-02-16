import React, { Component } from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

export default class SEO extends Component {
  render() {
    const { title, desc, banner, pathname } = this.props;
    return (
      <StaticQuery
        query={query}
        render={({
          site: {
            siteMetadata: {
              defaultTitle,
              titleAlt,
              shortName,
              siteLanguage,
              siteUrl,
              defaultDescription,
              defaultBanner
            }
          }
        }) => {
          const seo = {
            title: title || defaultTitle,
            description: defaultDescription || desc,
            image: `${siteUrl}${banner || defaultBanner}`,
            url: `${siteUrl}${pathname || "/"}`,
          };

          let schemaOrgJSONLD = [
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "@id": siteUrl,
              "url": siteUrl,
              "name": defaultTitle,
              "alternateName": titleAlt || ""            }
          ];

          return (
            <Helmet title={seo.title}>
              <html lang={siteLanguage} />
              <meta name="description" content={seo.description} />
              <meta name="image" content={seo.image} />
              <meta name="apple-mobile-web-app-title" content={shortName} />
              <meta name="application-name" content={shortName} />
              <script type="application/ld+json">
                {JSON.stringify(schemaOrgJSONLD)}
              </script>

              <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
              <meta
                content="width=device-width,initial-scale=1.0,user-scalable=yes"
                name="viewport"
              />
              <meta content="yes" name="apple-mobile-web-app-capable" />
            </Helmet>
          );
        }}
      />
    );
  }
}

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false
};

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        siteLanguage
        logo
        siteUrl: url
        pathPrefix
        defaultDescription: description
        defaultBanner: banner
      }
    }
  }
`;