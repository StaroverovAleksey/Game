/** **********************************************      TERRAINS      */
export const SET_TERRAINS = 'SET_TERRAINS';
export const setTerrains = (terrains) => ({ type: SET_TERRAINS, payload: terrains });
export const SET_ONE_TERRAIN = 'SET_ONE_TERRAIN';
export const setTerrain = (terrains) => ({ type: SET_ONE_TERRAIN, payload: terrains });
export const UPDATE_TERRAIN = 'UPDATE_TERRAIN';
export const updateTerrain = (terrain) => ({ type: UPDATE_TERRAIN, payload: terrain });
export const DELETE_TERRAIN = 'DELETE_TERRAIN';
export const deleteTerrain = (number) => ({ type: DELETE_TERRAIN, payload: number });

/** **********************************************      STRUCTURES      */
export const SET_ONE_STRUCTURE = 'SET_ONE_STRUCTURE';
export const setStructure = (structure) => ({ type: SET_ONE_STRUCTURE, payload: structure });

/** **********************************************      MAPS      */
export const SET_MAPS = 'SET_MAPS';
export const setMaps = (maps) => ({ type: SET_MAPS, payload: maps });
export const SET_ONE_MAP = 'SET_ONE_MAP';
export const setMap = (map) => ({ type: SET_ONE_MAP, payload: map });
export const UPDATE_MAP = 'UPDATE_MAP';
export const updateMap = (map) => ({ type: UPDATE_MAP, payload: map });
export const DELETE_MAP = 'DELETE_MAP';
export const deleteMap = (mapId) => ({ type: DELETE_MAP, payload: mapId });

/** **********************************************      CELLS      */
export const SET_MAP_CELLS = 'SET_MAP_CELLS';
export const setMapCells = (mapCells) => ({ type: SET_MAP_CELLS, payload: mapCells });
export const ADD_MAP_CELLS = 'ADD_MAP_CELLS';
export const addMapCells = (mapCells) => ({ type: ADD_MAP_CELLS, payload: mapCells });
export const DELETE_MAP_SELLS = 'DELETE_MAP_SELLS';
export const deleteMapSells = (cells) => ({ type: DELETE_MAP_SELLS, payload: cells });
export const DELETE_ALL_MAP_SELLS = 'DELETE_ALL_MAP_SELLS';
export const deleteAllMapSells = () => ({ type: DELETE_ALL_MAP_SELLS });

/** **********************************************      SETTINGS      */
export const SET_SELECTED_MAP = 'SET_SELECTED_MAP';
export const setSelectedMap = (map) => ({ type: SET_SELECTED_MAP, payload: map });
export const CHOICE_TERRAIN = 'CHOICE_TERRAIN';
export const choiceTerrain = (terrain) => ({ type: CHOICE_TERRAIN, payload: terrain });
export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const LEFT_MENU_STATE = 'LEFT_MENU_STATE';
export const changeStateLeftMenu = (state) => ({ type: LEFT_MENU_STATE, payload: state });
export const LOADING_MAP_SELLS = 'LOADING_MAP_SELLS';
export const loadingMapSells = (loading) => ({ type: LOADING_MAP_SELLS, payload: loading });
