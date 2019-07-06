import React from 'react';

import FooterContent from './FooterContent';
import Logo from './Logo';

import { Grid, Footer, Header } from '../theme';

const Layout = ({ children, emoji, id, paletteName }) => (
  <Grid id={id}>
    <Header>
      <Logo>{`JG Theme Builder`}</Logo>
    </Header>
    {children}
    <Footer>
      <FooterContent emoji={emoji} paletteName={paletteName} />
    </Footer>
  </Grid>
);

export default Layout;
