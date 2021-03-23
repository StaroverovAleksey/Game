import config from '../../config.json';

export const atrTerrainsPath = (path) => `url(${config.pathToArts}terrains/${path})`;
export const atrUtilsPath = (path) => `url(${config.pathToArts}utils/${path})`;

const pathAPI = (method) => `${config.serverAddress}/api${method}`;

/** *TERRAIN */
export const API_CREATE_TERRAINS = pathAPI('/terrain/create');
export const API_GET_TERRAINS = pathAPI('/terrain/read');
export const API_UPDATE_TERRAINS = pathAPI('/terrain/update');
export const API_DELETE_TERRAINS = pathAPI('/terrain/delete');

/** *MAP_CELL */
export const API_GET_MAP_CELLS = pathAPI('/map-cell/read');
export const API_DELETE_ALL_MAP_CELLS = pathAPI('/map-cell/delete-all');
