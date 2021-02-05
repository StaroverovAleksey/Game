import React from 'react';
import styled from 'styled-components';

const Key = styled.button`
  min-width: 100px;
  height: 24px;
  cursor: pointer;
`;

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      text,
    } = this.props;
    return <Key>{text}</Key>;
  }
}

export default Button;
