import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  min-width: 100px;
  height: 24px;
`;

class InputText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Input type="text" />;
  }
}

export default InputText;
