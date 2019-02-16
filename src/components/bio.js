import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { theme } from "config/theme";
import "typeface-nothing-you-could-do";

const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: fit-content;
`;

const Figure = styled.figure`
  justify-self: flex-end;
  margin: 0;
  padding: ${theme.space};
  figcaption {
    padding-top: ${theme.space};
  }
`;

const Image = styled(Img)`
  justify-self: flex-end;
  max-width: 25em;
  width: 100%;
  height: 100%;
`;

const Paragraph = styled.p`
  max-width: 24em;
  letter-spacing: 0.02em;
  line-height: 1.5em;
  pointer-events: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${theme.c_dark};
  hr {
    border-color: ${theme.color_bg};
  }

  margin: 0 auto;
`;

class Bio extends React.Component {
  render() {
    const bio = this.props.data.biographie;
    const mus = this.props.data.musiciens;
    return (
      <Container>
        <Figure>
          <Image fluid={bio.image[0].local.sharp.fluid} />
          <figcaption
            dangerouslySetInnerHTML={{
              __html: mus.childMarkdownRemark.html
            }}
          />
        </Figure>

        <Paragraph
          dangerouslySetInnerHTML={{
            __html: bio.childMarkdownRemark.html
          }}
        />
      </Container>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        biographie: trelloCard(name: { eq: "Biographie" }) {
          id
          name
          childMarkdownRemark {
            html
          }
          image: childrenCardMedia {
            local: localFile {
              sharp: childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        musiciens: trelloCard(name: { eq: "Musiciens" }) {
          id
          name
          childMarkdownRemark {
            html
          }
        }
      }
    `}
    render={data => <Bio data={data} {...props} />}
  />
);
