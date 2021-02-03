import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: blue;
`;

class TopPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container />;
  }
}

export default TopPart;
