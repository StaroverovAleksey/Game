import { combineReducers } from 'redux';
import terrain from './terrain';
import structure from './structure';
import map from './map';
import mapCell from './mapCell';
import setting from './setting';

export default combineReducers({
  terrain,
  structure,
  map,
  mapCell,
  setting,
});
