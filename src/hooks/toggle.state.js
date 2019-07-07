import { useState } from 'react';

export const ToggleState = initialState => {
  const [open, setOpen] = useState(initialState);

  const onOpen = status => setOpen(status);

  return [open, onOpen];
};
