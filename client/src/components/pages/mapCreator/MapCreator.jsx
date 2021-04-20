import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftPart from './leftPart/LeftPart';
import TopPart from './topPart/TopPart';
import MainPart from './mainPart/MainPart';
import {
  loadingMapSells,
  setError, setMapCells, setMaps, setSelectedMap, setTerrains,
} from '../../../redux/actions';
import { API_GET_MAP_CELL, API_GET_MAPS, API_GET_TERRAIN } from '../../../tools/routing';
import WithRequest from '../../shells/ShellRequest';
import RightPart from './rightPart/RightPart';
import {isEmpty} from "../../../tools/tools";

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
export const Loading = styled.p`
  font-size: 36px;
  text-align: center;
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
    } else {
      addSelectedMap({});
    }

    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps) {
    const {
      selectedMap, addMapCells, addLoadingMapSells, maps, addSelectedMap,
    } = this.props;

    if (!isEmpty(selectedMap) && prevProps.selectedMap !== 'loading' && prevProps.selectedMap !== selectedMap) {
      addLoadingMapSells(true);
      const [mapCells] = await this.GET([`${API_GET_MAP_CELL}/?_id=${selectedMap._id}`]);
      addMapCells(mapCells);
      addLoadingMapSells(false);
    }

    if (prevProps.maps !== maps) {
      if (maps.length === 0) {
        addSelectedMap({});
        return;
      }
      const index = maps.findIndex((value) => value._id === selectedMap._id);
      if (index === -1) {
        addSelectedMap(maps[0]);
      }
    }
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
  (mapStateToProps) => ({
    maps: mapStateToProps.map.maps,
    selectedMap: mapStateToProps.setting.selectedMap,
  }),
  (mapDispatchToProps) => ({
    addTerrains: (terrains) => mapDispatchToProps(setTerrains(terrains)),
    addMaps: (maps) => mapDispatchToProps(setMaps(maps)),
    addSelectedMap: (map) => mapDispatchToProps(setSelectedMap(map)),
    addMapCells: (mapCells) => mapDispatchToProps(setMapCells(mapCells)),
    addLoadingMapSells: (loading) => mapDispatchToProps(loadingMapSells(loading)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapCreator);
