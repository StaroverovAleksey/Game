import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import CharCell from "./CharCell";
import BackGround from "./BackGround";

const OuterWrapper = styled.div`
  display: inline-flex;
  margin: auto;
  width: 100%;
  height: 100%;
  font-size: 34px;
  font-weight: bold;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: ${({marginTop}) => `${marginTop}px`};
`;

const InnerWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            marginTop: 0,
            left: 64,
            animation: ''
        }
    }

    componentDidMount() {
        this._verticalAlignment();
        window.addEventListener("resize", this._onResizeHandler);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topFrameHeight !== this.props.topFrameHeight) {
            this._verticalAlignment();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResizeHandler);
    }

    render() {
        const {left, animation, marginTop} = this.state;
        return (
            <OuterWrapper marginTop={marginTop}>
                <InnerWrapper>
                    <BackGround/>
                    <CharCell left={left}
                              animation={animation}
                              callback={this._onKeyDownHandler}
                    />
                </InnerWrapper>
            </OuterWrapper>
        );
    }

    _verticalAlignment = () => {
        const {topFrameHeight, mapSize} = this.props;
        const topFrameSize = window.document.documentElement.offsetHeight / 100 * topFrameHeight;
        const fieldSize = mapSize.y * 64;

        this.setState({marginTop: fieldSize < topFrameSize ? ((topFrameSize - fieldSize) / 2) : 0});
    }

    _onResizeHandler = () => {
        this._verticalAlignment();
    }
}

export default connect(
    (mapStateToProps) => ({
            mapSize: mapStateToProps.character.mapSize
        })
)(Main);
