import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const TitleContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 1.5rem;
`;

const EditLink = styled(Link)`
  font-size: 1.1rem;
`;

const EditableModal = ({
  children,
  content,
  open,
  onClose,
  onSubmit,
  PaperProps,
  style,
  title,
  pathname
}) => {
  const to = { pathname, state: { fromPalette: true } };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={'form-dialog-title'}
      PaperProps={PaperProps}
    >
      <form onSubmit={onSubmit} style={style}>
        <TitleContainer id="form-dialog-title">
          <fieldset>
            <label htmlFor={`colorName`} style={{ display: 'none' }}>
              Color Name
            </label>
            {title}
          </fieldset>
          <div style={{ display: 'flex' }}>
            <EditLink to={to}>
              <Button color={'primary'}>Edit Palette</Button>
            </EditLink>
          </div>
        </TitleContainer>

        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color={'primary'}>
            Cancel
          </Button>
          <Button variant={'contained'} color={'primary'} type={`submit`}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditableModal;
