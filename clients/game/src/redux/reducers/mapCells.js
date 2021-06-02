const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'MAP_CELLS_DEFAULT':
      return { ...defaultState };
    case 'MAP_CELLS_INITIAL':
      return { ...action.payload };
    default: return { ...state };
  }
}
