import { useState } from 'react';

export const PalettesState = initialState => {
  const [palettes, setPalettes] = useState(initialState);

  const onSetPalettes = palettes => setPalettes(palettes);

  return [palettes, onSetPalettes];
};
