import React from 'react';

import Logo from './Logo';
import PaletteName from './PaletteName';
import { Grid, Footer, Header } from '../theme';

const Layout = ({ children, emoji, id, paletteName }) => (
  <Grid id={id}>
    <Header>
      <Logo>{`JG Theme Builder`}</Logo>
    </Header>
    {children}
    <Footer>
      {(emoji && paletteName && <PaletteName emoji={emoji} name={paletteName} />) ||
        `Eventually A Better Footer...`}
    </Footer>
  </Grid>
);

export default Layout;
