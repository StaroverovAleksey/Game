import config from '../../config.json';

const pathAPI = (method) => `${process.env.NODE_ENV === 'development' ? config.develop.serverAddress : config.production.serverAddress}/api${method}`;

/** *PATH */
export const ROUT_MAIN = 'main';
export const ROUT_LOGIN = 'login';
export const ROUT_CHOICE_CHAR = 'choiceChar';
export const ROUT_CREATE_CHAR = 'createChar';
export const ROUT_REGISTRATION = 'registration';
export const ROUT_INVENTORY = 'inventory';
export const ROUT_SKILLS = 'skills';
export const ROUT_SETTINGS = 'settings';
export const ROUT_ERROR = 'error';

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
