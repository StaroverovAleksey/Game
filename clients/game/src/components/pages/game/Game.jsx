import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import TopFrame from './topFrame/TopFrame';
import BottomFrame from './bottomFrame/BottomFrame';
import FrameBorder from "./FrameBorder";
import WithRequest from "../../shells/ShellRequest";
import {connect} from "react-redux";
import {isEmpty} from "../../../tools/utils";

const Wrapper = styled.div`
  height: 100vh;
`;

class Game extends WithRequest {
  constructor(props) {
    super(props);
    this.state = {
      topFrameHeight: 90
    };
    this.topFrameRef = React.createRef();
  }

  render() {
    const { topFrameHeight } = this.state;
    const { mapCells, mainChar } = this.props;
    if (isEmpty(mapCells) || isEmpty(mainChar)) {
      return <Loading/>;
    }
    return (
      <Wrapper>

        <div style={{height: `${topFrameHeight}vh`}} ref={this.topFrameRef}>
          <TopFrame topFrameHeight={topFrameHeight}/>
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
}

export default connect(
    (mapStateToProps) => ({
      mapCells: mapStateToProps.mapCells,
      mainChar: mapStateToProps.mainChar,
    })
)(Game);
