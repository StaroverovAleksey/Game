import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {atrCharPath} from "../../../../../tools/utils";

const OuterWrapper = styled.div`
  display: inline-flex;
  margin: auto;
  width: 100%;
  height: 100%;
  font-size: 34px;
  font-weight: bold;
  overflow: hidden;
  padding-top: ${({marginTop}) => `${marginTop}px`};
`;

const InnerWrapper = styled.div`
  display: inline-block;
  flex-direction: column;
  height: 100%;
  position: relative;
  margin: 0 auto;
`;

const String = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  width: 64px;
  height: 64px;
  border: 1px solid red;
  box-sizing: border-box;
`;

const Qwerty = styled.div`
  position: absolute;
  top: 0;
  left: ${({left}) => left}px;
  width: 64px;
  height: 64px;
  background-image: ${() => `${atrCharPath('character.png')}`};
  background-size: cover;
  animation: ${({animation}) => animation};
  transition: 1s;
  transition-timing-function: cubic-bezier(1, 1, 0, 0);

  @keyframes load {
    100.0% {background-position-x: -576px;}
  }
  @keyframes load1 {
    100.0% {background-position-x: -576px;}
  }
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
        document.addEventListener("keydown", this._onKeyPressed);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topFrameHeight !== this.props.topFrameHeight) {
            const topFrame = window.document.documentElement.offsetHeight / 100 * this.props.topFrameHeight;
            const elem = this.props.mapSize.y * 64;

            if (elem < topFrame) {
                this.setState({marginTop: (topFrame - elem) / 2});
            } else {
                this.setState({marginTop: 0});
            }
            console.log(topFrame, elem);
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._onKeyPressed);
    }

    render() {
        const {left, animation, marginTop} = this.state;
        const {mapCells, mapSize} = this.props;
        const {x: sizeX, y: sizeY} = mapSize;
        return (
            <OuterWrapper marginTop={marginTop}>
                <InnerWrapper>
                    {new Array(sizeY).fill('').map((v, i) => {
                        return <String>
                            {new Array(sizeX).fill('').map(() => {
                                return <Cell>{i}</Cell>
                            })}
                        </String>
                    })}
                    <Qwerty left={left}
                            animation={animation}
                    />
                </InnerWrapper>
            </OuterWrapper>
        );
    }

    _onKeyPressed = (event) => {
        const {left} = this.state;
        if (event.code === 'KeyD') {
            this.setState({left: left + 64, animation: 'load .5s steps(9, end) infinite'}, () => {
                setTimeout(() => this.setState({animation: ''}), 1000);
            });
        }
    }
}



export default connect(
    (mapStateToProps) => ({
            mapCells: mapStateToProps.mapCells,
            mapSize: mapStateToProps.character.mapSize
        })
)(Main);
