import { useState } from 'react';

export const StageState = initialState => {
  const [stage, setStage] = useState(initialState);

  const onSetStage = stage => setStage(stage);

  return [stage, onSetStage];
};
