import React from 'react';
import { Route } from 'react-router-dom';

import AnimatedRouter from './hoc/AnimatedRouter';
import Palette from './pages/Palette';
import PaletteForm from './pages/PaletteForm';
import PaletteColor from './pages/PaletteColor';
import PaletteList from './pages/PaletteList';

const App = () => (
  <AnimatedRouter>
    <Route exact path={`/`} render={props => <PaletteList {...props} />} />
    <Route exact path={`/palettes/new`} render={props => <PaletteForm {...props} />} />
    <Route exact path={`/palettes/:palette`} render={props => <Palette {...props} />} />
    <Route exact path={`/palettes/:palette/clone`} render={props => <PaletteForm {...props} />} />
    <Route exact path={`/palettes/:palette/update`} render={props => <PaletteForm {...props} />} />
    <Route
      exact
      path={`/palettes/:palette/colors/:color`}
      render={props => <PaletteColor {...props} />}
    />
  </AnimatedRouter>
);

export default App;
