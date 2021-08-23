import {
  SET_TERRAINS, SET_ONE_TERRAIN, DELETE_TERRAIN, UPDATE_TERRAIN, SET_ONE_STRUCTURE,
} from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_ONE_STRUCTURE:
      newState.structures.push(action.payload);
      return newState;
    default: return { ...state };
  }
}
