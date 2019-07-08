import React from 'react';
import styled from 'styled-components';

import ColorBox from '../components/ColorBox';
import ColorDetailsModal from '../components/ColorDetailsModal';
import Layout from '../components/Layout';
import PaletteToolBar from '../components/PaletteToolBar';

import { StorageState, ToggleState } from '../hooks';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns } from '../theme';

const NavBarTitle = styled.h1.attrs(props => ({
  role: 'heading'
}))`
  color: #141414;
  display: none;
  font-size: 1.5rem;
  text-align: left;

  ${MobileFirstMediaQuery('xs')} {
    display: inline-flex;
  }
`;

const PaletteColors = styled.section.attrs(props => ({
  'aria-colcount': PaletteColumns,
  role: 'rowgroup'
}))`
  display: flex;
  flex-flow: row wrap;
  min-height: 100%;
`;

const Palette = ({ palette, updatePalette }) => {
  const [current, onCurrentDialog] = StorageState('current', null);
  const [format, onChangeFormat] = StorageState('format', 'hex');
  const [level, onChangeLevel] = StorageState('level', 500);
  const [toggled, OnToggle] = ToggleState(false);

  const onChange = (event, reason) => onChangeFormat(event.target.value);

  const onClick = (event, reason, color) => {
    if (reason === 'clickaway') {
      return;
    }

    console.log('fired onClick');
    OnToggle(true);
    onCurrentDialog(color);
  };

  const onClose = (event, reason) => {
    console.log('fired onClose: ', event, reason);
    if (reason === 'clickaway' || reason === 'timeout') {
      return;
    }

    OnToggle(false);
  };

  const onSave = (event, value) => {
    // event.preventDefault();
    console.log('fired onSave: ', value, current);
    let color = current;
    color.name = value;
    console.log('saving: ', color);
    updatePalette(palette.id, color);
    // OnToggle(false);
  };

  const { colors, emoji, id, paletteName } = palette;

  let colindex = 0;
  const colorBoxes = colors[level].map(color => {
    if (colindex === PaletteColumns) {
      colindex = 1;
    } else {
      colindex++;
    }

    return (
      <ColorBox
        key={color.id}
        boxId={color.name.toLowerCase().replace(/ /g, '-')}
        colindex={colindex}
        color={color[format]}
        id={color.id}
        name={color.name}
        onClick={(event, reason) => onClick(event, reason, color)}
        onSave={onSave}
        to={`/palettes/${palette.id}/colors/${color.id}`}
        type={'palette'}
      />
    );
  });

  return (
    <Layout emoji={emoji} paletteName={paletteName}>
      <Nav id={'palette'} style={{ padding: '1rem' }}>
        <NavBarTitle>
          <strong>Palette: </strong> {paletteName}
        </NavBarTitle>
        <PaletteToolBar
          format={format}
          level={level}
          open={toggled}
          onChange={onChange}
          onChangeLevel={onChangeLevel}
          onClose={onClose}
        />
      </Nav>
      <Main>
        <PaletteColors id={id}>{colorBoxes}</PaletteColors>
      </Main>
      {current && toggled && (
        <ColorDetailsModal
          boxId={current.name.toLowerCase().replace(/ /g, '-')}
          color={current}
          onClose={onClose}
          onSave={onSave}
          open={toggled}
          shades={`/palettes/${palette.id}/colors/${current.id}`}
          clone={`/palettes/${palette.id}/clone`}
        />
      )}
    </Layout>
  );
};

export default Palette;
