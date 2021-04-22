import config from '../../config.json';

export const atrTerrainsPath = (name) => `url(${config.pathToArts}terrains/${name})`;
export const atrUtilsPath = (name) => `url(${config.pathToArts}utils/${name})`;

const pathAPI = (method) => `${config.serverAddress}/api${method}`;

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
