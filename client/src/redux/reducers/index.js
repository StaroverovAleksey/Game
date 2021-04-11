import { combineReducers } from 'redux';
import terrain from './terrain';
import map from './map';
import mapCell from './mapCell';
import setting from './setting';

export default combineReducers({
  terrain,
  map,
  mapCell,
  setting,
});
