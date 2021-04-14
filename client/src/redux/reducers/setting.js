import {
  CHOICE_TERRAIN, LEFT_MENU_STATE, SET_ERROR, SET_SELECTED_MAP,
} from '../actions';

const defaultState = {
  selectedMap: {},
  choiceTerrain: false,
  error: false,
  leftMenuState: true,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_MAP: return { ...state, selectedMap: action.payload };
    case CHOICE_TERRAIN: return { ...state, choiceTerrain: action.payload };
    case SET_ERROR: return { ...state, error: action.payload };
    case LEFT_MENU_STATE: return { ...state, leftMenuState: !state.leftMenuState };
    default: return { ...state };
  }
}
