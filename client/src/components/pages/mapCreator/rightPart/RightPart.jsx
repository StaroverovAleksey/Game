import React from 'react';
import styled from 'styled-components';
import { fonBlue } from '../../../../tools/palette';
import TerrainsDisplay from './TerrainsDisplay/TerrainsDisplay';

const Wrapper = styled.aside`
  display: flex;
  padding: 15px;
  min-width: 390px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-color: ${fonBlue};
  transition: 0.1s;
  overflow-y: scroll;
  >div {
    margin-bottom: 15px;
  }
  >div:last-child {
    margin-bottom: 0;
  }
`;

class RightPart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>

        <TerrainsDisplay />

      </Wrapper>
    );
  }
}

export default RightPart;
