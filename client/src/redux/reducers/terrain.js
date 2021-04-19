import {
  SET_TERRAINS, SET_ONE_TERRAIN, DELETE_TERRAIN, UPDATE_TERRAIN,
} from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  let index;
  switch (action.type) {
    case SET_TERRAINS: return { ...state, ...action.payload };

    case SET_ONE_TERRAIN:
      newState.terrains.push(action.payload);
      return newState;

    case UPDATE_TERRAIN:
      index = newState.terrains.findIndex((value) => value._id === action.payload._id);
      Object.keys(action.payload).forEach((key) => {
        if (newState.terrains[index][key]) {
          newState.terrains[index][key] = action.payload[key];
        }
      });
      return newState;

    case DELETE_TERRAIN:
      index = newState.terrains.findIndex((value) => value._id === action.payload);
      if (index > -1) {
        newState.terrains.splice(index, 1);
      }
      return newState;
    default: return { ...state };
  }
}
