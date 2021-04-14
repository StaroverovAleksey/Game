import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftPart from './leftPart/LeftPart';
import TopPart from './topPart/TopPart';
import MainPart from './mainPart/MainPart';
import {
  setError, setMapCells, setMaps, setSelectedMap, setTerrains,
} from '../../../redux/actions';
import { API_GET_MAP_CELL, API_GET_MAPS, API_GET_TERRAIN } from '../../../tools/routing';
import WithRequest from '../../shells/ShellRequest';
import RightPart from './rightPart/RightPart';

const OuterWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
const Loading = styled.p`
  font-size: 36px;
`;

class MapCreator extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      addTerrains, addMaps, addSelectedMap, addMapCells,
    } = this.props;
    const [terrains, maps] = await this.GET([API_GET_TERRAIN, API_GET_MAPS]);
    addTerrains(terrains);
    addMaps(maps);

    if (maps.maps.length > 0) {
      const selectedMap = maps.maps[0];
      const [mapCells] = await this.GET([`${API_GET_MAP_CELL}/?_id=${selectedMap._id}`]);
      addSelectedMap(selectedMap);
      addMapCells(mapCells);
    }

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <OuterWrapper>
        {loading
          ? <Loading>Загрузка...</Loading>
          : (
            <>
              <LeftPart />
              <InnerWrapper>
                <TopPart />
                <MainPart />
              </InnerWrapper>
              <RightPart />
            </>
          )}

      </OuterWrapper>
    );
  }
}

MapCreator.propTypes = {
  addTerrains: PropTypes.func.isRequired,
  addMaps: PropTypes.func.isRequired,
  addSelectedMap: PropTypes.func.isRequired,
  addMapCells: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addTerrains: (terrains) => mapDispatchToProps(setTerrains(terrains)),
    addMaps: (maps) => mapDispatchToProps(setMaps(maps)),
    addSelectedMap: (map) => mapDispatchToProps(setSelectedMap(map)),
    addMapCells: (mapCells) => mapDispatchToProps(setMapCells(mapCells)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapCreator);
