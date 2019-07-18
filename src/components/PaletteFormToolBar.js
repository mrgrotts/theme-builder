import React from 'react';
import styled from 'styled-components';

import PaletteFormMeta from './PaletteFormMeta';

import { DRAWER_WIDTH, THEME } from '../constants';
const { BOX_SHADOW, TRANSITION_ALL } = THEME;

const Toolbar = styled.div`
  ${BOX_SHADOW};
  display: flex;
  height: 5rem;
  justify-content: center;
  flex-shrink: 0;
  position: relative !important;
  ${TRANSITION_ALL};
  width: 100%;
  z-index: 1;

  ${({ open }) =>
    open && {
      marginLeft: DRAWER_WIDTH,
      transition:
        'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      width: `calc(100% - ${DRAWER_WIDTH}px)`
    }}
`;

const FormToolbar = ({ ...props }) => (
  <Toolbar>
    <PaletteFormMeta {...props} />
  </Toolbar>
);

export default FormToolbar;
