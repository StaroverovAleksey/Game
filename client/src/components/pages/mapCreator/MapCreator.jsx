import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftPart from './leftPart/LeftPart';
import TopPart from './topPart/TopPart';
import MainPart from './mainPart/MainPart';
import { setMapCells, setTerrains } from '../../../redux/actions';
import { API_GET_MAP_CELLS, API_GET_TERRAINS } from '../../../tools/routing';
import withRequest from '../../shells/ShellRequest';

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
const Loading = styled.p`
  font-size: 36px;
`;

class MapCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    // this._request();
    const { setTerrains, setMapCells } = this.props;
    const terrainsJson = await fetch(API_GET_TERRAINS);
    const terrains = await terrainsJson.json();
    setTerrains(terrains.terrains);

    const mapCellsJson = await fetch(API_GET_MAP_CELLS);
    const mapCells = await mapCellsJson.json();
    setMapCells(mapCells.mapCells);
    Promise.all([terrains, mapCells]).then(() => {
      this.setState({ loading: false });
    });
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
            </>
          )}

      </OuterWrapper>
    );
  }
}

MapCreator.propTypes = {
  setTerrains: PropTypes.func.isRequired,
  setMapCells: PropTypes.func.isRequired,
};

export default withRequest(connect(
  undefined,
  (mapDispatchToProps) => ({
    setTerrains: (data) => mapDispatchToProps(setTerrains(data)),
    setMapCells: (data) => mapDispatchToProps(setMapCells(data)),
  }),
)(MapCreator));
