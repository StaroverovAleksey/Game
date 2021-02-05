import React from 'react';
import styled from 'styled-components';
import AddTerrain from './AddTerrain';
import { asdfg } from '../../../../tools/palette';
import Button from '../../../controls/Button';

const OuterWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: ${({ open }) => (open ? '40vw' : '0')};
  background-color: ${asdfg};
  transition: 0.1s;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: -30px;
  width: 30px;
  height: 60px;
  cursor: pointer;
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 80%;
  opacity: ${({ open }) => (open ? '100%' : '0')};
  >h3 {
    display: inline-block;
    text-align: center;
    margin-bottom: 5px;
    width: 100%;
  }
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
      <OuterWrapper open={open}>
        <CloseButton onClick={() => this.setState({ open: !open })} />

        <InnerWrapper open={open}>
          <h3>Размеры поля</h3>
          {/* <div>
            <input />
            <input />
            <button>Применить</button>
          </div> */}
        </InnerWrapper>

        <InnerWrapper open={open}>
          <h3>Очистить поле</h3>
          <Button text="Очистить" />
        </InnerWrapper>

        <InnerWrapper open={open}>
          <h3>Новая местность</h3>
          <AddTerrain />
        </InnerWrapper>
      </OuterWrapper>
    );
  }
}

export default LeftPart;
