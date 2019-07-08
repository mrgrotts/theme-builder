import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import AnimatedRouter from './hoc/AnimatedRouter';
import Palette from './pages/Palette';
import PaletteForm from './pages/PaletteForm';
import PaletteColor from './pages/PaletteColor';
import PaletteList from './pages/PaletteList';

import Store from './context';
import { generatePalette } from './utils';
import { MAX_COLORS } from './constants';

const App = props => {
  const [state, dispatch] = useContext(Store);
  const { palettes } = state;

  const defaultPalette = generatePalette(palettes[4]);

  const getPalette = id => generatePalette(palettes.find(palette => palette.id === id));

  const savePalette = palette => dispatch({ type: 'SAVE_PALETTE', palette });

  const updatePalette = (paletteId, color) => {
    const palette = palettes.find(palette => palette.id === paletteId);
    // console.log('new palette: ', palette);

    palette.colors = palette.colors.map(col => {
      if (col.name.toLowerCase() === color.id.toLowerCase()) {
        // console.log('old and new color: ', col, color.name);
        return { name: color.name, color: color.hex };
      } else {
        return col;
      }
    });

    dispatch({ type: 'UPDATE_PALETTE', palette });
  };

  const deletePalette = id => dispatch({ type: 'DELETE_PALETTE', id });

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
