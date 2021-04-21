import {DELETE_MAP, SET_MAPS, SET_ONE_MAP, UPDATE_MAP} from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  let index;
  switch (action.type) {
    case SET_MAPS: return { ...state, ...action.payload };

    case SET_ONE_MAP:
      newState.maps.push(action.payload);
      return newState;

    case UPDATE_MAP:
      index = newState.maps.findIndex((value) => value._id === action.payload._id);
      Object.keys(action.payload).forEach((key) => {
        newState.maps[index][key] = action.payload[key];
      });
      return newState;

    case DELETE_MAP:
      index = newState.maps.findIndex((value) => value._id === action.payload);
      newState.maps.splice(index, 1);
      return newState;

    default: return { ...state };
  }
}
