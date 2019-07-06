import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import chroma from 'chroma-js';

import Copy from './Copy';

import { MobileFirstMediaQuery } from '../theme';

import { THEME } from '../constants';
const { TRANSITION_ALL, TEXT_SHADOW } = THEME;

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

const OverlayInfo = styled.div.attrs(props => ({
  color: props.dark && props.dark ? 'rgba(255, 255, 255, 1)' : '#141414'
}))`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transform: scale (0.1);
  z-index: -1;

  &.active {
    opacity: 1;
    transform: scale(1);
    transition: all 0.4s ease-in-out;
    transition-delay: 0.3s;
    z-index: 10;
  }

  h2 {
    background: rgba(255, 255, 255, 0.3);
    color: ${props => props.color || 'rgba(255, 255, 255, 1)'};
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 0;
    padding: 1rem;
    text-align: center;
    ${TEXT_SHADOW};
    text-transform: uppercase;
    width: 100%;
  }

  p {
    color: ${props => props.color || 'rgba(255, 255, 255, 1)'};
    font-size: 2rem;
    font-weight: 300;
    text-align: center;
  }
`;

const Overlay = styled.div.attrs(props => ({
  color: props.color || '#0a0a0a'
}))`
  background: ${props => props.color};
  height: 100%;
  opacity: 0;
  position: absolute;
  transform: scale(0.1);
  transition: transform 0.6s ease-in-out;
  z-index: 0;
  width: 100%;

  &.active {
    opacity: 1;
    transform: scale(50);
    z-index: 1;
  }
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

class ColorBox extends Component {
  state = {
    isActive: false
  };

  onCopy = () =>
    this.setState({ isActive: true }, () =>
      setTimeout(() => this.setState({ isActive: false }), 2500)
    );

  onMouseEnter = id => {
    const button = document.getElementById(`${id}-to-clipboard`);
    button.setAttribute('aria-hidden', false);
    // button.setAttribute('aria-pressed', true);
  };

  onMouseLeave = id => {
    const button = document.getElementById(`${id}-to-clipboard`);
    button.setAttribute('aria-hidden', true);
    // button.setAttribute('aria-pressed', false);
  };

  toColors = event => event.stopPropagation();

  render() {
    const { isActive } = this.state;
    let { boxId, colindex, color, name, to, type } = this.props;
    const isDark = chroma(color).luminance() <= 0.33;
    const dark = JSON.stringify(isDark);

    let shades = null;
    if (to) {
      shades = (
        <Shades aria-controls={boxId} onClick={this.toColors} role={'link'} to={to} dark={dark}>
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
        onMouseEnter={() => this.onMouseEnter(boxId)}
        onMouseLeave={() => this.onMouseLeave(boxId)}
        type={type}
      >
        <Overlay className={isActive && `active`} color={color} id={`${boxId}-overlay`} />
        <OverlayInfo className={isActive && `active`} dark={dark}>
          <h2>Copied!</h2>
          <p>{color}</p>
        </OverlayInfo>
        <Container aria-label={`${boxId}-content`}>
          <Copy id={boxId} onCopy={() => this.onCopy(boxId)} dark={isDark} />
          <Content aria-expanded={'false'}>
            <Name dark={isDark}>{name}</Name>
            {shades}
          </Content>
        </Container>
      </Box>
    );
  }
}

export default ColorBox;
