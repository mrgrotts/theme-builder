import { useState } from 'react';

export const SnackbarState = initialState => {
  const [open, toggleOpen] = useState(initialState);

  const onToggleOpen = () => toggleOpen(!open);

  return [open, onToggleOpen];
};
