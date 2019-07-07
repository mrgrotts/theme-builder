import { useState, useEffect } from 'react';

const store = window.localStorage;

export const StorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    let value;

    try {
      value = JSON.parse(store.getItem(key) || String(initialValue));
    } catch (error) {
      value = initialValue;
    }

    return value;
  });

  useEffect(() => store.setItem(key, JSON.stringify(state)), [state]);

  return [state, setState];
};
