import { SET_SIZE } from '../actions';

export default function reducer(state = { size: { width: 100, height: 100 } }, action) {
  switch (action.type) {
    case SET_SIZE: return { ...state, size: action.payload };
    default: return { ...state };
  }
}
