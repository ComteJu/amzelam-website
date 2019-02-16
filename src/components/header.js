import React from "react";
import styled from "styled-components";
import { Link, StaticQuery, graphql } from "gatsby";
import Navigation from "./navigation";

const Container = styled.header`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = () => (
  <StaticQuery
    query={headerQuery}
    render={data => {
      const { title } = data.site.siteMetadata;
      return (
        <Container>
          <Link to="/"><h1>{title}</h1></Link>
          <Navigation home />
        </Container>
      );
    }}
  />
);

const headerQuery = graphql`
  query headerQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Header;
