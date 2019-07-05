import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const EmojiPicker = ({ className, onClose, onSelect, open, PaperProps, set, style, title }) => (
  <Dialog onClose={onClose} open={open} PaperProps={PaperProps}>
    <Picker
      className={className}
      defaultSkin={1}
      onSelect={onSelect}
      set={set || 'google'}
      showSkinTones={true}
      style={style}
      title={title}
    />
  </Dialog>
);

export default EmojiPicker;
