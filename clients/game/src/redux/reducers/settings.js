import {ROUT_LOGIN} from "../../tools/routing";

const defaultState = {
  socket: {},
  routing: ROUT_LOGIN,
  error: {},
  mapSize: {x: 0, y: 0},
  artPaths: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SETTINGS_DEFAULT':
      return { ...defaultState, socket: state.socket};
    case 'SETTINGS_SET_SOCKET':
      return { ...state, socket: action.payload };
    case 'SETTINGS_SET_ART_PATHS':
      return { ...state, artPaths: action.payload };
    case 'SETTINGS_CHANGE_ROUTER':
      return { ...state, routing: action.payload };
    case 'SETTINGS_SET_MAP_SIZE':
      return { ...state, mapSize: action.payload };
    case 'SETTINGS_SET_ERROR':
      return { ...state, error: action.payload };
    default: return { ...state };
  }
}
