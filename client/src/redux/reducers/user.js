export default function reducer(state = { routing: 'main', filter: false }, action) {
  switch (action.type) {
    case 'SET_TOKEN': return { ...state, token: action.payload };
    case 'CHANGE_ROUT': return { ...state, routing: action.payload };
    case 'DELETE_TOKEN': return state;
    case 'FILTER': return { ...state, filter: action.payload };
    default: return { ...state };
  }
}
