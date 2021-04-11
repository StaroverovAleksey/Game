import { DELETE_MAP, SET_MAPS } from '../actions';

export default function reducer(state = { }, action) {
  switch (action.type) {
    case SET_MAPS: return { ...state, ...action.payload };

    case DELETE_MAP: return { };

    default: return { ...state };
  }
}
