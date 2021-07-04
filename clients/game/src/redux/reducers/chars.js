const defaultState = {};

export default function reducer(state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHARS_DEFAULT':
      return { ...defaultState };
    case 'CHARS_VISIBLE':
      return { ...defaultState };
    case 'CHARS_INITIAL':
      return { ...state, ...action.payload };
    case "CHARS_ADD":
      return { ...state, ...action.payload };
    case "CHARS_REMOVE":
      delete newState[action.payload];
      return { ...newState };
    case "CHARS_TURN":
      newState[action.payload.id].direction = action.payload.direction;
      return { ...newState };
    case "CHARS_STEP":
      newState[action.payload.id].location = action.payload.location;
      return { ...newState };
    default: return { ...state };
  }
}
