const defaultState = {};

export default function reducer(state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'MAIN_CHAR_INITIAL':
      return { ...state, ...action.payload };
    default: return { ...state };
  }
}
