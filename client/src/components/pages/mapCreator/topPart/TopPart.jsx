import React from 'react';
import styled from 'styled-components';
import {rsdfsdf} from '../../../../tools/palette';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  border-bottom: ${rsdfsdf} 2px solid;
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
