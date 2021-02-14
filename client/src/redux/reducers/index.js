import { combineReducers } from 'redux';
import terrain from './terrain';
import mapCell from './mapCell';
import setting from './setting';

export default combineReducers({
  terrain,
  mapCell,
  setting,
});
