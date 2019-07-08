import { useState, useEffect } from 'react';

const storage = window.localStorage;

export const StorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    let value;

    try {
      value = JSON.parse(storage.getItem(key) || String(initialValue));
    } catch (error) {
      value = initialValue;
    }

    return value;
  });

  useEffect(() => storage.setItem(key, JSON.stringify(state)), [key, state]);

  const reset = () => storage.setItem(key, initialValue);

  return [state, setState, reset];
};
