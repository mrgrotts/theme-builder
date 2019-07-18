import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Copy from './Copy';
import ModalEditable from './ModalEditable';

import { InputState } from '../hooks';
import { THEME } from '../constants';
const { TRANSITION_ALL } = THEME;

const Divider = styled.hr`
  background-color: rgb(238, 238, 238);
  border: none;
  margin: 1.5rem 0px;
  height: 1px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: ${props => props.color || '#141414'};
  font-size: 1.1rem;
  line-height: 2.25rem;
  outline: none;
  ${TRANSITION_ALL};

  :active,
  :focus {
    border-bottom: 1px solid ${props => props.color || '#141414'};
  }
`;

const CopyColor = ({ boxId, color, onCopy }) => <Copy id={boxId} color={color} onCopy={onCopy} />;

const ColorDetailsModal = ({
  boxId,
  clone,
  color,
  onClose,
  onSave,
  open,
  shades,
  update,
  ...props
}) => {
  if (!open || !color) {
    return null;
  }

  const [value, onInputChange] = InputState(color.name);

  const onChange = event => {
    if (event.type === 'change' || event.type === 'blur') {
      onInputChange(event);
    }
  };

  const onCopy = event => {
    let copy = event.target;

    copy.innerText = `Copied!`;
    setTimeout(() => {
      copy.innerText = `Copy`;
    }, 2500);
  };

  const toColors = event => {
    event.stopPropagation();
    onClose();
  };

  const onSubmit = event => {
    event.stopPropagation();
    onClose();
    onSave(event, value);
  };

  const editableTitle = (
    <Input
      id={`color-name`}
      name={`colorName`}
      color={color.color}
      onChange={onChange}
      type={`text`}
      value={value}
    />
  );

  const content = (
    <Link onClick={toColors} style={{ fontSize: '1.1rem' }} to={shades}>
      More Shades
    </Link>
  );

  return (
    <ModalEditable
      content={content}
      color={color}
      onClose={onClose}
      onSubmit={onSubmit}
      open={open}
      PaperProps={{ style: { minWidth: '20rem' } }}
      title={editableTitle}
      pathname={update}
    >
      <Divider />
      <div style={{ display: 'flex', flexFlow: 'column nowrap', margin: '1rem 0' }}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            unicodeBidi: 'normal'
          }}
        >
          <span>HEX: {color.hex}</span>
          <CopyColor boxId={boxId} color={color.hex} onCopy={onCopy} />
        </div>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <span>RGB: {color.rgb}</span>
          <CopyColor boxId={boxId} color={color.rgb} onCopy={onCopy} />
        </div>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <span>RGBA: {color.rgba}</span>
          <CopyColor boxId={boxId} color={color.rgba} onCopy={onCopy} />
        </div>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <span>CMYK: {color.cmyk}</span>
          <CopyColor boxId={boxId} color={color.cmyk} onCopy={onCopy} />
        </div>
      </div>
    </ModalEditable>
  );
};

export default ColorDetailsModal;
