import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export const MaterialSnackbar = ({ message, open, onClose }) => (
  <Snackbar
    action={[
      <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ]}
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    autoHideDuration={3000}
    ContentProps={{ 'aria-describedby': 'snackbar' }}
    message={
      <span id="snackbar" style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon style={{ marginRight: '0.75rem' }} />
        {message || 'This is a test message!'}
      </span>
    }
    onClose={onClose}
    open={open}
  />
);
