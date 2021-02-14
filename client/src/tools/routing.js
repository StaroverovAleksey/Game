// const address = 'http://localhost';
const address = 'http://3.18.225.147';

const pathAPI = (method) => `${address}/api${method}`;

/** *TERRAIN */
export const API_GET_TERRAINS = pathAPI('/terrain/get');

/** *MAP_CELL */
export const API_GET_MAP_CELLS = pathAPI('/map-cell/get');
export const API_DELETE_ALL_MAP_CELLS = pathAPI('/map-cell/delete-all');
