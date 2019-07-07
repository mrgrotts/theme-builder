import { useState } from 'react';

export const ToggleState = initialState => {
  const [toggled, setToggle] = useState(initialState);

  const onSetToggle = status => setToggle(status);

  return [toggled, onSetToggle];
};
