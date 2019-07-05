import { useState } from 'react';

import { SnackbarState } from './snackbar.state';

export const FormatState = initialState => {
  const [open, toggleOpen] = SnackbarState(false);
  const [format, setFormat] = useState(initialState);

  const onToggleOpen = () => toggleOpen(!open);

  const onChangeFormat = event => {
    console.log(event);
    setFormat(event.target.value);
    onToggleOpen(!open);
  };

  return [format, open, onChangeFormat, onToggleOpen];
};
