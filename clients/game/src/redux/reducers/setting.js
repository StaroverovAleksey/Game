import {SET_ERROR, SET_ROUTER} from "../actions";
import {ROUT_ERROR, ROUT_LOGIN, ROUT_MAIN} from "../../tools/routing";

const defaultState = {
  routing: ROUT_MAIN,
  error: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ROUTER:
      return { ...state, routing: action.payload };
    case SET_ERROR:
      if (action.payload.status && parseInt(action.payload.status) === 401) {
        return { ...state, error: action.payload, routing: action.payload = ROUT_LOGIN };
      }
      return { ...state, error: action.payload, routing: action.payload = ROUT_ERROR };
    default: return { ...state };
  }
}
