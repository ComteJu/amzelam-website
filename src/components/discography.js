import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { theme } from "config/theme";
import "typeface-nothing-you-could-do";

const Container = styled.article`
  margin: 0 auto;
  padding: ${theme.space};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(13em, 1fr));
  grid-gap: ${theme.space};
  align-items: flex-start;
  justify-content: center;
`;

const Box = styled.article`
  margin: 0 auto;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 65vmin;
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
`;

class Discography extends React.Component {
  render() {
    const { edges: albums } = this.props.data.allTrelloCard;
    return (
      <Container>
        {albums.map(({ node: album }) => (
          <Box key={album.id}>
            <Image fluid={album.i[0].localFile.childImageSharp.fluid} />
            <header>
              <h5>{album.name}</h5>
            </header>
            <p
              dangerouslySetInnerHTML={{
                __html: album.mkd.html
              }}
            />
          </Box>
        ))}
      </Container>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(
          filter: { list_name: { eq: "Discographie" } }
          sort: { fields: [index], order: DESC }
        ) {
          edges {
            node {
              id
              mkd: childMarkdownRemark {
                id
                ftm: frontmatter {
                  date(formatString: "YYYY", locale: "fr")
                  datetime: date
                }
                html
              }
              i: childrenCardMedia {
                localFile {
                  childImageSharp {
                    fluid(quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Discography data={data} {...props} />}
  />
);
