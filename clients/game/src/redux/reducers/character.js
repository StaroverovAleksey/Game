import {SET_CHARACTER} from "../actions";

const defaultState = {};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CHARACTER:
      return { ...state, ...action.payload };
    case "SET_CHARACTER1":
      console.log(action.payload, 7777777777777);
      return { ...state, ...action.payload };
    default: return { ...state };
  }
}
