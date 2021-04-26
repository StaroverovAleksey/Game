import {
  ADD_MAP_CELLS, DELETE_ALL_MAP_SELLS, DELETE_MAP_SELLS, SET_MAP_CELLS,
} from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_MAP_CELLS: return { ...action.payload };

    case ADD_MAP_CELLS: return { ...state, ...action.payload };

    case DELETE_MAP_SELLS:
      action.payload.forEach((cell) => {
        if (newState[cell]) {
          delete newState[cell];
        }
      });
      return { ...newState };

    case DELETE_ALL_MAP_SELLS: return { };

    default: return { ...state };
  }
}
