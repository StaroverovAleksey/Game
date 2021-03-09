import { SET_TERRAINS, SET_ONE_TERRAIN } from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_TERRAINS: return { ...state, ...action.payload };
    default: return { ...state };
    case SET_ONE_TERRAIN:
      newState.terrains.push(action.payload);
      return newState;
  }
}
