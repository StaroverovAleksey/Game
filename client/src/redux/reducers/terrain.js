import { SET_TERRAINS, SET_ONE_TERRAIN, DELETE_TERRAIN } from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_TERRAINS: return { ...state, ...action.payload };

    case SET_ONE_TERRAIN:
      newState.terrains.push(action.payload);
      return newState;

    case DELETE_TERRAIN:
      const index = newState.terrains.findIndex((value) => value.number === action.payload);
      if (index > -1) {
        newState.terrains.splice(index, 1);
      }
      return newState;
    default: return { ...state };
  }
}
