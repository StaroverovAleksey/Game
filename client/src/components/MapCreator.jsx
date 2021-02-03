import React from 'react';
import styled from 'styled-components';
import LeftPart from './LeftPart';
import TopPart from './TopPart';
import MainPart from './MainPart';

const OuterWrapper = styled.div`
  display: flex;
  height: 100vh;
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
    const response = await fetch('http://localhost/api/map-cell/get');
    const q = await response.json();
    console.log(q);
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
