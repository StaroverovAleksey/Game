import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {API_CREATE_MAP_CELLS, atrTerrainsPath, atrUtilsPath} from '../../../../tools/routing';
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
      data: '',
      fieldX: 0,
      fieldY: 0,
      mouseX: null,
      mouseY: null,
      createCellData: [],
    };
    this.wrapRef = React.createRef();
    this.fieldRef = React.createRef();
  }

  async componentDidMount () {
    await this._formatData();
    await this._preRender();
    this._sizing();
    window.addEventListener('resize', this._sizing);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._sizing);
  }

  render() {
    const { choiceTerrain } = this.props;
    const { preparedData, fieldX, fieldY } = this.state;
    return preparedData ?
      <OuterWrapper ref={this.wrapRef}>
        <InnerWrapper
          choiceTerrain={choiceTerrain}
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
    const { size } = this.props;
    const { data } = this.state;
    this.setState({
      preparedData: <div>
        {new Array(size.width).fill('').map((value, y) => (
          <Row key={`tile_row_${y}`}>
            {new Array(size.height).fill('').map((value1, x) => {
              const name = `x${x + 1}y${y + 1}`;
              return <Tile
                id={name}
                fileName={data[name] ? atrTerrainsPath(data[name].fileName) : atrUtilsPath('emptyTile.png')}
                key={`tile_${x}${y}`}
              />;
            })}
          </Row>
        ))}
      </div>
    })
  }

  _moveStart = (event) => {
    const { choiceTerrain } = this.props;
    event.preventDefault();
    if (event.button === 2) {
      this.fieldRef.current.addEventListener('mousemove', this._onMouseMove );
      this.setState({mouseX: event.pageX, mouseY: event.pageY});
    } else if (event.button === 0 && choiceTerrain) {
      this._painting(event);
      this.fieldRef.current.addEventListener('mouseover', this._painting);
    }
  }

  _onMouseUp = async (event) => {
    const { createCellData } = this.state;
    event.preventDefault();
    this.fieldRef.current.removeEventListener('mousemove', this._onMouseMove );
    this.fieldRef.current.removeEventListener('mouseover', this._painting );
    console.log(createCellData);
    if (createCellData.length) {
      const answer = await this.POST(API_CREATE_MAP_CELLS, JSON.stringify(createCellData));
    }
    this.setState({mouseX: null, mouseY: null});
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
    const { createCellData } = this.state;
    const { choiceTerrain } = this.props;
    const x = parseInt(event.target.id.split('y')[0].split('x')[1]);
    const y = parseInt(event.target.id.split('y')[1]);
    //console.log(choiceTerrain);
    //console.log(x, y);
    event.target.style.backgroundImage = atrTerrainsPath(choiceTerrain.fileName);

    createCellData.push({x, y, type: choiceTerrain.number});
    this.setState({...createCellData});





    //const answer = await this.POST(API_CREATE_MAP_CELLS, JSON.stringify([{x: 2, y: 2, type: 2}]));
  }

  _formatData = async () => {
    const { mapCells } = this.props;
    const data = {};
    mapCells.map((value) => {
      const name = `x${value.x}y${value.y}`;
      data[name] = value.type;
    });
    this.setState({ data });
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
  mapCells: PropTypes.arrayOf(
    PropTypes.shape(MapCell).isRequired,
    ),
  onMouseMove: PropTypes.func.isRequired,
};

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell.mapCells,
  }),
)(TileField);
