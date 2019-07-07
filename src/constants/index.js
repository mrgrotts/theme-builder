import chroma from 'chroma-js';

export const DRAWER_WIDTH = 400;

export const THEME = {
  BOX_SHADOW: `box-shadow: 
    0px 1px 5px 0px rgba(0, 0, 0, 0.2), 
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,
  ROUNDED_BORDERS: `border-radius: 4px`,
  TEXT_COLOR: color => (chroma(color).luminance() <= 0.33 ? 'rgba(255, 255, 255, 1)' : '#141414'),
  TEXT_SHADOW: `text-shadow: 1px 2px rgba(0, 0, 0, 1)`,
  TRANSITION_ALL: `transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 100ms`
};

export const MAX_COLORS = 20;

export const MEDIA_QUERIES = {
  xs: {
    BREAKPOINT: 576, // 36rem
    DEFAULT_COLUMNS: 1,
    PALETTE_COLUMNS: 1,
    PALETTE_LIST_COLUMNS: 1
  },
  sm: {
    BREAKPOINT: 768, // 48rem
    DEFAULT_COLUMNS: 2,
    PALETTE_COLUMNS: 2,
    PALETTE_LIST_COLUMNS: 2
  },
  md: {
    BREAKPOINT: 992, // 62rem
    DEFAULT_COLUMNS: 3,
    PALETTE_COLUMNS: 4,
    PALETTE_LIST_COLUMNS: 3
  },
  lg: {
    BREAKPOINT: 1200, // 75 rem
    DEFAULT_COLUMNS: 4,
    PALETTE_COLUMNS: 5,
    PALETTE_LIST_COLUMNS: 3
  },
  xl: {
    BREAKPOINT: 1440, // 90 rem
    DEFAULT_COLUMNS: 5,
    PALETTE_COLUMNS: 5,
    PALETTE_LIST_COLUMNS: 3
  }
};
