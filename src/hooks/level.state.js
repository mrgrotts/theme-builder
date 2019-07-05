import { useState } from 'react';

export const LevelState = initialState => {
  const [level, setLevel] = useState(initialState);

  const onChangeLevel = newLevel => setLevel(newLevel);

  return [level, onChangeLevel];
};
