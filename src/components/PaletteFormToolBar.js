import React from 'react';
import styled from 'styled-components';

import MenuIcon from '@material-ui/icons/Menu';

import PaletteFormMeta from './PaletteFormMeta';

import { Button, MobileFirstMediaQuery, Typography } from '../theme';

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

const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 0 1.5rem;
  position: relative;
  width: 100%;
`;

const MenuButton = styled(Button)`
  border-radius: 50%;
  display: ${({ open }) => (open ? 'none' : 'inline-flex')};
  height: 3rem;
  margin-right: 1rem;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  :active,
  :focus,
  :hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const Title = styled(Typography)`
  display: none;

  ${MobileFirstMediaQuery('xs')} {
    display: inline-flex;
    width: 100%;
  }
`;

const FormToolbar = ({ classes, onDrawerOpen, open, palettes, onSave, ...props }) => (
  <Toolbar>
    <Container>
      <MenuButton
        aria-label={'open drawer'}
        onClick={onDrawerOpen}
        open={open}
        style={{ boxShadow: 'none' }}
      >
        <MenuIcon style={{ color: '#141414' }} />
      </MenuButton>
      <Title type={'h6'} style={{ lineHeight: '5rem' }}>
        New Palette
      </Title>
      <PaletteFormMeta palettes={palettes} onSave={onSave} {...props} />
    </Container>
  </Toolbar>
);

export default FormToolbar;
