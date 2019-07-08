import { useEffect, useReducer } from 'react';

export * from './colors.reducer';
export * from './palettes.reducer';

export const useLocalStorageReducer = (key, defaultValue, reducer) => {
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    let value;

    try {
      value = JSON.parse(window.localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      value = defaultValue;
    }

    return value;
  });

  useEffect(() => window.localStorage.setItem(key, JSON.stringify(state)), [key, state]);

  return [state, dispatch];
};
