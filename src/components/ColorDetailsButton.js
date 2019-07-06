import React from 'react';
import styled from 'styled-components';

import { Button } from '../theme';

const DetailsButton = styled(Button)`
  color: ${props => (props.dark && props.dark ? 'rgba(255, 255, 255, 1)' : '#141414')};
  opacity: 0;
  text-transform: uppercase;
  width: 128px;
`;

const ColorDetailsButton = ({ id, onClick, ...props }) => (
  <DetailsButton
    id={`${id.toLowerCase()}-details`}
    aria-label={`${id.toLowerCase()}-details`}
    aria-hidden={'true'}
    // aria-pressed={'false'}
    size={'medium'}
    type={'details'}
    onClick={onClick}
    {...props}
  >
    Details
  </DetailsButton>
);

export default ColorDetailsButton;
