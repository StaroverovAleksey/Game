import React from 'react';
import {DELETE_COLLAGE, MAIN_TERRAIN, SECOND_TERRAIN} from "../../../../../src/utils/constants";
import WithRequest from "./ShellRequest";
import {API_CREATE_MAP_CELL, API_DELETE_MAP_CELL} from "../../tools/routing";
import {atrTerrainsPath, atrUtilsPath} from "../../../../../src/utils/utils";

class ShellTileField extends WithRequest {
  constructor(props) {
    super(props);
  }

  render() {}

  _moveStart = (event) => {
    const { serverRequest, mapDataType } = this.state;
    const { choiceTerrain } = this.props;
    event.preventDefault();
    if (event.button === 2) {
      this.fieldRef.current.addEventListener('mousemove', this._onMouseMove );
      this.setState({mouseX: event.pageX, mouseY: event.pageY});
    } else if (
      event.button === 0
      && !serverRequest
      && (choiceTerrain || mapDataType === DELETE_COLLAGE)) {
      this._painting(event);
      this.fieldRef.current.addEventListener('mouseover', this._painting);
    }
  }

  _onMouseUp = async (event) => {
    event.preventDefault();
    const { createMapData, mapDataTypeFix } = this.state;
    this.fieldRef.current.removeEventListener('mousemove', this._onMouseMove );
    this.fieldRef.current.removeEventListener('mouseover', this._painting );

    if (createMapData.length) {
      this.setState({serverRequest: true}, async () => {

      if (mapDataTypeFix === DELETE_COLLAGE) {
        await this._requestDeleteCells();
      } else {
        await this._requestCreateCells();
      }

      this.setState({
        mouseX: null,
        mouseY: null,
        createMapData: [],
        serverRequest: false,
        mapDataTypeFix: MAIN_TERRAIN
      });

      });
    }
  }

  _requestCreateCells = async () => {
    const { createMapData, mapDataTypeFix } = this.state;

    const { choiceTerrain, selectedMap, addingMapCells } = this.props;
    const data = {
      terrain_id: choiceTerrain._id,
      map_id: selectedMap._id,
      typeTerrain: mapDataTypeFix,
      cells: createMapData.map((item) => item.id)
    }

    const actionData = {};
    data.cells.forEach((value) => {
      actionData[value] = {};
      actionData[value][mapDataTypeFix] = choiceTerrain;
    });

    await this.POST(API_CREATE_MAP_CELL, JSON.stringify(data));
    addingMapCells(actionData);
    createMapData.forEach((item) => {
      item.style.opacity = 1;
      item.style.backgroundImage = '';
    })
  }

  _requestDeleteCells = async () => {
    const { createMapData } = this.state;
    const { selectedMap, deleteMapSells } = this.props;
    const data = {
      _id: selectedMap._id,
      cells: createMapData.map((item) => item.id)
    }

    await this.DELETE(API_DELETE_MAP_CELL, JSON.stringify(data));
    deleteMapSells(createMapData.map((item) => item.id));
    createMapData.forEach((item) => {
      item.style.opacity = 1;
      item.style.backgroundImage = '';
    })
  }

  _painting = async (event) => {
    const { createMapData, mapDataType } = this.state;
    const { choiceTerrain, addChoiceTerrain } = this.props;
    event.target.style.opacity = 0.3;
    if (mapDataType === DELETE_COLLAGE) {
      if (choiceTerrain) {
        addChoiceTerrain(false);
      }
    } else {
      event.target.style.backgroundImage = atrTerrainsPath(choiceTerrain.fileName);
    }
    createMapData.push(event.target);
    this.setState({createMapData, mapDataTypeFix: mapDataType});
  }

  _onMouseMove = (event) => {
    let {fieldX, fieldY, mouseX, mouseY, wrapperWidth, wrapperHeight} = this.state;
    const { onMouseMove } = this.props;
    const { x, y } = this.props.selectedMap.size;

    const newFieldY = fieldY - (mouseY - event.pageY);
    const newFieldX = fieldX + (event.pageX - mouseX);
    fieldX = newFieldX > 0 || newFieldX < -(parseInt(x) * 64 - wrapperWidth)  ? fieldX : newFieldX;
    fieldY = newFieldY > 0 || newFieldY < -(parseInt(y) * 64 - wrapperHeight) ? fieldY : newFieldY;
    this.setState({
      mouseX: event.pageX
      , mouseY: event.pageY
      , fieldX
      , fieldY
    })
    onMouseMove(fieldX, fieldY);
  }

  _keydownHandler = (event) => {
    const {mapDataType, serverRequest} = this.state;
    if (event.key === 'Control' && mapDataType !== SECOND_TERRAIN) {
      this.setState({mapDataType: SECOND_TERRAIN}, () => !serverRequest && this._onMouseUp(event));
    }

    if (event.key === 'Shift' && mapDataType !== DELETE_COLLAGE) {
      this.setState({mapDataType: DELETE_COLLAGE}, () => !serverRequest && this._onMouseUp(event));
    }
  }

  _keyupHandler = (event) => {
    const {mapDataType, serverRequest} = this.state;
    if (event.key === 'Control' && mapDataType === SECOND_TERRAIN) {
      this.setState({mapDataType: MAIN_TERRAIN}, () => !serverRequest && this._onMouseUp(event));
    }

    if (event.key === 'Shift' && mapDataType === DELETE_COLLAGE) {
      this.setState({mapDataType: MAIN_TERRAIN}, () => !serverRequest && this._onMouseUp(event));
    }
  }
}

export default ShellTileField;
