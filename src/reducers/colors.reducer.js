export const colorsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COLOR': {
      return [...state, action.color];
    }
    case 'SET_COLORS': {
      return [...action.colors];
    }
    case 'CLEAR_COLORS': {
      return [];
    }
    case 'DELETE_COLOR': {
      return state.filter(color => color.name !== action.name);
    }
    default: {
      return state;
    }
  }
};
