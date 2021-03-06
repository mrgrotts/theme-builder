import React from 'react';
import styled from 'styled-components';

import { Button } from '../theme';
import { copyToClipboard } from '../utils';

const CopyButton = styled(Button)`
  background: transparent;
  box-shadow: none;
  color: #141414;
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
