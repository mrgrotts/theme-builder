import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AnimatedRouter from './hoc/AnimatedRouter';
import Palette from './pages/Palette';
import PaletteForm from './pages/PaletteForm';
import PaletteColor from './pages/PaletteColor';
import PaletteList from './pages/PaletteList';

import { generatePalette, seedPalettes } from './utils';

class App extends Component {
  state = {
    palettes: JSON.parse(window.localStorage.getItem('palettes')) || seedPalettes
  };

  getPalette = id => generatePalette(this.state.palettes.find(palette => palette.id === id));

  savePalette = palette =>
    this.setState({ palettes: [...this.state.palettes, palette] }, this.syncLocalStorage);

  deletePalette = id =>
    this.setState(
      prevState => ({
        palettes: prevState.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );

  updatePalette = (paletteId, color) => {
    let palettes;
    for (let palette in this.state.palettes) {
      if (this.state.palettes[palette].id === paletteId) {
        this.state.palettes[palette].colors = this.state.palettes[palette].colors.map(col =>
          col.name.toLowerCase() === color.id.toLowerCase()
            ? { name: color.name, color: color.hex }
            : col
        );
      }
      return palettes;
    }

    this.setState({ palettes }, this.syncLocalStorage);
  };

  syncLocalStorage = () =>
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));

  render() {
    let { palettes } = this.state;

    const defaultPalette = generatePalette(palettes[4]);

    return (
      <AnimatedRouter>
        <Route
          exact
          path={`/`}
          render={props => (
            <PaletteList palettes={palettes} deletePalette={this.deletePalette} {...props} />
          )}
        />
        <Route
          exact
          path={`/palettes/new`}
          render={props => (
            <PaletteForm palettes={palettes} savePalette={this.savePalette} {...props} />
          )}
        />
        <Route
          exact
          path={`/palettes/:palette`}
          render={props => (
            <Palette
              palette={this.getPalette(props.match.params.palette) || defaultPalette}
              updatePalette={this.updatePalette}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`/palettes/:palette/colors/:color`}
          render={props => (
            <PaletteColor palette={this.getPalette(props.match.params.palette)} {...props} />
          )}
        />
      </AnimatedRouter>
    );
  }
}

export default App;
