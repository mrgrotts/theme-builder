import React from 'react';
import styled from 'styled-components';

import DeleteIcon from '@material-ui/icons/Delete';

import { THEME } from '../constants';
const { BOX_SHADOW, ROUNDED_BORDERS, TRANSITION_ALL } = THEME;

const Box = styled.div`
  background: ${props => props.color};
  display: inline-flex;
  height: 25%;
  margin: 0 auto -0.25rem auto;
  position: relative;
  width: 20%;
`;

const Boxes = styled.div`
  ${ROUNDED_BORDERS};
  height: 150px;
  overflow: hidden;
`;

const Card = styled.li.attrs(props => ({
  'aria-colindex': props.colindex,
  'aria-label': props.id,
  role: 'gridcell'
}))`
  background: white;
  ${ROUNDED_BORDERS};
  ${BOX_SHADOW};
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  padding: 1rem;
  position: relative;

  &:hover svg {
    opacity: 1;
    ${TRANSITION_ALL};
  }
`;

const Delete = styled(DeleteIcon)`
  align-items: center;
  background-color: #eb3d30;
  color: white;
  display: flex;
  height: 2.5rem !important;
  justify-content: center;
  opacity: 0;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 2.5rem !important;
  z-index: 2;
`;

const Emoji = styled.span`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`;

const Title = styled.h2`
  align-items: center;
  color: rgba(10, 10, 10, 1);
  display: flex;
  font-size: 1.1rem;
  justify-content: space-between;
  line-height: 2rem;
  margin: 2rem 0 0 0;
  position: relative;
`;

const ColorBoxes = ({ colors }) => (
  <Boxes>
    {colors.map(color => (
      <Box key={color.name} color={color.color}></Box>
    ))}
  </Boxes>
);

const PaletteCard = ({ id, colindex, colors, emoji, onClick, onDelete, paletteName }) => (
  <Card key={id} id={id} colindex={colindex} onClick={onClick}>
    <Delete onClick={onDelete} />
    <ColorBoxes colors={colors} />
    <Title>
      {paletteName} <Emoji>{emoji}</Emoji>
    </Title>
  </Card>
);

export default PaletteCard;
