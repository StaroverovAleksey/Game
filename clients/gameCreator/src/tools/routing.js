import config from '../../config.json';

const pathAPI = (method) => `${process.env.NODE_ENV === 'development' ? config.develop.serverAddress : config.production.serverAddress}/api${method}`;

/** *PATH */
export const PATH_REGISTRATION = '/registration';
export const PATH_LOGIN = '/login';
export const PATH_GAME_CREATOR = '/game-creator';

/** *TERRAIN */
export const API_CREATE_TERRAIN = pathAPI('/terrains/create');
export const API_GET_TERRAIN = pathAPI('/terrains/read');
export const API_UPDATE_TERRAIN = pathAPI('/terrains/update');
export const API_DELETE_TERRAIN = pathAPI('/terrains/delete');

/** *MAP */
export const API_CREATE_MAP = pathAPI('/maps/create');
export const API_GET_MAPS = pathAPI('/maps/read');
export const API_UPDATE_MAP = pathAPI('/maps/update');
export const API_DELETE_MAP = pathAPI('/maps/delete');

/** *MAP_CELLS */
export const API_CREATE_MAP_CELL = pathAPI('/map-cells/create');
export const API_GET_MAP_CELL = pathAPI('/map-cells/read');
export const API_DELETE_MAP_CELL = pathAPI('/map-cells/delete');

/** *AUTH */
export const API_AUTH_REGISTRATION = pathAPI('/auth/registration');
export const API_AUTH_LOGIN = pathAPI('/auth/login');
export const API_AUTH_CHECK = pathAPI('/auth/check-auth');

/** *CHARACTER */
export const API_GET_CHARACTER = pathAPI('/character/read');
