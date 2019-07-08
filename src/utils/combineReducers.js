// https://www.robinwieruch.de/redux-with-react-hooks/

export const combineReducers = reducers => {
  const keys = Object.keys(reducers);

  const store = keys.reduce(
    (state, reducer) => ({ ...state, [reducer]: reducers[reducer][0] }),
    {}
  );

  const dispatch = action => keys.map(key => reducers[key][1]).forEach(fn => fn(action));

  return [store, dispatch];
};
