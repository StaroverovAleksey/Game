import React from 'react';
import styled from 'styled-components';
import WithRequest from "../shells/ShellRequest";

const Wrapper = styled.p`
  font-size: 36px;
  text-align: center;
`;

class Error extends WithRequest {
  constructor(props) {
    super(props);
  }

  render() {
    const {error} = this.props;
    return <Wrapper>
      {`Косяк. Код ошибки: ${error.status ? error.status : error}`}
      <br />
      Обнови страницу, может быть, поможет.
    </Wrapper>
  }
}

export default Error;
