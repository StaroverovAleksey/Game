const address = 'http://localhost';
//const address = 'http://3.18.225.147';

export const pathToImage = (path) => `url(../src/${path})`;
export const getPAthToImage = (sort, number, extension) => `assets/images/terrains/${sort}/${number}.${extension}`;

const pathAPI = (method) => `${address}/api${method}`;

/** *TERRAIN */
export const API_CREATE_TERRAINS = pathAPI('/terrain/create');
export const API_GET_TERRAINS = pathAPI('/terrain/read');
export const API_UPDATE_TERRAINS = pathAPI('/terrain/update');
export const API_DELETE_TERRAINS = pathAPI('/terrain/delete');

/** *MAP_CELL */
export const API_GET_MAP_CELLS = pathAPI('/map-cell/read');
export const API_DELETE_ALL_MAP_CELLS = pathAPI('/map-cell/delete-all');
