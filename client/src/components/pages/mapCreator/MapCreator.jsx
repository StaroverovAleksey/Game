import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftPart from './leftPart/LeftPart';
import TopPart from './topPart/TopPart';
import MainPart from './mainPart/MainPart';
import { setError, setMapCells, setTerrains } from '../../../redux/actions';
import { API_GET_MAP_CELLS, API_GET_TERRAINS } from '../../../tools/routing';
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
    const { addTerrains, addMapCells } = this.props;
    const [terrains, mapCells] = await this.GET([API_GET_TERRAINS, API_GET_MAP_CELLS]);
    addTerrains(terrains);
    addMapCells(mapCells);
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
  addMapCells: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  (mapDispatchToProps) => ({
    addTerrains: (data) => mapDispatchToProps(setTerrains(data)),
    addMapCells: (data) => mapDispatchToProps(setMapCells(data)),
    addError: (data) => mapDispatchToProps(setError(data)),
  }),
)(MapCreator);
