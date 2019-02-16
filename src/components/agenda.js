import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { theme } from "config/theme";
import "typeface-nothing-you-could-do";

export const Container = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: ${theme.space};
`;

const Figure = styled.figure`
  width: 100%;
  height: 100%;
  max-width: 30em;
  padding: ${theme.space};

`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
`;

const Item = styled.article`
  display: grid;
  grid-template-columns: 6em auto;
  gap: 0.5em;
  padding-bottom: 0.5em;
`;

const Section = styled.section``;

const Time = styled.time`
  text-align: right;
`;

class Agenda extends React.Component {
  render() {
    const { edges: gigs } = this.props.data.allTrelloCard;
    const live = this.props.data.live;
    return (
      <Container>
        <section>
          {gigs.map(({ node: gig }) => (
            <Item key={gig.id}>
              {gig.mkd.ftm.date && (
                <Time dateTime={gig.mkd.ftm.datetime}>{gig.mkd.ftm.date}</Time>
              )}
              <Section>
                {gig.mkd.ftm.ville && (
                  <header>
                    <h4>{gig.mkd.ftm.ville}</h4>
                  </header>
                )}
                {gig.mkd.ftm.lieu && <h5>{gig.mkd.ftm.lieu}</h5>}
                {gig.mkd.ftm.infos_suppl_mentaires && (
                  <p>{gig.mkd.ftm.infos_suppl_mentaires}</p>
                )}
              </Section>
            </Item>
          ))}
        </section>
        <Figure>
          <Image fluid={live.image[1].local.sharp.fluid} />
        </Figure>
      </Container>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allTrelloCard(
          filter: { list_name: { eq: "Dates de concert" } }
          sort: { fields: [index], order: ASC }
        ) {
          edges {
            node {
              id
              mkd: childMarkdownRemark {
                id
                ftm: frontmatter {
                  date(formatString: "D MMM YYYY", locale: "fr")
                  datetime: date
                  ville
                  lieu
                  infos_suppl_mentaires
                }
              }
            }
          }
        }
        live: trelloCard(name: { eq: "Live" }) {
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
      }
    `}
    render={data => <Agenda data={data} {...props} />}
  />
);
