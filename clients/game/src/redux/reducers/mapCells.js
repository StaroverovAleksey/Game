import {SET_CELLS} from "../actions";

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CELLS:
      return { ...action.payload };
    default: return { ...state };
  }
}
