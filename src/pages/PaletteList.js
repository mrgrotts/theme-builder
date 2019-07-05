import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import DeleteDialog from '../components/DeleteDialog';
import Layout from '../components/Layout';
import NavBar from '../components/NavBar';
import PaletteCard from '../components/PaletteCard';

import { DialogState, CurrentDialogState } from '../hooks';
import { Button, List, Main, MobileFirstMediaQuery, PaletteListColumns } from '../theme';
import { THEME } from '../constants';
const { TRANSITION_ALL } = THEME;

const NewPaletteButton = styled(Button)`
  :active,
  :focus,
  :hover {
    background: rgba(247, 247, 247);
    color: #141414;
    ${TRANSITION_ALL};
  }
`;

const NavBarTitle = styled.h1.attrs(props => ({
  role: 'heading'
}))`
  color: #141414;
  font-size: 1.5rem;
  text-align: left;

  ${MobileFirstMediaQuery('xs')} {
    display: none;
  }
`;

const PaletteList = ({ deletePalette, history, palettes }) => {
  const [open, onToggleDialog] = DialogState(false);
  const [current, onCurrentDialog] = CurrentDialogState(null);

  const onToggle = () => onToggleDialog(!open);

  const onDelete = (event, id) => {
    event.stopPropagation();
    onToggleDialog();
    onCurrentDialog(id);
  };

  const renderPalettes = () => {
    let colindex = 0;

    if (!palettes) {
      palettes = [];
    }

    return palettes.map(palette => {
      if (colindex === PaletteListColumns) {
        colindex = 1;
      } else {
        colindex++;
      }

      return (
        <CSSTransition key={palette.id} classNames={`fade`} timeout={500}>
          <PaletteCard
            key={palette.id}
            colindex={colindex}
            onClick={() => toPalette(palette.id)}
            onDelete={event => onDelete(event, palette.id)}
            {...palette}
          />
        </CSSTransition>
      );
    });
  };

  const toPalette = id => history.push(`/palettes/${id}`);

  return (
    <Layout>
      <NavBar id={'palette-list'} style={{ justifyContent: 'space-around' }}>
        <NavBarTitle>Your Palettes</NavBarTitle>
        <Link to={`/palettes/new`}>
          <NewPaletteButton color={`#141414`} size={'medium'}>
            NEW PALETTE
          </NewPaletteButton>
        </Link>
      </NavBar>
      <Main>
        <List columns={PaletteListColumns}>
          <TransitionGroup component={null}>{renderPalettes()}</TransitionGroup>
        </List>
      </Main>
      <DeleteDialog
        current={current}
        cta={'Delete'}
        id={'delete-palette-dialog'}
        open={open}
        message={`Delete Palette?`}
        onConfirm={deletePalette}
        onToggle={onToggle}
      />
    </Layout>
  );
};

export default PaletteList;
