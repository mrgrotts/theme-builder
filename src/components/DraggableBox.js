import React from 'react';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';

import { MobileFirstMediaQuery } from '../theme';
import { THEME } from '../constants';
const { TRANSITION_ALL, TEXT_COLOR } = THEME;

const Box = styled.div.attrs(props => ({
  'aria-colindex': props.colindex,
  'aria-label': props.id,
  role: 'gridcell'
}))`
  align-items: center;
  background-color: ${props => props.color || '#141414'};
  cursor: pointer;
  display: inline-flex;
  justify-content: space-between;
  height: 5%;
  position: relative;
  width: 100%;

  :active svg,
  :focus svg,
  :hover svg {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.5);
    ${TRANSITION_ALL};
  }

  ${MobileFirstMediaQuery('xs')} {
    height: 10%;
    min-height: 10%;
    min-width: 50%;
    width: 50%;
  }

  ${MobileFirstMediaQuery('md')} {
    height: 20%;
    min-height: 20%;
    min-width: 25%;
    width: 25%;
  }

  ${MobileFirstMediaQuery('lg')} {
    height: 25%;
    min-height: 25%;
    min-width: 20%;
    width: 20%;
  }
`;

const Content = styled.div`
  align-items: center;
  bottom: 0;
  display: inline-flex;
  font-size: 0.9rem;
  justify-content: space-between;
  letter-spacing: 1px;
  padding: 0.5rem;
  position: absolute;
  width: 100%;
`;

const Delete = styled(DeleteIcon)`
  color: rgba(0, 0, 0, 0.5);
`;

const Name = styled.span`
  color: ${props => (props.color ? TEXT_COLOR(props.color) : '#141414')};
`;

const DraggableColorBox = ({ colindex, color, id, name, onDelete }) => (
  <Box id={id} colindex={colindex} color={color} name={name}>
    <Content>
      <Name color={color}>{name}</Name>
      <Delete onClick={onDelete} />
    </Content>
  </Box>
);

export default DraggableColorBox;
