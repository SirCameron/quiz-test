export function createReducer(typeReducers, initialState) {
  return function (state = initialState, event) {
    if (typeof event === "undefined") {
      return state;
    }
    if (event.type in typeReducers) {
      return typeReducers[event.type](state, event);
    }
    return state;
  };
}
