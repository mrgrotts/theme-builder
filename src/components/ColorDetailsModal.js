import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import ModalForm from './Modal';

import { InputState } from '../hooks';

const ThemedInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.color || '#141414'};
  color: ${props => props.color || '#141414'};
  font-size: 1rem;
  height: 100%;
  outline: none;
  padding: 0.25rem;
  width: 100%;
`;

const ColorDetailsModal = ({ color, onClose, onSave, open, to, ...props }) => {
  if (!open || !color) {
    return null;
  }

  const [value, onInputChange] = InputState(color ? color.name : '');

  const toColors = event => event.stopPropagation();

  const actions = (
    <>
      <Button onClick={onClose} color={'primary'}>
        Cancel
      </Button>
      <Button variant={'contained'} color={'primary'} onClick={event => onSave(event, value)}>
        Save Palette
      </Button>
    </>
  );

  const content = (
    <Link onClick={toColors} to={to}>
      More Shades
    </Link>
  );

  return (
    <ModalForm
      actions={actions}
      content={content}
      onClose={onClose}
      open={open}
      PaperProps={{ style: { minWidth: '20rem' } }}
      title={color.name}
    >
      <div style={{ display: 'flex', flexFlow: 'column nowrap', margin: '1rem 0' }}>
        <fieldset>
          <label htmlFor={`colorName`}>Color Name</label>
          <ThemedInput
            id={`color-name`}
            name={`colorName`}
            onChange={onInputChange}
            value={value}
          />
        </fieldset>
        <hr />
        <span>HEX: {color.hex}</span>
        <span>RGB: {color.rgb}</span>
        <span>RGBA: {color.rgba}</span>
      </div>
      {/* <Button onClick={event => onSave(event)}>Update</Button> */}
    </ModalForm>
  );
};

export default ColorDetailsModal;
