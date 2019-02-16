import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const Container = styled.figure`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3em - 20vmin);
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  max-width: 60vmin;
  img {
    object-fit: contain !important;
    //object-position: center bottom !important;
  }
`;

class Cover extends React.Component {
  render() {
    const logo = this.props.data.image;
    return (
      <Container>
        <Image
          fluid={logo.childrenCardMedia[0].localFile.childImageSharp.fluid}
        />
        <figcaption><h2>Musiques des Balkans</h2></figcaption>
      </Container>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        image: trelloCard(name: { eq: "Logo" }) {
          id
          name
          childrenCardMedia {
            localFile {
              childImageSharp {
                fluid(quality: 90, duotone: { highlight: "#A38866", shadow: "#2E261C", opacity: 50 }) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Cover data={data} {...props} />}
  />
);
