export  const SET_SOCKET = 'SET_SOCKET';












/** **********************************************      SETTINGS      */
export const SET_ROUTER = 'SET_ROUTER';
export const setRout = (rout) => ({ type: SET_ROUTER, payload: rout });
export const SET_ERROR = 'SET_ERROR';
export const setError = (error) => ({ type: SET_ERROR, payload: error });

/** **********************************************      CELLS      */
export const SET_CHARACTER = 'SET_CHARACTER';
export const setCharacter = (data) => ({ type: SET_CHARACTER, payload: data });

/** **********************************************      CELLS      */
export const SET_CELLS = 'SET_CELLS';
export const setCells = (cells) => ({ type: SET_CELLS, payload: cells });
