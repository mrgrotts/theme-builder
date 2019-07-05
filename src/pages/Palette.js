import React from 'react';
import styled from 'styled-components';

import PaletteToolBar from '../components/PaletteToolBar';
import ColorBox from '../components/ColorBox';
import Layout from '../components/Layout';

import { FormatState, LevelState, SnackbarState } from '../hooks';
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

const Palette = ({ defaultPalette, palette }) => {
  if (!palette) {
    palette = defaultPalette;
  }

  const [format, onChangeFormat] = FormatState('hex');
  const [level, onChangeLevel] = LevelState(500);
  const [open, onOpen] = SnackbarState(false);

  const onChange = (event, reason) => {
    onChangeFormat(event.target.value);

    if (reason === 'clickaway') {
      return;
    }

    onOpen(true);
  };

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    onOpen(false);
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
          open={open}
          onChange={onChange}
          onChangeLevel={onChangeLevel}
          onClose={onClose}
        />
      </Nav>
      <Main>
        <PaletteColors id={id}>{colorBoxes}</PaletteColors>
      </Main>
    </Layout>
  );
};

// class Palette extends Component {
//   state = {
//     format: 'hex',
//     level: 500,
//     open: false
//   };

//   shouldComponentUpdate(nextProps, nextState) {
//     const formatUnchanged = this.state.format === nextState.format;
//     const openToggled = this.state.open !== nextState.open;

//     if (formatUnchanged && openToggled) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   onChangeFormat = event => this.setState({ format: event.target.value, open: true });

//   onChangeLevel = level => this.setState({ level });

//   onToggleOpen = () => this.setState({ open: false });

//   render() {
//     const { format, level, open } = this.state;
//     let { defaultPalette, palette } = this.props;

//     if (!palette) {
//       palette = defaultPalette;
//     }

//     const { colors, emoji, id, paletteName } = palette;

//     let colindex = 0;
//     const colorBoxes = colors[level].map(color => {
//       if (colindex === PaletteColumns) {
//         colindex = 1;
//       } else {
//         colindex++;
//       }

//       return (
//         <ColorBox
//           key={color.id}
//           boxId={color.name.toLowerCase().replace(/ /g, '-')}
//           colindex={colindex}
//           color={color[format]}
//           id={color.id}
//           name={color.name}
//           to={`/palettes/${palette.id}/colors/${color.id}`}
//           type={'palette'}
//         />
//       );
//     });

//     return (
//       <Layout emoji={emoji} paletteName={paletteName}>
//         <Nav id={'palette'} style={{ padding: '1rem' }}>
//           <NavBarTitle>
//             <strong>Palette: </strong> {paletteName}
//           </NavBarTitle>
//           <PaletteToolBar
//             format={format}
//             level={level}
//             open={open}
//             onChangeFormat={this.onChangeFormat}
//             onChangeLevel={this.onChangeLevel}
//             onToggleOpen={this.onToggleOpen}
//           />
//         </Nav>
//         <Main>
//           <PaletteColors id={id}>{colorBoxes}</PaletteColors>
//         </Main>
//       </Layout>
//     );
//   }
// }

export default Palette;
