import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(242, 240, 240);
`;

class BottomFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Wrapper>
      </Wrapper>
    );
  }
}

export default BottomFrame;
