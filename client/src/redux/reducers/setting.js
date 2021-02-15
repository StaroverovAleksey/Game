import { SET_ERROR, SET_SIZE } from '../actions';

const defaultState = {
  size: { width: 100, height: 100 },
  error: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SIZE: return { ...state, size: action.payload };
    case SET_ERROR: return { ...state, error: action.payload };
    default: return { ...state };
  }
}
