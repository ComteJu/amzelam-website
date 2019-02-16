import React, { PureComponent } from 'react';
import posed, { PoseGroup } from 'react-pose';
//import { timeout } from './transition';

class Transition extends PureComponent {
  render() {
    const { children, location } = this.props;

    //const RoutesContainer2 = posed.div({
    //  enter: { opacity: 1, delay: timeout, delayChildren: timeout },
    //  exit: { opacity: 0.7 },
    //});
    const RoutesContainer = posed.div({
      enter: {  },
      exit: {  },
    });

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
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
