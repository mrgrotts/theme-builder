import React from 'react';

import { Store, Dispatch } from './context';
import { colorsReducer, palettesReducer, useLocalStorageReducer } from './reducers';
import { seedPalettes, combineReducers } from './utils';

const Root = ({ children }) => {
  const [state, dispatch] = combineReducers({
    colors: useLocalStorageReducer('colors', seedPalettes[0].colors, colorsReducer),
    palettes: useLocalStorageReducer('palettes', seedPalettes, palettesReducer)
  });

  return (
    <Store.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Store.Provider>
  );
};

export default Root;
