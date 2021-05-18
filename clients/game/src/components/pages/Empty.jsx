import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";

const Wrapper = styled.p`
  font-size: 36px;
  text-align: center;
`;

class Empty extends WithRequest {
  constructor(props) {
    super(props);
  }

  render() {
    return <Wrapper>404, Страница не существует...</Wrapper>;
  }
}

export default Empty;
