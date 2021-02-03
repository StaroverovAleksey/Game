import React from 'react';
import styled from 'styled-components';

const Container = styled.aside`
  display: flex;
  width: 20vw;
  height: 100vh;
  background-color: red;
`;

class LeftPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container />;
  }
}

export default LeftPart;
