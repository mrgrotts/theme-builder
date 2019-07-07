import React from 'react';
import styled from 'styled-components';

import { Button, MobileFirstMediaQuery } from '../theme';
import { THEME } from '../constants';
const { TRANSITION_ALL } = THEME;

const BackButton = styled(Button)`
  opacity: 0;
  text-transform: uppercase;
  width: 128px;
  z-index: 1;
`;

const Content = styled.div`
  align-items: center;
  display: inline-flex;
  font-size: 0.9rem;
  justify-content: center;
  letter-spacing: 1px;
  position: absolute;
  width: 100%;
`;

const Name = styled.span`
  opacity: 1;
  padding: 0.5rem;
  text-transform: uppercase;
`;

const Box = styled.div.attrs(props => ({
  'aria-colindex': props.colindex,
  'aria-label': props.id,
  'aria-owns': `${props.id}-content`,
  role: 'gridcell'
}))`
  align-items: center;
  background: ${props => props.color || '#141414'};
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  height: 10%;
  margin: 0 auto;
  position: relative;
  width: 100%;

  &:active button,
  :focus button,
  :hover button {
    opacity: 0;
    transition: none;
  }

  &:active ${Content}, :focus ${Content}, :hover ${Content} {
    opacity: 0;
    ${TRANSITION_ALL};
  }

  ${MobileFirstMediaQuery('xs')} {
    height: 20%;
    min-width: 50%;
    width: 50%;

    &:active button,
    :focus button,
    :hover button {
      opacity: 1;
      ${TRANSITION_ALL};
    }
  }

  ${MobileFirstMediaQuery('md')} {
    height: 50%;
    min-width: 20%;
    width: 20%;
  }

  ${MobileFirstMediaQuery('lg')} {
    height: 50%;
    min-width: 20%;
    width: 20%;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
`;

const Back = ({ id, onClick, ...props }) => (
  <BackButton
    id={`back-from-${id.toLowerCase()}`}
    aria-label={`back-from-${id.toLowerCase()}`}
    aria-hidden={'true'}
    // aria-pressed={'false'}
    size={'medium'}
    onClick={onClick}
    {...props}
  >
    Back
  </BackButton>
);

const BackBox = ({ boxId, colindex, onBack, type }) => {
  const name = 'Go Back';

  const onMouseEnter = id => {
    const button = document.getElementById(`back-from-${id.toLowerCase()}`);
    button.setAttribute('aria-hidden', false);
    // button.setAttribute('aria-pressed', true);
  };

  const onMouseLeave = id => {
    const button = document.getElementById(`back-from-${id.toLowerCase()}`);
    button.setAttribute('aria-hidden', true);
    // button.setAttribute('aria-pressed', false);
  };

  return (
    <Box
      boxId={boxId}
      colindex={colindex + 1}
      color={'#141414'}
      name={name}
      id={boxId}
      onMouseEnter={() => onMouseEnter(boxId)}
      onMouseLeave={() => onMouseLeave(boxId)}
      type={type}
    >
      <Container aria-label={`${boxId}-content`}>
        <Back id={boxId} onClick={onBack} />
        <Content aria-expanded={'false'}>
          <Name>{name}</Name>
        </Content>
      </Container>
    </Box>
  );
};

export default BackBox;
