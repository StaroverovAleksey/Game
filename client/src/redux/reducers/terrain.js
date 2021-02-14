import { SET_TERRAIN } from '../actions';

export default function reducer(state = { }, action) {
  switch (action.type) {
    case SET_TERRAIN: return { ...state, ...action.payload };
    default: return { ...state };
  }
}
