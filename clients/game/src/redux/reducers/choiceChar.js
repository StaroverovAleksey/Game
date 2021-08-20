const defaultState = {};

export default function reducer(state = defaultState, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHOICE_CHAR_LIST_DEFAULT':
      return { ...defaultState };
    case 'CHOICE_CHAR_LIST_INITIAL':
      return { chars: [...action.payload] };
    case 'CHOICE_CHAR_LIST_ADD':
      newState.chars.push(action.payload);
      return { ...newState };
    default: return { ...state };
  }
}
