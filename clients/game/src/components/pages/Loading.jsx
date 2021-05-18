import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";

const Wrapper = styled.p`
  font-size: 36px;
  text-align: center;
`;

class Loading extends WithRequest {
  constructor(props) {
    super(props);
  }

  render() {
    return <Wrapper>Загрузка...</Wrapper>;
  }
}

export default Loading;
