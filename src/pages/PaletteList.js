import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import DeleteDialog from '../components/DeleteDialog';
import Layout from '../components/Layout';
import PaletteCard from '../components/PaletteCard';

import { StorageState, ToggleState } from '../hooks';
import { Button, List, Main, MobileFirstMediaQuery, Nav, PaletteListColumns } from '../theme';
import { THEME } from '../constants';
const { TRANSITION_ALL } = THEME;

const NewPaletteButton = styled(Button)`
  margin-top: 1rem;

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
  const [toggled, onToggle] = ToggleState(false);
  const [current, onCurrentDialog] = StorageState('current', null);

  const onToggleDialog = () => onToggle(!toggled);

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
      <Nav id={'palette-list'} style={{ justifyContent: 'space-around' }}>
        <NavBarTitle>Your Palettes</NavBarTitle>
        <Link to={`/palettes/new`}>
          <NewPaletteButton color={`#141414`} size={'medium'}>
            NEW PALETTE
          </NewPaletteButton>
        </Link>
      </Nav>
      <Main>
        <List columns={PaletteListColumns}>
          <TransitionGroup component={null}>{renderPalettes()}</TransitionGroup>
        </List>
      </Main>
      <DeleteDialog
        current={current}
        cta={'Delete'}
        id={'delete-palette-dialog'}
        open={toggled}
        message={`Delete Palette?`}
        onConfirm={deletePalette}
        onToggle={onToggleDialog}
      />
    </Layout>
  );
};

export default PaletteList;
