import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import red from '@material-ui/core/colors/red';

const DeleteDialog = ({ current, cta, id, message, open, onConfirm, onToggle }) => {
  const confirm = () => {
    onToggle();
    onConfirm(current);
  };

  return (
    <Dialog open={open} onClose={onToggle} aria-labelledby={id}>
      <DialogTitle id={id}>{message}</DialogTitle>
      <List>
        <ListItem aria-label={cta} button onClick={confirm}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
              <DeleteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={cta} />
        </ListItem>
        <ListItem aria-label={'Cancel'} button onClick={onToggle}>
          <ListItemAvatar>
            <Avatar>
              <CloseIcon color={`action`} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Cancel" />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default DeleteDialog;
