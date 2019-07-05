import React from 'react';
import styled from 'styled-components';

const Name = styled.span`
  line-height: 2rem;
  margin-top: 0.5rem;
`;

const Emoji = styled.span`
  font-size: 1.5rem;
  margin: 0 1rem;
`;

const PaletteName = ({ emoji, name }) => (
  <>
    <Name>{name}</Name>
    <Emoji>{emoji}</Emoji>
  </>
);

export default PaletteName;
