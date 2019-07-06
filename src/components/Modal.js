import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Modal = ({ actions, children, content, open, onClose, PaperProps, title }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby={'dialog-title'} PaperProps={PaperProps}>
    <DialogTitle id="dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
      {children}
    </DialogContent>
    <DialogActions>{actions}</DialogActions>
  </Dialog>
);

export default Modal;
