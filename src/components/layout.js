import React from "react";
import SEO from "./SEO";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";
import { theme } from "config/theme";
import "typeface-nothing-you-could-do";
import "typeface-crimson-text";
import Social from "./social";
const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  text-size-adjust: 100%;
}

*, *:before, *:after {
  box-sizing: inherit;
  font-size: 15px;
  max-width: 100%;
  box-sizing: border-box;
  transition: 0.2s;
}
body {
  background: ${theme.c_light};
}
body, h1, h3, h4, h5, h6, header, p, ol, ul, li {
  margin: 0;
  padding: 0;
  font-weight: 300;
  font-family: 'Crimson Text', serif;
  color: ${theme.c_dark};
}

h1, h2 {
  font-family: 'Nothing You Could Do', serif;
}

h1 {
  font-size: 2em;
}
h3 {
  font-size: calc(1rem + ${theme.space}*0.1);
  font-weight: 700;
  text-transform: uppercase;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export const Main = styled.main`
  width: 100%;
`;
const Container = styled.div`
  background: ${theme.c_light};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0;
  padding: ${theme.space};
  min-height: 100vh;
`;

class Layout extends React.Component {
  render() {
    const { children, home } = this.props;
    return (
      <>
        <GlobalStyle />
        <SEO />
        <Container>
          <Header title="Amzelam" />
          <Main home={home} as="main">
            {children}
          </Main>
          <Social />
        </Container>
      </>
    );
  }
}

export default Layout
