/** **********************************************      TERRAINS      */
export const SET_TERRAINS = 'SET_TERRAINS';
export const setTerrains = (terrains) => ({ type: SET_TERRAINS, payload: terrains });
export const SET_ONE_TERRAIN = 'SET_ONE_TERRAIN';
export const setTerrain = (terrains) => ({ type: SET_ONE_TERRAIN, payload: terrains });
export const DELETE_TERRAIN = 'DELETE_TERRAIN';
export const deleteTerrain = (number) => ({ type: DELETE_TERRAIN, payload: number });

/** **********************************************      CELLS      */
export const SET_MAP_CELLS = 'SET_MAP_CELLS';
export const setMapCells = (mapCells) => ({ type: SET_MAP_CELLS, payload: mapCells });
export const DELETE_ALL_MAP_SELLS = 'DELETE_ALL_MAP_SELLS';
export const deleteAllMapSells = () => ({ type: DELETE_ALL_MAP_SELLS });

/** **********************************************      SETTINGS      */
export const SET_SIZE = 'SET_SIZE';
export const setSize = (size) => ({ type: SET_SIZE, payload: size });
export const CHOICE_TERRAIN = 'CHOICE_TERRAIN';
export const choiceTerrain = (terrain) => ({ type: CHOICE_TERRAIN, payload: terrain });
export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => ({ type: SET_ERROR, payload: error });
