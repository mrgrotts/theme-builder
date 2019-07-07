import styled from 'styled-components';

import { MobileFirstMediaQuery } from '../queries';
import { THEME } from '../../constants';
const { BOX_SHADOW, ROUNDED_BORDERS, TEXT_COLOR, TRANSITION_ALL } = THEME;

const ButtonSizes = {
  small: {
    font: {
      mobile: '0.9rem',
      pc: '0.9rem'
    },
    lineHeight: 0.9,
    padding: 'calc(0.5rem - 1px) 0.75rem calc(0.5rem - 1px) 0.75rem'
  },
  medium: {
    font: {
      mobile: '1rem',
      pc: '1rem'
    },
    lineHeight: 1,
    padding: 'calc(0.75rem - 1px) 1rem calc(0.75rem - 1px) 1rem'
  },
  large: {
    font: {
      mobile: '1.25rem',
      pc: '1.25rem'
    },
    lineHeight: 1.25,
    padding: 'calc(0.75rem - 1px) 1rem calc(0.75rem - 1px) 1rem'
  }
};

export const Button = styled.button.attrs(props => ({
  'aria-hidden': 'false',
  //   'aria-pressed': 'false',
  outlined: props.outlined || false,
  role: 'button',
  size: ButtonSizes[props.size] || ButtonSizes.small,
  type: props.type || 'button'
}))`
  align-items: center;
  background: ${props =>
    props.outlined ? 'transparent' : props.color || `rgba(255, 255, 255, 0.3)`};
  border: ${props => (props.outlined ? `1px solid ${props.color}` : 'none')};
  ${ROUNDED_BORDERS};
  ${BOX_SHADOW};
  color: ${props =>
    props.outlined
      ? props.color
        ? props.color
        : TEXT_COLOR(props.color)
      : props.dark
      ? props.dark
        ? 'rgba(255, 255, 255, 1)'
        : '#141414'
      : 'rgba(255, 255, 255, 1)'};
  cursor: pointer;
  display: inline-flex;
  font-size: ${props => props.size.font.mobile};
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.025rem;
  line-height: ${props => props.size.lineHeight};
  outline: none;
  padding: ${props => props.size.padding};
  position: relative;
  text-align: center;
  text-transform: uppercase;
  ${TRANSITION_ALL};
  user-select: none;
  white-space: nowrap;

  ${MobileFirstMediaQuery('md')} {
    font-size: ${props => props.size.font.pc};
  }
`;
