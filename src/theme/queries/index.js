import { MEDIA_QUERIES } from '../../constants';

export const getColumns = (type = 'DEFAULT') => {
  const getSize = size => MEDIA_QUERIES[size];
  const sizes = Object.keys(MEDIA_QUERIES);

  for (let k = 0; k < sizes.length; k++) {
    let size = getSize(sizes[k]);

    if (k === 0 && size.BREAKPOINT >= window.innerWidth) {
      return size[`${type.toUpperCase()}_COLUMNS`];
    }

    if (size.BREAKPOINT >= window.innerWidth) {
      size = getSize(sizes[k - 1]);
      return size[`${type.toUpperCase()}_COLUMNS`];
    }
  }
};

export const DesktopFirstMediaQuery = size =>
  `@media (max-width: ${MEDIA_QUERIES[size].BREAKPOINT}px)`;

export const MobileFirstMediaQuery = size =>
  `@media (min-width: ${MEDIA_QUERIES[size].BREAKPOINT}px)`;

export const PaletteColumns = getColumns('PALETTE');
export const PaletteListColumns = getColumns('PALETTE_LIST');
