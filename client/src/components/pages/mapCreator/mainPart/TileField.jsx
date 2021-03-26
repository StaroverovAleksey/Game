import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { atrTerrainsPath, atrUtilsPath } from '../../../../tools/routing';
import {connect} from "react-redux";
import {MapCell, Size, Terrain} from "../../../../tools/types";

const Qwerty = styled.div`
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
      data: '',
      fieldX: 0,
      fieldY: 0,
      mouseX: null,
      mouseY: null,
    };
    this.fieldRef = React.createRef();
  }

  componentDidMount() {
    this.formatData();
  }

  render() {
    const { size, choiceTerrain } = this.props;
    const { data, fieldX, fieldY } = this.state;
    return (

      <Qwerty
        choiceTerrain={choiceTerrain}
        onMouseDown={this._moveStart}
        onMouseUp={this._onMouseUp}
        ref={this.fieldRef}
        style={{top: `${fieldY}px`, left: `${fieldX}px`}}
      >
        {new Array(size.width).fill('').map((value, y) => (
          <Row key={`tile_row_${y}`}>
            {new Array(size.height).fill('').map((value1, x) => {
              console.log(345456);
              const name = `x${x + 1}y${y + 1}`;
              return <Tile
                fileName={data[name] ? atrTerrainsPath(data[name].fileName) : atrUtilsPath('emptyTile.png')}
                key={`tile_${x}${y}`}
              />;
            })}
          </Row>
        ))}
      </Qwerty>
    );
  }

  _moveStart = (event) => {
    this.fieldRef.current.addEventListener('mousemove', this._onMouseMove );
    this.setState({mouseX: event.pageX, mouseY: event.pageY})
    console.log(1111);
  }

  _onMouseUp = () => {
    this.fieldRef.current.removeEventListener('mousemove', this._onMouseMove );
    this.setState({mouseX: null, mouseY: null})
    console.log(22222);
  }

  _onMouseMove = (event) => {
    const {fieldX, fieldY, mouseX, mouseY} = this.state;
    const newFieldY = fieldY - (mouseY - event.pageY);
    const newFieldX = fieldX + (event.pageX - mouseX);
    //console.log(newFieldY, newFieldX);
    this.setState({
      mouseX: event.pageX
      , mouseY: event.pageY
      , fieldX: newFieldX
      , fieldY: newFieldY
    })
    //console.log(event);
  }

  formatData = () => {
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
};

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell.mapCells,
  }),
)(TileField);
