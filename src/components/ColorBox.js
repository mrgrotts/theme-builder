import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import chroma from 'chroma-js';

import ColorDetailsButton from './ColorDetailsButton';

import { MobileFirstMediaQuery } from '../theme';

import { THEME } from '../constants';
const { TRANSITION_ALL } = THEME;

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
  height: ${props => (props.type === 'shade' ? '10%' : '5%')};
  margin: 0 auto;
  position: relative;
  width: 100%;

  &:active button,
  :focus button,
  :hover button {
    opacity: 0;
    transition: none;
  }

  ${MobileFirstMediaQuery('xs')} {
    height: ${props => (props.type === 'shade' ? '20%' : '10%')};
    min-height: 10%;
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
    ${props =>
      props.type === 'shade'
        ? {
            height: '50%',
            minHeight: '25%',
            minWidth: '20%',
            width: '20%'
          }
        : {
            height: '20%',
            minHeight: '20%',
            minWidth: '25%',
            width: '25%'
          }}
  }

  ${MobileFirstMediaQuery('lg')} {
    height: ${props => (props.type === 'shade' ? '50%' : '25%')};
    min-height: 25%;
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

const Content = styled.div`
  align-items: center;
  bottom: 0;
  display: inline-flex;
  font-size: 0.9rem;
  justify-content: space-between;
  letter-spacing: 1px;
  position: absolute;
  width: 100%;
`;

const Name = styled.span.attrs(props => ({
  color: props.dark && props.dark ? 'rgba(255, 255, 255, 1)' : '#141414'
}))`
  color: ${props => props.color || '#141414'};
  padding: 0.5rem;
  text-transform: uppercase;
`;

const Shades = styled(Link).attrs(props => ({
  color: props.dark && props.dark ? 'rgba(255, 255, 255, 1)' : '#141414'
}))`
  align-self: flex-end;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: ${props => props.color || '#141414'};
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  text-align: center;
  text-transform: uppercase;
`;

const ColorBox = ({ boxId, colindex, color, name, onClick, to, type }) => {
  const onMouseEnter = id => {
    const button = document.getElementById(`${id}-details`);
    button.setAttribute('aria-hidden', false);
    // button.setAttribute('aria-pressed', true);
  };

  const onMouseLeave = id => {
    const button = document.getElementById(`${id}-details`);
    button.setAttribute('aria-hidden', true);
    // button.setAttribute('aria-pressed', false);
  };

  const toColors = event => event.stopPropagation();
  const isDark = chroma(color).luminance() <= 0.33;
  const dark = JSON.stringify(isDark);

  let shades = null;
  if (to) {
    shades = (
      <Shades aria-controls={boxId} onClick={toColors} role={'link'} to={to} dark={dark}>
        Shades
      </Shades>
    );
  }

  return (
    <Box
      id={boxId}
      colindex={colindex}
      color={color}
      name={name}
      onMouseEnter={() => onMouseEnter(boxId)}
      onMouseLeave={() => onMouseLeave(boxId)}
      type={type}
    >
      <Container aria-label={`${boxId}-content`}>
        <ColorDetailsButton id={boxId} onClick={onClick} dark={isDark} />
        <Content aria-expanded={'false'}>
          <Name dark={isDark}>{name}</Name>
          {shades}
        </Content>
      </Container>
    </Box>
  );
};

export default ColorBox;
