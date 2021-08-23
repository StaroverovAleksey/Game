import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {atrChar} from "../../tools/utils";
import {
    ANIMATION_FINISH,
    ANIMATION_STEP_DOWN,
    ANIMATION_STEP_LEFT,
    ANIMATION_STEP_RIGHT,
    ANIMATION_STEP_UP,
    getAnimation,
    getPosition
} from "../../tools/animations";

const Cell = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  background-image: ${({image}) => image};
  background-position-y: ${({direction}) => direction};
  transition: 1s;
  transition-property: top, left;
  transition-timing-function: cubic-bezier(1, 1, 0, 0);
  cursor: pointer;
`;

class Charrr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: {
                action: ''
            },
        }
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {x, y} = this.props.char.location;
        const {x: oldX, y: oldY} = prevProps.char.location;

        if (oldX !== x || oldY !== y) {
            this._step(oldX, oldY);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {animation} = this.state;
        const {location, appearance, direction} = this.props.char;
        return <Cell
            direction={getPosition(1, direction)}
            image={atrChar(appearance)}
            ref={this.ref}
            style={{
                top: `${(location.y - 1) * 64}px`,
                left: `${(location.x - 1) * 64}px`,
                backgroundPositionY: animation.position,
                animation: animation.action
            }}
        >
            {/*{this.ref.current && mouseOver && this.ref.current.contains(mouseOver) ?*/}
                {/*<HoverMenu/>*/}

        </Cell>
    }

    _step = (oldX, oldY) => {
        const {direction} = this.props.char;
        const {x, y} = this.props.char.location;
        let animationName = null;
        switch (true) {
            case (oldY > y && direction === 'back'): animationName = ANIMATION_STEP_UP; break;
            case (oldY < y && direction === 'front'): animationName = ANIMATION_STEP_DOWN; break;
            case (oldX < x && direction === 'left'): animationName = ANIMATION_STEP_LEFT; break;
            case (oldX > x && direction === 'right'): animationName = ANIMATION_STEP_RIGHT; break;
        }
        const animation = getAnimation(animationName);
        this.setState({animation}, () => {
            this.timer = setTimeout(() => {
                this.setState({animation: getAnimation(ANIMATION_FINISH)});
            }, animation.duration);
        });
    }
}

export default connect(
    (mapStateToProps) => ({
        chars: mapStateToProps.chars,
        target: mapStateToProps.mainChar.target,
    })
)(Charrr);
