import React, { PureComponent } from "react";
import posed, { PoseGroup } from "react-pose";

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;

    const RoutesContainer = posed.div({
      enter: {},
      exit: {}
    });

    return (
      <PoseGroup animateOnMount={true}>
        <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
      </PoseGroup>
    );
  }
}

const wrapPageElement = ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>;
};

export default wrapPageElement;
