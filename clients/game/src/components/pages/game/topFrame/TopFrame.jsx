import React from 'react';
import styled from 'styled-components';
import MainMenu from "./MainMenu";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(232, 232, 232);
`;

class TopFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.topFrameRef = React.createRef();
  }

  render() {
    return (
      <Wrapper>
        <MainMenu/>
      </Wrapper>
    );
  }
}

export default TopFrame;
