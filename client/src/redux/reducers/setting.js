import {
  CHOICE_TERRAIN, LEFT_MENU_STATE, SET_ERROR, SET_SIZE,
} from '../actions';

const defaultState = {
  size: { width: 20, height: 20 },
  choiceTerrain: false,
  error: false,
  leftMenuState: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SIZE: return { ...state, size: action.payload };
    case CHOICE_TERRAIN: return { ...state, choiceTerrain: action.payload };
    case SET_ERROR: return { ...state, error: action.payload };
    case LEFT_MENU_STATE: return { ...state, leftMenuState: !state.leftMenuState };
    default: return { ...state };
  }
}
