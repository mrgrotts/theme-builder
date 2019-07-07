import React from 'react';
import styled from 'styled-components';

import BackBox from '../components/BackBox';
import SingleColorBox from '../components/SingleColorBox';
import Layout from '../components/Layout';
import PaletteToolBar from '../components/PaletteToolBar';

import { FormatState, ToggleState } from '../hooks';
import { Main, MobileFirstMediaQuery, Nav, PaletteColumns } from '../theme';

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

const PaletteColor = ({ history, match, palette }) => {
  const [format, onChangeFormat] = FormatState('hex');
  const [open, onOpen] = ToggleState(false);

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
        <PaletteToolBar format={format} open={open} onChange={onChange} onClose={onClose} />
      </Nav>
      <Main>
        <Color id={match.params.color} style={{ margin: '0' }}>
          {renderColors()}
        </Color>
      </Main>
    </Layout>
  );
};

// class PaletteColor extends Component {
//   state = {
//     format: 'hex',
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

//   getShades = () => {
//     const { match, palette } = this.props;
//     let shades = [];

//     for (let key in palette.colors) {
//       shades.push(palette.colors[key].find(color => color.id === match.params.color));
//     }

//     return shades.slice(1);
//   };

//   onChangeFormat = event => this.setState({ format: event.target.value, open: true });

//   onToggleOpen = () => this.setState({ open: false });

//   renderColors = () => {
//     let colindex = 0;
//     const backBoxId = `${this.props.palette.paletteName.toLowerCase().replace(/ /g, '-')}-back`;
//     const shades = this.getShades();

//     const colors = shades.map(shade => {
//       if (colindex === PaletteColumns) {
//         colindex = 1;
//       } else {
//         colindex++;
//       }

//       return (
//         <ColorBox
//           key={shade.name}
//           boxId={shade.name.toLowerCase().replace(/ /g, '-')}
//           colindex={colindex}
//           color={shade[this.state.format]}
//           name={shade.name}
//           type={'shade'}
//         />
//       );
//     });

//     const back = (
//       <BackBox
//         key={backBoxId}
//         boxId={backBoxId}
//         colindex={colindex}
//         onBack={() => this.props.history.goBack()}
//         type={'back'}
//       />
//     );

//     colors.push(back);
//     return colors;
//   };

//   render() {
//     const { format, open } = this.state;
//     const { match, palette } = this.props;
//     console.log(open);

//     const { emoji, paletteName } = palette;
//     const paletteColor = match.params.color.charAt(0).toUpperCase() + match.params.color.slice(1);

//     return (
//       <Layout emoji={emoji} paletteName={paletteName}>
//         <Nav style={{ padding: '1rem' }}>
//           <NavTitle>
//             {paletteName}: {paletteColor}
//           </NavTitle>
//           <PaletteToolBar
//             format={format}
//             open={open}
//             onChangeFormat={this.onChangeFormat}
//             onToggleOpen={this.onToggleOpen}
//           />
//         </Nav>
//         <Main>
//           <Color id={match.params.color} style={{ margin: '0' }}>
//             {this.renderColors()}
//           </Color>
//         </Main>
//       </Layout>
//     );
//   }
// }

export default PaletteColor;
