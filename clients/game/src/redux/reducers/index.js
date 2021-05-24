import { combineReducers } from 'redux';
import setting from './setting';
import mapCells from './mapCells';
import character from './character';

export default combineReducers({
  setting,
  mapCells,
  character,
});
