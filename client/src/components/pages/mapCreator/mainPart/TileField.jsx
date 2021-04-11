import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {API_CREATE_MAP_CELL, atrTerrainsPath, atrUtilsPath} from '../../../../tools/routing';
import {connect} from "react-redux";
import {MapCell, Size, Terrain} from "../../../../tools/types";
import WithRequest from "../../../shells/ShellRequest";

const OuterWrapper = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  position: absolute;
  cursor: ${({ choiceTerrain }) => choiceTerrain ? `${atrUtilsPath('pencilCursor.png')}, pointer` : 'pointer'};
`;

const Row = styled.div`
  display: flex;
`;

const Tile = styled.div`
  display: inline-block;
  min-width: 64px;
  height: 64px;
  background-image: ${({ fileName }) => fileName};
  :hover {
    opacity: 0.7;
    background-color: rgba(230, 230, 230, 0.2);
  }
`;

class TileField extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      preparedData: undefined,
      fieldX: 0,
      fieldY: 0,
      mouseX: null,
      mouseY: null,
      createMapData: [],
      serverRequest: false,
    };
    this.wrapRef = React.createRef();
    this.fieldRef = React.createRef();
  }

  async componentDidMount () {
    await this._preRender();
    this._sizing();
    window.addEventListener('resize', this._sizing);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._sizing);
  }

  render() {
    const { choiceTerrain } = this.props;
    const { preparedData, fieldX, fieldY, serverRequest } = this.state;
    return preparedData ?
      <OuterWrapper ref={this.wrapRef}>
        <InnerWrapper
          choiceTerrain={choiceTerrain && !serverRequest}
          onMouseDown={this._moveStart}
          onMouseUp={this._onMouseUp}
          onContextMenu={(event) => event.preventDefault()}
          ref={this.fieldRef}
          style={{top: `${fieldY}px`, left: `${fieldX}px`}}
        >

          {this.state.preparedData}

        </InnerWrapper>
      </OuterWrapper>
      : null;
  }

  _preRender = async () => {
    const { size, mapCells } = this.props;
    this.setState({
      preparedData: <div>
        {new Array(size.width).fill('').map((value, y) => (
          <Row key={`tile_row_${y}`}>
            {new Array(size.height).fill('').map((value1, x) => {
              const name = `${x + 1}_${y + 1}`;
              return <Tile
                id={name}
                fileName={mapCells[name] ? atrTerrainsPath(mapCells[name].terrain.fileName) : atrUtilsPath('emptyTile.png')}
                key={`tile_${x}${y}`}
              />;
            })}
          </Row>
        ))}
      </div>
    })
  }

  _moveStart = (event) => {
    const { serverRequest } = this.state;
    const { choiceTerrain } = this.props;
    event.preventDefault();
    if (event.button === 2) {
      this.fieldRef.current.addEventListener('mousemove', this._onMouseMove );
      this.setState({mouseX: event.pageX, mouseY: event.pageY});
    } else if (event.button === 0 && choiceTerrain && !serverRequest) {
      this._painting(event);
      this.fieldRef.current.addEventListener('mouseover', this._painting);
    }
  }

  _onMouseUp = async (event) => {
    const { createMapData } = this.state;
    const { choiceTerrain } = this.props;
    event.preventDefault();
    this.fieldRef.current.removeEventListener('mousemove', this._onMouseMove );
    this.fieldRef.current.removeEventListener('mouseover', this._painting );

    if (createMapData.length) {
      const data = []
      for (let item of createMapData) {
        const x = parseInt(item.id.split('_')[0]);
        const y = parseInt(item.id.split('_')[1]);
        data.push({x, y, type: choiceTerrain.number});
      }
      this.setState({serverRequest: true});
      const answer = await this.POST(API_CREATE_MAP_CELL, JSON.stringify(data));
      for (let item of createMapData) {
        item.style.opacity = 1;
      }
    }

    this.setState({
      mouseX: null,
      mouseY: null,
      createMapData: [],
      serverRequest: false
    });
  }

  _onMouseMove = (event) => {
    let {fieldX, fieldY, mouseX, mouseY, wrapperWidth, wrapperHeight} = this.state;
    const { onMouseMove } = this.props;
    const { width, height } = this.props.size;

    const newFieldY = fieldY - (mouseY - event.pageY);
    const newFieldX = fieldX + (event.pageX - mouseX);
    fieldX = newFieldX > 0 || newFieldX < -(width * 64 - wrapperWidth)  ? fieldX : newFieldX;
    fieldY = newFieldY > 0 || newFieldY < -(height * 64 - wrapperHeight) ? fieldY : newFieldY;
    this.setState({
      mouseX: event.pageX
      , mouseY: event.pageY
      , fieldX
      , fieldY
    })
    onMouseMove(fieldX, fieldY);
  }

  _painting = async (event) => {
    const { createMapData } = this.state;
    const { choiceTerrain } = this.props;
    event.target.style.backgroundImage = atrTerrainsPath(choiceTerrain.fileName);
    event.target.style.opacity = 0.3;
    createMapData.push(event.target);
    this.setState({...createMapData});
  }

  _sizing = () => {
    let { fieldX, fieldY } = this.state;
    const { width, height } = this.props.size;
    const { onMouseMove } = this.props;
    fieldX = fieldX < -(width * 64 - this.wrapRef.current.offsetWidth)  ? -(width * 64 - this.wrapRef.current.offsetWidth) : fieldX;
    fieldY = fieldY < -(height * 64 - this.wrapRef.current.offsetHeight)  ? -(height * 64 - this.wrapRef.current.offsetHeight) : fieldY;
    this.setState({
      wrapperWidth: this.wrapRef.current.offsetWidth,
      wrapperHeight: this.wrapRef.current.offsetHeight,
      fieldX,
      fieldY,
    }, () => onMouseMove(fieldX, fieldY));
  }
}

TileField.propTypes = {
  size: PropTypes.shape(Size).isRequired,
  choiceTerrain: PropTypes.oneOfType([
    PropTypes.oneOf([false]),
    PropTypes.shape(Terrain),
  ]),
  mapCells: PropTypes.shape(
    PropTypes.shape(MapCell).isRequired,
    ),
  onMouseMove: PropTypes.func.isRequired,
};

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell,
  }),
)(TileField);
