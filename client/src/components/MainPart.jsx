import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`;

class MainPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container />;
  }
}

export default MainPart;
