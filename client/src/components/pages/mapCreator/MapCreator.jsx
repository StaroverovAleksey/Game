import React from 'react';
import styled from 'styled-components';
import LeftPart from './leftPart/LeftPart';
import TopPart from './topPart/TopPart';
import MainPart from './mainPart/MainPart';

const OuterWrapper = styled.div`
  display: flex;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

class MapCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftBar: false,
    };
  }

  async componentDidMount() {
    const mapCells = await fetch('http://localhost/api/map-cell/get');
    console.log(await mapCells.json());
    const terrains = await fetch('http://localhost/api/terrain/get');
    console.log(await terrains.json());
  }

  render() {
    const { leftBar } = this.state;
    return (
      <OuterWrapper>
        <LeftPart />
        <InnerWrapper>
          <TopPart />
          <MainPart />
        </InnerWrapper>
      </OuterWrapper>
    );
  }
}

export default MapCreator;
