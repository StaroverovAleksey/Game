import React from 'react';
import styled from 'styled-components';
import WithRequest from '../../shells/ShellRequest';
import {API_AUTH_CHECK, API_GET_CHARACTER, API_GET_MAP_CELL, API_GET_TERRAIN} from '../../../tools/routing';
import Loading from '../Loading';
import TopFrame from './topFrame/TopFrame';
import BottomFrame from './bottomFrame/BottomFrame';
import FrameBorder from "./FrameBorder";

const Wrapper = styled.div`
  height: 100vh;
`;

class Game extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isAuth: false,
      topFrameHeight: 40
    };
    this.topFrameRef = React.createRef();
  }

  async componentDidMount() {
    await this._getInitialData();
    this.setState({ loading: false });
  }

  render() {
    const { loading, topFrameHeight } = this.state;
    if (loading) {
      return <Loading/>;
    }
    return (
      <Wrapper>

        <div style={{height: `${topFrameHeight}vh`}} ref={this.topFrameRef}>
          <TopFrame/>
        </div>

        <div style={{height: `${100 - topFrameHeight}vh`}}>
          <FrameBorder  callback={this._resize}/>
          <BottomFrame/>
        </div>

      </Wrapper>
    );
  }

  _resize = (value) => {
    const newHeight = this.topFrameRef.current.offsetHeight + parseInt(value);
    let newHeightVH = Math.round((newHeight * 100) / document.documentElement.offsetHeight);
    if (newHeightVH > 90) {
      newHeightVH = 90;
    }
    if (newHeightVH < 10) {
      newHeightVH = 10;
    }
    this.setState({topFrameHeight: newHeightVH});
  }

  _getInitialData = async () => {
    const character = await this.GET(API_GET_CHARACTER);
    const mapCells = await this.GET([`${API_GET_MAP_CELL}/?_id=${character.map}`]);
    console.log(character);
    console.log(mapCells);
  }
}

export default Game;
