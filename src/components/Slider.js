import React from 'react';
import styled from 'styled-components';

import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { MobileFirstMediaQuery } from '../theme';

const ThemedSlider = styled.div`
  display: inline-flex;

  .rc-slider {
    cursor: grab;
    width: 10rem;

    ${MobileFirstMediaQuery('xs')} {
      margin: 0 1rem;
      width: 20rem;
    }
  }

  .rc-slider-handle {
    background: rgba(11, 100, 233, 1);
    border: 2px solid rgba(11, 100, 233, 1);
    box-shadow: none;
    height: 1rem;
    outline: none;
    width: 1rem;

    &:active,
    :focus,
    :hover {
      border: 2px solid rgba(11, 100, 233, 1);
      box-shadow: none;
      outline: none;
    }
  }

  .rc-slider-rail {
    height: 0.5rem;
  }

  .rc-slider-track {
    background: transparent;
  }
`;

const Slider = ({ defaultValue, min, max, onAfterChange, step }) => (
  <ThemedSlider>
    <RCSlider
      defaultValue={defaultValue}
      min={min || 100}
      max={max || 900}
      onAfterChange={onAfterChange}
      step={step || 100}
    />
  </ThemedSlider>
);

export default Slider;
