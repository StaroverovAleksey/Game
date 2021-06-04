import React from 'react';
import styled from 'styled-components';
import {atrCharPath} from "../../../../../tools/utils";
import {connect} from "react-redux";
import InfoBlock from "./InfoBclock";

const Cell = styled.div`
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
`;

class MainCharCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: '',
            busy: false
        }
    }

    componentDidMount() {
        window.document.addEventListener("keydown", this._onKeyDownHandler);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {busy} = this.state;
        const {error} = this.props;
        const {x, y} = this.props.mainChar.location;
        const {x: oldX, y: oldY} = prevProps.mainChar.location;
        if (oldX !== x || oldY !== y) {
            this.setState({animation: 'load .5s steps(9, end) infinite', busy: true}, () => {
                    setTimeout(() => this.setState({animation: '', busy: false}), 1000);
                });
        }
        if(prevProps.error !== error
            && error.address === 'MAIN_CHAR'
            && error.msg === 'doNotPass'
            && !busy) {
            this.setState({busy: true}, () => {
                setTimeout(() => this.setState({busy: false}), 1000);
            });
        }
    }

    componentWillUnmount() {
        window.document.removeEventListener("keydown", this._onKeyDownHandler);
    }

    render() {
        const {animation} = this.state;
        const {direction} = this.props.mainChar;
        const {x: left, y: top} = this.props.mainChar.location;
        return <Cell
            top={(top - 1) * 64}
            left={(left - 1) * 64}
            image={atrCharPath(`char_${direction}.png`)}
            animation={animation}
        >
            <InfoBlock/>
        </Cell>
    }

    _onKeyDownHandler = (event) => {
        const {socket, mainChar, dispatch} = this.props;
        const {busy} = this.state;
        if (busy) {
            return;
        }
        const {direction} = mainChar;
        switch (event.code) {
            case 'ArrowUp': direction === 'back' ? socket.emit('mainChar/step', 'up') : socket.emit('mainChar/turn', 'back'); break;
            case 'ArrowDown': direction === 'front' ? socket.emit('mainChar/step', 'down') : socket.emit('mainChar/turn', 'front'); break;
            case 'ArrowRight': direction === 'right' ? socket.emit('mainChar/step', 'right') : socket.emit('mainChar/turn', 'right'); break;
            case 'ArrowLeft': direction === 'left' ? socket.emit('mainChar/step', 'left') : socket.emit('mainChar/turn', 'left'); break;
        }
    }
}

export default connect(
    (mapStateToProps) => ({
        error: mapStateToProps.settings.error,
        socket: mapStateToProps.settings.socket,
        mainChar: mapStateToProps.mainChar,
    })
)(MainCharCell);
