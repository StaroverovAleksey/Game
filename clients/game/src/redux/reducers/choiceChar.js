const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'CHOICE_CHAR_DEFAULT':
      return { ...defaultState };
    case 'CHOICE_CHAR_INITIAL':
      return { ...state, ...action.payload };
    default: return { ...state };
  }
}
