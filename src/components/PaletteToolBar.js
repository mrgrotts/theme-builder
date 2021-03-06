import React from 'react';
import styled from 'styled-components';

import Slider from './Slider';
import { MaterialSnackbar as Snackbar, MobileFirstMediaQuery } from '../theme';

const Toolbar = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: center;
  width: 100%;

  ${MobileFirstMediaQuery('xs')} {
    justify-content: flex-end;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;

  ${MobileFirstMediaQuery('xs')} {
    display: block;
    height: auto;
    width: auto;
  }
`;

const SliderLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 1rem 1rem;

  ${MobileFirstMediaQuery('xs')} {
    font-size: 1rem;
    margin: 0;
  }
`;

const PaletteToolBar = ({ format, level, onChange, onChangeLevel, onClose, toggled }) => {
  let slider = null;
  if (level) {
    slider = (
      <SliderContainer>
        <SliderLabel>Level: {level}</SliderLabel>
        <Slider defaultValue={level} onAfterChange={onChangeLevel} />
      </SliderContainer>
    );
  }

  return (
    <>
      <Toolbar>{slider}</Toolbar>
      <Snackbar
        message={`Format Changed To: ${format.toUpperCase()}`}
        open={toggled}
        onClose={onClose}
      />
    </>
  );
};

export default PaletteToolBar;
