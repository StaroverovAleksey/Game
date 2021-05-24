import {SET_CHARACTER} from "../actions";

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CHARACTER:
      return { ...state, ...action.payload };
    default: return { ...state };
  }
}
