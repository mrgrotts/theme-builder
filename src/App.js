import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import AnimatedRouter from './hoc/AnimatedRouter';
import Palette from './pages/Palette';
import PaletteForm from './pages/PaletteForm';
import PaletteColor from './pages/PaletteColor';
import PaletteList from './pages/PaletteList';

import { generatePalette, seedPalettes } from './utils';
import { MAX_COLORS } from './constants';

const App = props => {
  const initialState = JSON.parse(window.localStorage.getItem('palettes')) || seedPalettes;
  const [palettes, setPalettes] = useState(initialState);

  const defaultPalette = generatePalette(palettes[4]);

  const getPalette = id => generatePalette(palettes.find(palette => palette.id === id));

  const savePalette = palette => {
    setPalettes([...palettes, palette]);
    syncLocalStorage();
  };

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id));
    syncLocalStorage();
  };

  const updatePalette = (paletteId, color) => {
    const update = palettes => {
      for (let palette in palettes) {
        if (palettes[palette].id === paletteId) {
          palettes[palette].colors = palettes[palette].colors.map(col =>
            col.name.toLowerCase() === color.id.toLowerCase()
              ? { name: color.name, color: color.hex }
              : col
          );
        }

        return palettes;
      }
    };

    setPalettes(update(palettes));
    syncLocalStorage();
  };

  const syncLocalStorage = () => window.localStorage.setItem('palettes', JSON.stringify(palettes));

  return (
    <AnimatedRouter>
      <Route
        exact
        path={`/`}
        render={props => (
          <PaletteList palettes={palettes} deletePalette={deletePalette} {...props} />
        )}
      />
      <Route
        exact
        path={`/palettes/new`}
        render={props => (
          <PaletteForm
            maxColors={MAX_COLORS}
            palettes={palettes}
            savePalette={savePalette}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/palettes/:palette`}
        render={props => (
          <Palette
            palette={getPalette(props.match.params.palette) || defaultPalette}
            updatePalette={updatePalette}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/palettes/:palette/clone`}
        render={props => (
          <PaletteForm
            maxColors={MAX_COLORS}
            palette={palettes[props.match.params.palette]}
            palettes={palettes}
            savePalette={savePalette}
            {...props}
          />
        )}
      />
      <Route
        exact
        path={`/palettes/:palette/colors/:color`}
        render={props => (
          <PaletteColor palette={getPalette(props.match.params.palette)} {...props} />
        )}
      />
    </AnimatedRouter>
  );
};

export default App;
