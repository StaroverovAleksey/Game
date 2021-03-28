import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { atrTerrainsPath, atrUtilsPath } from '../../../../tools/routing';
import {connect} from "react-redux";
import {MapCell, Size, Terrain} from "../../../../tools/types";

const Wrapper = styled.div`
  position: absolute;
  cursor: ${({ choiceTerrain }) => (choiceTerrain ? `${atrUtilsPath('pencilCursor.png')}, pointer` : 'grab')};
  :active {
    cursor: ${({ choiceTerrain }) => (choiceTerrain ? `${atrUtilsPath('pencilCursor.png')}, pointer` : 'grabbing')};
  }
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

class TileField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qwerty: undefined,
      data: '',
      fieldX: 0,
      fieldY: 0,
      mouseX: null,
      mouseY: null,
    };
    this.fieldRef = React.createRef();
  }

  async componentDidMount () {
    await this.formatData();
    await this._preRender()
  }

  render() {
    const { choiceTerrain } = this.props;
    const { qwerty, fieldX, fieldY } = this.state;
    return qwerty ?
          <Wrapper
            choiceTerrain={choiceTerrain}
            onMouseDown={this._moveStart}
            onMouseUp={this._onMouseUp}
            ref={this.fieldRef}
            style={{top: `${fieldY}px`, left: `${fieldX}px`}}
          >
            {this.state.qwerty}

          </Wrapper>
      : null;
  }

  _preRender = async () => {
    const { size } = this.props;
    const { data } = this.state;
    this.setState({
      qwerty: <div>
        {new Array(size.width).fill('').map((value, y) => (
          <Row key={`tile_row_${y}`}>
            {new Array(size.height).fill('').map((value1, x) => {
              const name = `x${x + 1}y${y + 1}`;
              return <Tile
                fileName={data[name] ? atrTerrainsPath(data[name].fileName) : atrUtilsPath('emptyTile.png')}
                key={`tile_${x}${y}`}
              ></Tile>;
            })}
          </Row>
        ))}
      </div>
    })
  }

  _moveStart = (event) => {
    this.fieldRef.current.addEventListener('mousemove', this._onMouseMove );
    this.setState({mouseX: event.pageX, mouseY: event.pageY})
  }

  _onMouseUp = () => {
    this.fieldRef.current.removeEventListener('mousemove', this._onMouseMove );
    this.setState({mouseX: null, mouseY: null})
  }

  _onMouseMove = (event) => {
    const {fieldX, fieldY, mouseX, mouseY} = this.state;
    const { wrapperWidth, wrapperHeight, onMouseMove } = this.props;
    const { width, height } = this.props.size;

    const newFieldY = fieldY - (mouseY - event.pageY);
    const newFieldX = fieldX + (event.pageX - mouseX);
    this.setState({
      mouseX: event.pageX
      , mouseY: event.pageY
      , fieldX: newFieldX > 0 || newFieldX < -(width * 64 - wrapperWidth)  ? fieldX : newFieldX
      , fieldY: newFieldY > 0 || newFieldY < -(height * 64 - wrapperHeight) ? fieldY : newFieldY
    })
    onMouseMove(newFieldX > 0 || newFieldX < -(width * 64 - wrapperWidth)  ? fieldX : newFieldX);
  }

  formatData = async () => {
    const { mapCells } = this.props;
    const data = {};
    mapCells.map((value) => {
      const name = `x${value.x}y${value.y}`;
      data[name] = value.type;
    });
    this.setState({ data });
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
  wrapperWidth: PropTypes.oneOfType([
    PropTypes.oneOf([undefined]),
    PropTypes.PropTypes.number.isRequired,
  ]),
  wrapperHeight: PropTypes.oneOfType([
    PropTypes.oneOf([undefined]),
    PropTypes.PropTypes.number.isRequired,
  ]),
};

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell.mapCells,
  }),
)(TileField);
