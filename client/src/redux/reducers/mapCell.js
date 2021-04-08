import { DELETE_ALL_MAP_SELLS, SET_MAP_CELLS } from '../actions';

export default function reducer(state = { }, action) {
  switch (action.type) {
    case SET_MAP_CELLS: return { ...state, ...action.payload };

    case DELETE_ALL_MAP_SELLS: return { };

    default: return { ...state };
  }
}
