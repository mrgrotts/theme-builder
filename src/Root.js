import React from 'react';

import Store from './context';
import { colorsReducer, palettesReducer, useLocalStorageReducer } from './reducers';
import { seedPalettes, combineReducers } from './utils';

const Root = ({ children }) => {
  const store = combineReducers({
    colors: useLocalStorageReducer('colors', seedPalettes[0].colors, colorsReducer),
    palettes: useLocalStorageReducer('palettes', seedPalettes, palettesReducer)
  });

  return <Store.Provider value={store}>{children}</Store.Provider>;
};

export default Root;
