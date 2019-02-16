import React from "react";
import { FiMail } from "react-icons/fi";
import { FaSpotify, FaFacebook } from "react-icons/fa";
import { IconContext } from "react-icons";
import { theme } from "../config/theme";
import styled from 'styled-components'

const Container = styled.ul`
  position: fixed;
  bottom: ${theme.space};
  right: ${theme.space};
  a {
    &:hover {
      color: tomato;
      cursor: pointer;
    }
  }
`

class Social extends React.Component {
  render() {
    return (
      <IconContext.Provider
        value={{
          size: "1.45em",
          style: { height: "1.5em", width: "1.5em" }
        }}
      >
        <Container>
          <li>
            <a href="mailto:http://amzelam@gmail.com">
              <FiMail />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/amzelam" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="spotify:artist:47Mf02OJL5hwfX3b1Y1IIs">
              <FaSpotify />
            </a>
          </li>
        </Container>
      </IconContext.Provider>
    );
  }
}

export default Social;
