const defaultState = {};

export default function reducer(state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'MAIN_CHAR_DEFAULT':
      return { ...defaultState };
    case 'MAIN_CHAR_INITIAL':
      return { ...state, ...action.payload };
    case 'MAIN_CHAR_TURN':
      newState.direction = action.payload;
      return { ...newState };
    case 'MAIN_CHAR_STEP':
      newState.location = action.payload;
      return { ...newState };
    default: return { ...state };
  }
}
