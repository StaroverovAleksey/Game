import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { atrTerrainsPath, atrUtilsPath } from '../../../../tools/routing';
import {connect} from "react-redux";
import {MapCell, Size, Terrain} from "../../../../tools/types";

const Qwerty = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
    };
  }

  componentDidMount() {
    this.formatData();
  }

  render() {
    const { size, choiceTerrain } = this.props;
    const { data } = this.state;
    console.log(data);
    return (

      <Qwerty choiceTerrain={choiceTerrain}>
        {new Array(size.width).fill('').map((value1, index1) => (
          <Row>
            {new Array(size.height).fill('').map((value, index) => {
              const name = `x${index + 1}y${index1 + 1}`;
              return <Tile fileName={data[name] ? atrTerrainsPath(data[name].fileName) : atrUtilsPath('emptyTile.png')} />;
            })}
          </Row>
        ))}
      </Qwerty>
    );
  }

  formatData = () => {
    const { mapCells } = this.props;
    console.log(mapCells);
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
};

export default connect(
  (mapStateToProps) => ({
    choiceTerrain: mapStateToProps.setting.choiceTerrain,
    mapCells: mapStateToProps.mapCell.mapCells,
  }),
)(TileField);
