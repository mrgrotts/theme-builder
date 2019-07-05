import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MobileFirstMediaQuery } from '../theme';

const Brand = styled(Link)`
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  font-size: 2rem;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;
  z-index: 1;

  ${MobileFirstMediaQuery('xs')} {
    font-size: 1.25rem;
  }
`;

const Logo = ({ children }) => <Brand to={'/'}>{children}</Brand>;

export default Logo;
