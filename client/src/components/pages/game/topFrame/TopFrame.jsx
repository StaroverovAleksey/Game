import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { PATH_GAME_CREATOR } from '../../../../tools/routing';
import FrameBorder from "../FrameBorder";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgb(232, 232, 232);
`;

class TopFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.topFrameRef = React.createRef();
  }

  render() {
    return (
      <Wrapper>
        <NavLink to={PATH_GAME_CREATOR}>Админка</NavLink>
      </Wrapper>
    );
  }
}

export default TopFrame;
