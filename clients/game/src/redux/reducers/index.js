import { combineReducers } from 'redux';
import settings from './settings';
import mapCells from './mapCells';
import mainChar from './mainChar';
import chars from './chars';

export default combineReducers({
  settings,
  mapCells,
  mainChar,
  chars,
});
