import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background: #A0A0A0;
  border-style: solid;
  border-color: #C0C0C0 #808080 #808080 #C0C0C0;
  border-width: 1px 0;
  cursor: n-resize;
  box-sizing: border-box;
  z-index: 5;
`;
const Qwerty = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #A0A0A0;
`;

class FrameBorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StartTopPosition: 0,
      shiftTopPosition: 0,
    };
  }

  render() {
    const {shiftTopPosition} = this.state;
    return (
      <Wrapper onMouseDown={this._clickHandler} onMouseUp={this._upHandler}>
        <Qwerty style={{top: `${shiftTopPosition}px`}}/>
      </Wrapper>
    );
  }

  _clickHandler = (event) => {
    window.addEventListener('mousemove', this._moveHandler);
    window.addEventListener('mouseup', this._upHandler);
    document.querySelector('body').style.cursor = 'n-resize';
    this.setState({StartTopPosition: event.clientY});
  }

  _moveHandler = (event) => {
    event.preventDefault();
    const {StartTopPosition} = this.state;
    this.setState({shiftTopPosition: event.clientY - StartTopPosition});
  }

  _upHandler = () => {
    const {shiftTopPosition} = this.state;
    const {callback} = this.props;
    window.removeEventListener('mousemove', this._moveHandler);
    window.removeEventListener('mouseup', this._upHandler);
    document.querySelector('body').style.cursor = 'default';
    this.setState({shiftTopPosition: 0});
    callback(shiftTopPosition);
  }
}

export default FrameBorder;
