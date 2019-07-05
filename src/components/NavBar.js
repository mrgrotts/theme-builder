import React from 'react';

import { Nav } from '../theme';

const NavBar = ({ className, children, id, style }) => (
  <Nav className={className} id={id} style={style}>
    {children}
  </Nav>
);

export default NavBar;
