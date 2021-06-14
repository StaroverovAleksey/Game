import React from 'react';
import styled from 'styled-components';
import {atrCharPath, atrUtilsPath} from "../../../../../../tools/utils";
import {connect} from "react-redux";
import HoverMenu from "./HoverMenu";

const Cell = styled.div`
  position: absolute;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  width: 64px;
  height: 64px;
  background-image: ${({image}) => image};
  background-size: cover;
  animation: ${({animation}) => animation};
  transition: 1s;
  transition-property: top, left;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(1, 1, 0, 0);
  cursor: pointer;

  @keyframes load {
    100.0% {background-position-x: -576px;}
  }
`;

class CharCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: ''
        }
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {id} = this.props;
        const {x, y} = this.props.chars[id].location;
        const {x: oldX, y: oldY} = prevProps.chars[id].location;
        if (oldX !== x || oldY !== y) {
            this.setState({animation: 'load .5s steps(9, end) infinite'}, () => {
                setTimeout(() => this.setState({animation: ''}), 1000);
            });
        }
    }

    render() {
        const {animation} = this.state;
        const {id, mouseOver, target} = this.props;
        const {direction} = this.props.chars[id];
        const {x: left, y: top} = this.props.chars[id].location;
        return <Cell
            top={(top - 1) * 64}
            left={(left - 1) * 64}
            image={target === id ? `${atrCharPath(`char_${direction}.png`)}, ${atrUtilsPath(`targetGreen.png`)}` : atrCharPath(`char_${direction}.png`)}
            animation={animation}
            ref={this.ref}
            onClick={this._changeTarget}
        >
            {/*{this.ref.current && mouseOver && this.ref.current.contains(mouseOver) ?*/}
                <HoverMenu/>

        </Cell>
    }

    _changeTarget = () => {
        const {id, dispatch} = this.props;
        dispatch({type: 'MAIN_CHAR_CHANGE_TARGET', payload: id});
    }
}

export default connect(
    (mapStateToProps) => ({
        chars: mapStateToProps.chars,
        target: mapStateToProps.mainChar.target,
    })
)(CharCell);
