import React from 'react';
import styled from 'styled-components';
import {atrCharPath} from "../../../../../tools/utils";
import {connect} from "react-redux";

const Qwerty = styled.div`
  position: absolute;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  width: 64px;
  height: 64px;
  background-image: ${({image}) => image};
  background-color: rgba(255, 0, 0, .2);
  background-size: cover;
  animation: ${({animation}) => animation};
  transition: 1s;
  transition-property: top, left;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(1, 1, 0, 0);

  @keyframes load {
    100.0% {background-position-x: -576px;}
  }
  @keyframes load1 {
    100.0% {background-position-x: -576px;}
  }
`;

class MainCharCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 128,
            left: 64,
            image: atrCharPath(`char_${this.props.mainChar.direction}.png`),
            animation: '',
            direction: 'front',
            animating: false
        }
    }

    componentDidMount() {
        window.document.addEventListener("keydown", this._onKeyDownHandler);
    }

    componentWillUnmount() {
        window.document.removeEventListener("keydown", this._onKeyDownHandler);
    }

    render() {
        const {image, animation} = this.state;
        const {x: left, y: top} = this.props.mainChar.location;
        return <Qwerty
            top={top * 64}
            left={left * 64}
            image={image}
            animation={animation}
        />
    }

    _onKeyDownHandler = (event) => {
        const {top, left, animating} = this.state;
        const {socket, mainChar} = this.state.props;
        const {direction} = mainChar;
        if (animating) {
            return;
        }
        if (event.code === 'ArrowUp') {
            if (direction === 'back') {
                socket.emit('main-char/step', 'up');
                this.setState({top: top - 64, animation: 'load .5s steps(9, end) infinite', animating: true}, () => {
                    setTimeout(() => this.setState({animation: '', animating: false}), 1000);
                });
            } else {
                this.setState({image: atrCharPath('char_back.png'), direction: 'back'});
            }
        }
        if (event.code === 'ArrowRight') {
            if (direction === 'right') {
                this.setState({left: left + 64, animation: 'load .5s steps(9, end) infinite', animating: true}, () => {
                    setTimeout(() => this.setState({animation: '', animating: false}), 1000);
                });
            } else {
                this.setState({image: atrCharPath('char_right.png'), direction: 'right'});
            }
        }
        if (event.code === 'ArrowDown') {
            if (direction === 'front') {
                this.setState({top: top + 64, animation: 'load .5s steps(9, end) infinite', animating: true}, () => {
                    setTimeout(() => this.setState({animation: '', animating: false}), 1000);
                });
            } else {
                this.setState({image: atrCharPath('char_front.png'), direction: 'front'});
            }
        }
        if (event.code === 'ArrowLeft') {
            if (direction === 'left') {
                this.setState({left: left - 64, animation: 'load .5s steps(9, end) infinite', animating: true}, () => {
                    setTimeout(() => this.setState({animation: '', animating: false}), 1000);
                });
            } else {
                this.setState({image: atrCharPath('char_left.png'), direction: 'left'});
            }

        }
    }
}

export default connect(
    (mapStateToProps) => ({
        socket: mapStateToProps.settings.socket,
        mainChar: mapStateToProps.mainChar,
    })
)(MainCharCell);
