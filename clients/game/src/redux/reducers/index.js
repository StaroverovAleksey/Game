import { combineReducers } from 'redux';
import settings from './settings';
import mapCells from './mapCells';
import mainChar from './mainChar';
import chars from './chars';
import choiceChar from './choiceChar';

export default combineReducers({
  settings,
  mapCells,
  mainChar,
  chars,
  choiceChar,
});
