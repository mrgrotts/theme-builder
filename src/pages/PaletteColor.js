import React, { useContext } from 'react';
import styled from 'styled-components';

import BackBox from '../components/BackBox';
import SingleColorBox from '../components/SingleColorBox';
import Layout from '../components/Layout';
import PaletteToolBar from '../components/PaletteToolBar';

import { Store } from '../context';
import { StorageState, ToggleState } from '../hooks';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns } from '../theme';
import { generatePalette } from '../utils';

const Color = styled.section.attrs(props => ({
  'aria-colcount': PaletteColumns,
  role: 'rowgroup'
}))`
  height: 100%;
`;

const NavTitle = styled.h1.attrs(props => ({
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

const PaletteColor = ({ history, match }) => {
  const { palettes } = useContext(Store);

  const [format, onChangeFormat] = StorageState('format', 'hex');
  const [toggled, onToggle] = ToggleState(false);

  let paletteId = palettes[4];
  if (match.params.palette) {
    paletteId = palettes.find(palette => palette.id === match.params.palette);
  }

  const palette = generatePalette(paletteId);

  const onChange = (event, reason) => {
    onChangeFormat(event.target.value);

    if (reason === 'clickaway') {
      return;
    }

    onToggle(true);
  };

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onToggle(false);
  };

  const getShades = () => {
    let shades = [];

    for (let key in palette.colors) {
      shades.push(palette.colors[key].find(color => color.id === match.params.color));
    }

    return shades.slice(1);
  };

  const renderColors = () => {
    let colindex = 0;
    const backBoxId = `${palette.paletteName.toLowerCase().replace(/ /g, '-')}-back`;
    const shades = getShades();

    const colors = shades.map(shade => {
      if (colindex === PaletteColumns) {
        colindex = 1;
      } else {
        colindex++;
      }

      return (
        <SingleColorBox
          key={shade.name}
          boxId={shade.name.toLowerCase().replace(/ /g, '-')}
          colindex={colindex}
          color={shade[format]}
          name={shade.name}
          type={'shade'}
        />
      );
    });

    const back = (
      <BackBox
        key={backBoxId}
        boxId={backBoxId}
        colindex={colindex}
        onBack={() => history.goBack()}
        type={'back'}
      />
    );

    colors.push(back);
    return colors;
  };

  const { emoji, paletteName } = palette;
  const paletteColor = match.params.color.charAt(0).toUpperCase() + match.params.color.slice(1);

  return (
    <Layout emoji={emoji} paletteName={paletteName}>
      <Nav style={{ padding: '1rem' }}>
        <NavTitle>
          {paletteName}: {paletteColor}
        </NavTitle>
        <PaletteToolBar format={format} toggled={toggled} onChange={onChange} onClose={onClose} />
      </Nav>
      <Main>
        <Color id={match.params.color} style={{ margin: '0' }}>
          {renderColors()}
        </Color>
      </Main>
    </Layout>
  );
};

export default PaletteColor;
