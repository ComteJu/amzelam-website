import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

export const Nav = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const Navigation = () => (
  <Nav>
    <ul>
      <li>
        <Link to="agenda">AGENDA</Link>
      </li>
      <li>
        <Link to="musique">ÉCOUTER</Link>
      </li>
    </ul>
  </Nav>
);

export default Navigation