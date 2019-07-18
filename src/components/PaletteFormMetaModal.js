import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ValidatorForm } from 'react-material-ui-form-validator';

const PaletteFormMetaModal = ({
  actions,
  children,
  content,
  open,
  onClose,
  onSubmit,
  PaperProps,
  style,
  title
}) => (
  <>
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={'form-dialog-title'}
      PaperProps={PaperProps}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <ValidatorForm onSubmit={onSubmit} style={style}>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>{actions}</DialogActions>
      </ValidatorForm>
    </Dialog>
  </>
);

export default PaletteFormMetaModal;
