import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";

const Wrapper = styled.p`
  font-size: 36px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  transform: translateX(-50%);
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
