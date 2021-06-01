const defaultState = {};

export default function reducer(state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHARS_INITIAL':
      return { ...state, ...action.payload };
    case "CHARS_ADD":
      return { ...state, ...action.payload };
    case "CHARS_REMOVE":
      delete newState[action.payload];
      return { ...newState };
    default: return { ...state };
  }
}
