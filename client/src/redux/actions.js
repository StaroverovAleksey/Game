export const SET_TERRAIN = 'SET_TERRAIN';
export const setTerrains = (terrains) => ({ type: SET_TERRAIN, payload: terrains });

export const SET_MAP_CELLS = 'SET_MAP_CELLS';
export const setMapCells = (mapCells) => ({ type: SET_MAP_CELLS, payload: mapCells });

export const DELETE_ALL_MAP_SELLS = 'DELETE_ALL_MAP_SELLS';
export const deleteAllMapSells = () => ({ type: DELETE_ALL_MAP_SELLS });

export const SET_SIZE = 'SET_SIZE';
export const setSize = (size) => ({ type: SET_SIZE, payload: size });
