import React from 'react';
import styled from 'styled-components';

import ColorBox from '../components/ColorBox';
import ColorDetailsModal from '../components/ColorDetailsModal';
import Layout from '../components/Layout';
import PaletteToolBar from '../components/PaletteToolBar';

import { CurrentDialogState, FormatState, LevelState, SnackbarState } from '../hooks';
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
  const [current, onCurrentDialog] = CurrentDialogState(null);
  // const [open, onToggleDialog] = DialogState(false);

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

  const onClick = (event, reason, color) => {
    if (reason === 'clickaway') {
      return;
    }

    onOpen(true);
    onCurrentDialog(color);
  };

  const onClose = (event, reason) => {
    console.log('fired onClose: ', event, reason);
    if (reason === 'clickaway' || reason === 'timeout') {
      return;
    }

    onOpen(false);
  };

  const onSave = (event, value) => {
    console.log('fired onSave: ', value, current);
    let color = current;
    color.name = value;
    console.log('saving: ', color);
    updatePalette(palette.id, color);
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
          open={open}
          onChange={onChange}
          onChangeLevel={onChangeLevel}
          onClose={onClose}
        />
      </Nav>
      <Main>
        <PaletteColors id={id}>{colorBoxes}</PaletteColors>
      </Main>
      <ColorDetailsModal
        color={current}
        onClose={onClose}
        onSave={onSave}
        open={open}
        to={current && `/palettes/${palette.id}/colors/${current.id}`}
      />
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
