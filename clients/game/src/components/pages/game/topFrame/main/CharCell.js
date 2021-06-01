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

class CharCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: 128,
            left: 64,
            image: atrCharPath('char_front.png'),
            animation: '',
            direction: 'front',
            animating: false
        }
    }

    render() {
        const {image, animation} = this.state;
        const {id} = this.props;
        const {x: left, y: top} = this.props.mainChar.location;
        return <Qwerty
            top={top * 64}
            left={left * 64}
            image={image}
            animation={animation}
        />
    }
}

export default connect(
    (mapStateToProps) => ({
        chars: mapStateToProps.chars,
    })
)(CharCell);
