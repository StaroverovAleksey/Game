import {
  CHOICE_TERRAIN, LEFT_MENU_STATE, LOADING_MAP_SELLS, SET_ERROR, SET_SELECTED_MAP,
} from '../actions';

const defaultState = {
  selectedMap: 'loading',
  choiceTerrain: false,
  error: false,
  leftMenuState: true,
  loadingMapSells: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_MAP: return { ...state, selectedMap: action.payload };
    case CHOICE_TERRAIN: return { ...state, choiceTerrain: action.payload };
    case SET_ERROR: return { ...state, error: action.payload };
    case LEFT_MENU_STATE: return { ...state, leftMenuState: !state.leftMenuState };
    case LOADING_MAP_SELLS: return { ...state, loadingMapSells: action.payload };
    default: return { ...state };
  }
}
