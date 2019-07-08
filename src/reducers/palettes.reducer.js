const updatePalette = ({ colors, emoji, paletteName }) => {
  const id = paletteName.toLowerCase().replace(/ /g, '-');
  const palette = { colors, emoji: emoji && emoji.native ? emoji.native : emoji, id, paletteName };
  return palette;
};

export const palettesReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_PALETTE': {
      return [...state, action.palette];
    }
    case 'UPDATE_PALETTE': {
      return state.map(palette =>
        palette.id === action.palette.id ? updatePalette(action.palette) : palette
      );
    }
    case 'DELETE_PALETTE': {
      return state.filter(palette => palette.id !== action.id);
    }
    default: {
      return state;
    }
  }
};
