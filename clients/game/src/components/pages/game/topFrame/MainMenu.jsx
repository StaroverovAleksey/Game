import React from 'react';
import styled from 'styled-components';
import CmdButton from "../../../atomic/CmdButton";

const Wrapper = styled.menu`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0 0 0 5px;
  background-color: #c0c0c0;
  border-bottom-left-radius: 10px;
  box-shadow: 0 1px 6px 0 rgb(32 33 36 / 28%);;
`;

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.topFrameRef = React.createRef();
  }

  render() {
    return (
      <Wrapper>
        <CmdButton
            margin={'0 0 0 10px'}
            text={'Характеристики'}
        />
        <CmdButton
            margin={'0 0 0 10px'}
            text={'Инвентарь'}
        />
        <CmdButton
            margin={'0 10px 0 10px'}
            text={'Выйти'}
        />
      </Wrapper>
    );
  }
}

export default MainMenu;
