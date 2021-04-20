﻿import { DELETE_MAP, SET_MAPS, SET_ONE_MAP } from '../actions';

export default function reducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_MAPS: return { ...state, ...action.payload };

    case SET_ONE_MAP:
      newState.maps.push(action.payload);
      return newState;

    case DELETE_MAP:
      const index = newState.maps.findIndex((value) => value._id === action.payload);
      newState.maps.splice(index, 1);
      return newState;

    default: return { ...state };
  }
}
