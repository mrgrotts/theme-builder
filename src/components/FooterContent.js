import React from 'react';
import PaletteName from './PaletteName';

const FooterContent = ({ emoji, paletteName }) =>
  emoji && paletteName ? (
    <PaletteName emoji={emoji} name={paletteName} />
  ) : (
    `Eventually A Better Footer...`
  );

export default FooterContent;
