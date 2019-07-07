import { useState } from 'react';

export const ToggleState = initialState => {
  const [toggled, setToggle] = useState(initialState);

  const onToggle = status => setToggle(status);

  return [toggled, onToggle];
};
