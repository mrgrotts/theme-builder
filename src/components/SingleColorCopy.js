import React from 'react';
import styled from 'styled-components';

import { Button } from '../theme';
import { copyToClipboard } from '../utils';

const CopyButton = styled(Button)`
  color: ${props => (props.dark && props.dark ? 'rgba(255, 255, 255, 1)' : '#141414')};
  opacity: 0;
  text-transform: uppercase;
  width: 128px;
`;

const Copy = ({ id, color, onCopy, ...props }) => {
  const onClick = event => {
    copyToClipboard(event, color);
    onCopy(event);
  };

  return (
    <CopyButton
      id={`${id.toLowerCase()}-to-clipboard`}
      aria-label={`${id.toLowerCase()}-to-clipboard`}
      aria-hidden={'true'}
      // aria-pressed={'false'}
      size={'medium'}
      type={'copy'}
      onClick={onClick}
      {...props}
    >
      Copy
    </CopyButton>
  );
};

export default Copy;
