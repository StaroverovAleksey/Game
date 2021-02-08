import React from 'react';
import styled from 'styled-components';
import FieldSize from './FieldSize';
import { fonBlue } from '../../../../tools/palette';
import ResetField from './ResetField';

const Wrapper = styled.aside`
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: ${({ open }) => (open ? 'auto' : '0')};
  background-color: ${fonBlue};
  transition: 0.1s;
  >div {
    margin-bottom: 20px;
  }
  >div:last-child {
    margin-bottom: 0;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: -30px;
  width: 30px;
  height: 60px;
  cursor: pointer;
`;

class LeftPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  render() {
    const { open } = this.state;
    return (

      <Wrapper open={open}>
        <CloseButton onClick={() => this.setState({ open: !open })} />

        <FieldSize />
        <ResetField />
        <FieldSize />

      </Wrapper>
    );
  }
}

export default LeftPart;
