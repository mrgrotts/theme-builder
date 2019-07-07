import { useState } from 'react';

export const ColorsState = initialState => {
  const [colors, setColors] = useState(initialState);

  const onSetColors = colors => setColors(colors);

  return [colors, onSetColors];
};
