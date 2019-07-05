import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const AnimatedComponent = styled.div`
  position: relative;
  z-index: 1;
`;

const Page = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const AnimatedRouter = ({ children }) => (
  <Route
    render={({ location }) => (
      <AnimatedComponent uniqKey={location.pathname}>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames={`fade`} timeout={500}>
            <Page>
              <Switch location={location}>{children}</Switch>
            </Page>
          </CSSTransition>
        </TransitionGroup>
      </AnimatedComponent>
    )}
  />
);

export default AnimatedRouter;
