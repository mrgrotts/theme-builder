import { useState } from 'react';

export const DialogState = initialState => {
  const [open, toggleDialog] = useState(initialState);

  const onToggleDialog = () => toggleDialog(!open);

  return [open, onToggleDialog];
};

export const CurrentDialogState = initialState => {
  const [current, setCurrent] = useState(initialState);

  const onCurrentDialog = id => setCurrent(id);

  return [current, onCurrentDialog];
};
