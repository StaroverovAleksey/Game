import config from '../../config.json';

//const address = 'http://localhost';
const address = 'http://3.18.225.147';

export const qwerty = () => console.log(config);

export const pathToImage = (path) => `url(../src/assets/images/terrains/${path})`;

const pathAPI = (method) => `${address}/api${method}`;

/** *TERRAIN */
export const API_CREATE_TERRAINS = pathAPI('/terrain/create');
export const API_GET_TERRAINS = pathAPI('/terrain/read');
export const API_UPDATE_TERRAINS = pathAPI('/terrain/update');
export const API_DELETE_TERRAINS = pathAPI('/terrain/delete');

/** *MAP_CELL */
export const API_GET_MAP_CELLS = pathAPI('/map-cell/read');
export const API_DELETE_ALL_MAP_CELLS = pathAPI('/map-cell/delete-all');
